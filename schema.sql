-- ============================================
-- FAREWATCH DATABASE SCHEMA (CORRIGIDO)
-- Cole tudo isso no SQL Editor do Supabase
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (extends Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  telegram_chat_id TEXT,
  telegram_linked_at TIMESTAMPTZ,
  notify_email BOOLEAN DEFAULT true,
  notify_telegram BOOLEAN DEFAULT false,
  alert_threshold_20 BOOLEAN DEFAULT true,
  alert_threshold_50 BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRACKED ROUTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.tracked_routes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  origin_iata TEXT NOT NULL,
  destination_iata TEXT NOT NULL,
  origin_city TEXT,
  destination_city TEXT,
  travel_date DATE,
  flexible_month TEXT,
  is_flexible BOOLEAN DEFAULT false,
  alert_20_percent BOOLEAN DEFAULT true,
  alert_50_percent BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMPTZ,
  last_price_brl NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRICE HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.price_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  origin_iata TEXT NOT NULL,
  destination_iata TEXT NOT NULL,
  travel_date DATE,
  flexible_month TEXT,
  airline TEXT,
  price_brl NUMERIC(12,2) NOT NULL,
  price_original NUMERIC(12,2),
  original_currency TEXT DEFAULT 'BRL',
  source TEXT DEFAULT 'kiwi',
  booking_link TEXT,
  flight_duration_minutes INTEGER,
  stops INTEGER DEFAULT 0,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BASELINE PRICES TABLE (computed)
-- ============================================
CREATE TABLE IF NOT EXISTS public.price_baselines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  origin_iata TEXT NOT NULL,
  destination_iata TEXT NOT NULL,
  travel_month TEXT NOT NULL,
  baseline_price_brl NUMERIC(12,2) NOT NULL,
  sample_count INTEGER DEFAULT 0,
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(origin_iata, destination_iata, travel_month)
);

-- ============================================
-- ALERTS SENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.alerts_sent (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tracked_route_id UUID REFERENCES public.tracked_routes(id) ON DELETE CASCADE NOT NULL,
  price_brl NUMERIC(12,2) NOT NULL,
  baseline_price_brl NUMERIC(12,2) NOT NULL,
  discount_percent NUMERIC(5,2) NOT NULL,
  alert_type TEXT NOT NULL,
  booking_link TEXT,
  airline TEXT,
  travel_date DATE,
  channels TEXT[] DEFAULT '{}',
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TELEGRAM LINK TOKENS
-- ============================================
CREATE TABLE IF NOT EXISTS public.telegram_link_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_price_history_route ON public.price_history(origin_iata, destination_iata);
CREATE INDEX IF NOT EXISTS idx_price_history_fetched ON public.price_history(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracked_routes_user ON public.tracked_routes(user_id);
CREATE INDEX IF NOT EXISTS idx_tracked_routes_active ON public.tracked_routes(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_alerts_sent_user ON public.alerts_sent(user_id);
CREATE INDEX IF NOT EXISTS idx_price_baselines_route ON public.price_baselines(origin_iata, destination_iata);

-- ============================================
-- ROW LEVEL SECURITY — CORRIGIDO
-- (políticas separadas por operação, com WITH CHECK onde necessário)
-- ============================================

-- ===== users =====
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own data - select" ON public.users;

CREATE POLICY "Users own data - select"
ON public.users 
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users own data - insert" ON public.users;

CREATE POLICY "Users own data - insert"
ON public.users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users own data - update" ON public.users;

CREATE POLICY "Users own data - update"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users own data - delete" ON public.users;

CREATE POLICY "Users own data - delete"
ON public.users FOR DELETE
TO authenticated
USING (auth.uid() = id);


-- ===== tracked_routes =====
ALTER TABLE public.tracked_routes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own routes - select"  ON public.tracked_routes;
DROP POLICY IF EXISTS "Users own routes - insert"  ON public.tracked_routes;
DROP POLICY IF EXISTS "Users own routes - update"  ON public.tracked_routes;
DROP POLICY IF EXISTS "Users own routes - delete"  ON public.tracked_routes;

CREATE POLICY "Users own routes - select"
ON public.tracked_routes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users own routes - insert"
ON public.tracked_routes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users own routes - update"
ON public.tracked_routes FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users own routes - delete"
ON public.tracked_routes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ===== alerts_sent =====
ALTER TABLE public.alerts_sent ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own alerts - select" ON public.alerts_sent;

CREATE POLICY "Users own alerts - select"
ON public.alerts_sent FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own alerts - insert" ON public.alerts_sent;

CREATE POLICY "Users own alerts - insert"
ON public.alerts_sent FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own alerts - update" ON public.alerts_sent;

CREATE POLICY "Users own alerts - update"
ON public.alerts_sent FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own alerts - delete" ON public.alerts_sent;

CREATE POLICY "Users own alerts - delete"
ON public.alerts_sent FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ===== telegram_link_tokens =====
ALTER TABLE public.telegram_link_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own link tokens - select" ON public.telegram_link_tokens;

CREATE POLICY "Users own link tokens - select"
ON public.telegram_link_tokens FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own link tokens - insert" ON public.telegram_link_tokens;

CREATE POLICY "Users own link tokens - insert"
ON public.telegram_link_tokens FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own link tokens - update" ON public.telegram_link_tokens;

CREATE POLICY "Users own link tokens - update"
ON public.telegram_link_tokens FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own link tokens - delete" ON public.telegram_link_tokens;

CREATE POLICY "Users own link tokens - delete"
ON public.telegram_link_tokens FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


-- ===== price_history (leitura para todos autenticados) =====
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Price history readable" ON public.price_history;

CREATE POLICY "Price history readable"
ON public.price_history FOR SELECT
TO authenticated
USING (true);


-- ===== price_baselines (leitura para todos autenticados) =====
ALTER TABLE public.price_baselines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Baselines readable" ON public.price_baselines;

CREATE POLICY "Baselines readable"
ON public.price_baselines FOR SELECT
TO authenticated
USING (true);


-- ============================================
-- FUNCTIONS E TRIGGERS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON public.users;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tracked_routes_updated_at ON public.tracked_routes;

CREATE TRIGGER tracked_routes_updated_at
  BEFORE UPDATE ON public.tracked_routes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Quando um novo usuário se cadastra no Auth, cria registro na tabela users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

