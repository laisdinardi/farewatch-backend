{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red83\green83\blue83;\red236\green236\blue236;\red52\green52\blue52;
\red0\green0\blue255;\red100\green117\blue135;\red0\green0\blue0;\red19\green118\blue70;\red36\green168\blue107;
}
{\*\expandedcolortbl;;\cssrgb\c40000\c40000\c40000;\cssrgb\c94118\c94118\c94118;\cssrgb\c26667\c26667\c26667;
\cssrgb\c0\c0\c100000;\cssrgb\c46667\c53333\c60000;\cssrgb\c0\c0\c0;\cssrgb\c3529\c52549\c34510;\cssrgb\c14118\c70588\c49412;
}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- FAREWATCH DATABASE SCHEMA (CORRIGIDO)\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- Cole tudo isso no SQL Editor do Supabase\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 -- Enable UUID extension\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  EXTENSION IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS "uuid-ossp"\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- USERS TABLE (extends Supabase Auth)\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 users \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 REFERENCES\cf4 \strokec4  auth\strokec7 .\strokec4 users\strokec7 (\strokec4 id\strokec7 )\strokec4  \cf5 \strokec5 ON\cf4 \strokec4  DELETE CASCADE \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   email TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec4  \cf5 \strokec5 UNIQUE\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   name TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   telegram_chat_id TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   telegram_linked_at TIMESTAMPTZ\strokec7 ,\cb1 \strokec4 \
\cb3   notify_email BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   notify_telegram BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 false\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   alert_threshold_20 BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   alert_threshold_50 BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   created_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 (),\cb1 \strokec4 \
\cb3   updated_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- TRACKED ROUTES TABLE\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 tracked_routes \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 DEFAULT\cf4 \strokec4  uuid_generate_v4\strokec7 ()\strokec4  \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   user_id UUID \cf5 \strokec5 REFERENCES\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 (\strokec4 id\strokec7 )\strokec4  \cf5 \strokec5 ON\cf4 \strokec4  DELETE CASCADE \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   origin_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   destination_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   origin_city TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   destination_city TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   travel_date DATE\strokec7 ,\cb1 \strokec4 \
\cb3   flexible_month TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   is_flexible BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 false\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   alert_20_percent BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   alert_50_percent BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   active BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   last_checked_at TIMESTAMPTZ\strokec7 ,\cb1 \strokec4 \
\cb3   last_price_brl NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 ),\cb1 \strokec4 \
\cb3   created_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 (),\cb1 \strokec4 \
\cb3   updated_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- PRICE HISTORY TABLE\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 price_history \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 DEFAULT\cf4 \strokec4  uuid_generate_v4\strokec7 ()\strokec4  \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   origin_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   destination_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   travel_date DATE\strokec7 ,\cb1 \strokec4 \
\cb3   flexible_month TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   airline TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   price_brl NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 )\strokec4  \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   price_original NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 ),\cb1 \strokec4 \
\cb3   original_currency TEXT \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf9 \strokec9 'BRL'\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   source TEXT \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf9 \strokec9 'kiwi'\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   booking_link TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   flight_duration_minutes INTEGER\strokec7 ,\cb1 \strokec4 \
\cb3   stops INTEGER \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   fetched_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- BASELINE PRICES TABLE (computed)\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 price_baselines \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 DEFAULT\cf4 \strokec4  uuid_generate_v4\strokec7 ()\strokec4  \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   origin_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   destination_iata TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   travel_month TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   baseline_price_brl NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 )\strokec4  \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   sample_count INTEGER \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf8 \strokec8 0\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   computed_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 (),\cb1 \strokec4 \
\cb3   \cf5 \strokec5 UNIQUE\cf4 \strokec7 (\strokec4 origin_iata\strokec7 ,\strokec4  destination_iata\strokec7 ,\strokec4  travel_month\strokec7 )\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ALERTS SENT TABLE\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 alerts_sent \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 DEFAULT\cf4 \strokec4  uuid_generate_v4\strokec7 ()\strokec4  \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   user_id UUID \cf5 \strokec5 REFERENCES\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 (\strokec4 id\strokec7 )\strokec4  \cf5 \strokec5 ON\cf4 \strokec4  DELETE CASCADE \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   tracked_route_id UUID \cf5 \strokec5 REFERENCES\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 (\strokec4 id\strokec7 )\strokec4  \cf5 \strokec5 ON\cf4 \strokec4  DELETE CASCADE \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   price_brl NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 )\strokec4  \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   baseline_price_brl NUMERIC\strokec7 (\cf8 \strokec8 12\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 )\strokec4  \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   discount_percent NUMERIC\strokec7 (\cf8 \strokec8 5\cf4 \strokec7 ,\cf8 \strokec8 2\cf4 \strokec7 )\strokec4  \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   alert_type TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   booking_link TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   airline TEXT\strokec7 ,\cb1 \strokec4 \
\cb3   travel_date DATE\strokec7 ,\cb1 \strokec4 \
\cb3   channels TEXT[] \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf9 \strokec9 '\{\}'\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   sent_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- TELEGRAM LINK TOKENS\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf5 \strokec5 TABLE\cf4 \strokec4  IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS public\strokec7 .\strokec4 telegram_link_tokens \strokec7 (\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   id UUID \cf5 \strokec5 DEFAULT\cf4 \strokec4  uuid_generate_v4\strokec7 ()\strokec4  \cf5 \strokec5 PRIMARY\cf4 \strokec4  KEY\strokec7 ,\cb1 \strokec4 \
\cb3   user_id UUID \cf5 \strokec5 REFERENCES\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 (\strokec4 id\strokec7 )\strokec4  \cf5 \strokec5 ON\cf4 \strokec4  DELETE CASCADE \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   token TEXT \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec4  \cf5 \strokec5 UNIQUE\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   expires_at TIMESTAMPTZ \cf6 \strokec6 NOT\cf4 \strokec4  \cf6 \strokec6 NULL\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   used BOOLEAN \cf5 \strokec5 DEFAULT\cf4 \strokec4  \cf5 \strokec5 false\cf4 \strokec7 ,\cb1 \strokec4 \
\cb3   created_at TIMESTAMPTZ \cf5 \strokec5 DEFAULT\cf4 \strokec4  NOW\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- INDEXES\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_price_history_route \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_history\strokec7 (\strokec4 origin_iata\strokec7 ,\strokec4  destination_iata\strokec7 );\cb1 \strokec4 \
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_price_history_fetched \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_history\strokec7 (\strokec4 fetched_at \cf5 \strokec5 DESC\cf4 \strokec7 );\cb1 \strokec4 \
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_tracked_routes_user \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 (\strokec4 user_id\strokec7 );\cb1 \strokec4 \
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_tracked_routes_active \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 (\strokec4 active\strokec7 )\strokec4  \cf5 \strokec5 WHERE\cf4 \strokec4  active \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 true\cf4 \strokec7 ;\cb1 \strokec4 \
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_alerts_sent_user \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent\strokec7 (\strokec4 user_id\strokec7 );\cb1 \strokec4 \
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  INDEX IF \cf6 \strokec6 NOT\cf4 \strokec4  EXISTS idx_price_baselines_route \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_baselines\strokec7 (\strokec4 origin_iata\strokec7 ,\strokec4  destination_iata\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ROW LEVEL SECURITY \'97 CORRIGIDO\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- (pol\'edticas separadas por opera\'e7\'e3o, com WITH CHECK onde necess\'e1rio)\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 -- ===== users =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 users ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Users own data - select" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own data - select"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users \cb1 \
\cf5 \cb3 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own data - insert" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own data - insert"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users \cf5 \strokec5 FOR\cf4 \strokec4  INSERT\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own data - update" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own data - update"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users \cf5 \strokec5 FOR\cf4 \strokec4  UPDATE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  id\strokec7 )\cb1 \strokec4 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own data - delete" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own data - delete"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users \cf5 \strokec5 FOR\cf4 \strokec4  DELETE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  id\strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ===== tracked_routes =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Users own routes - select"  \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 ;\cb1 \strokec4 \
\cb3 DROP POLICY IF EXISTS "Users own routes - insert"  \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 ;\cb1 \strokec4 \
\cb3 DROP POLICY IF EXISTS "Users own routes - update"  \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 ;\cb1 \strokec4 \
\cb3 DROP POLICY IF EXISTS "Users own routes - delete"  \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own routes - select"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes \cf5 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own routes - insert"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes \cf5 \strokec5 FOR\cf4 \strokec4  INSERT\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own routes - update"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes \cf5 \strokec5 FOR\cf4 \strokec4  UPDATE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 )\cb1 \strokec4 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own routes - delete"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes \cf5 \strokec5 FOR\cf4 \strokec4  DELETE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ===== alerts_sent =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Users own alerts - select" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own alerts - select"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent \cf5 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own alerts - insert" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own alerts - insert"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent \cf5 \strokec5 FOR\cf4 \strokec4  INSERT\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own alerts - update" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own alerts - update"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent \cf5 \strokec5 FOR\cf4 \strokec4  UPDATE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 )\cb1 \strokec4 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own alerts - delete" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own alerts - delete"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 alerts_sent \cf5 \strokec5 FOR\cf4 \strokec4  DELETE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ===== telegram_link_tokens =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Users own link tokens - select" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own link tokens - select"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens \cf5 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own link tokens - insert" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own link tokens - insert"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens \cf5 \strokec5 FOR\cf4 \strokec4  INSERT\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own link tokens - update" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own link tokens - update"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens \cf5 \strokec5 FOR\cf4 \strokec4  UPDATE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 )\cb1 \strokec4 \
\cf5 \cb3 \strokec5 WITH\cf4 \strokec4  \cf5 \strokec5 CHECK\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP POLICY IF EXISTS "Users own link tokens - delete" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Users own link tokens - delete"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 telegram_link_tokens \cf5 \strokec5 FOR\cf4 \strokec4  DELETE\cb1 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\strokec4 auth\strokec7 .\strokec4 uid\strokec7 ()\strokec4  \cf6 \strokec6 =\cf4 \strokec4  user_id\strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ===== price_history (leitura para todos autenticados) =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 price_history ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Price history readable" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_history\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Price history readable"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_history \cf5 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\cf5 \strokec5 true\cf4 \strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ===== price_baselines (leitura para todos autenticados) =====\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 ALTER \cf5 \strokec5 TABLE\cf4 \strokec4  public\strokec7 .\strokec4 price_baselines ENABLE ROW LEVEL SECURITY\strokec7 ;\cb1 \strokec4 \
\
\cb3 DROP POLICY IF EXISTS "Baselines readable" \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_baselines\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  POLICY "Baselines readable"\cb1 \
\cf5 \cb3 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 price_baselines \cf5 \strokec5 FOR\cf4 \strokec4  \cf5 \strokec5 SELECT\cf4 \cb1 \strokec4 \
\cf5 \cb3 \strokec5 TO\cf4 \strokec4  authenticated\cb1 \
\cf5 \cb3 \strokec5 USING\cf4 \strokec4  \strokec7 (\cf5 \strokec5 true\cf4 \strokec7 );\cb1 \strokec4 \
\
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- FUNCTIONS E TRIGGERS\cf4 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 -- ============================================\cf4 \cb1 \strokec4 \
\
\cf2 \cb3 \strokec2 -- Auto-update updated_at\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf6 \strokec6 OR\cf4 \strokec4  REPLACE FUNCTION update_updated_at\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 RETURNS TRIGGER \cf5 \strokec5 AS\cf4 \strokec4  \cf8 \strokec8 $$\cf4 \cb1 \strokec4 \
\cb3 BEGIN\cb1 \
\cb3   NEW\strokec7 .\strokec4 updated_at \cf6 \strokec6 =\cf4 \strokec4  NOW\strokec7 ();\cb1 \strokec4 \
\cb3   RETURN NEW\strokec7 ;\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 END\cf4 \strokec7 ;\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 $$\cf4 \strokec4  LANGUAGE plpgsql\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 DROP TRIGGER IF EXISTS users_updated_at \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  TRIGGER users_updated_at\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   BEFORE UPDATE \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 users\cb1 \
\cb3   \cf5 \strokec5 FOR\cf4 \strokec4  EACH ROW EXECUTE FUNCTION update_updated_at\strokec7 ();\cb1 \strokec4 \
\
\cb3 DROP TRIGGER IF EXISTS tracked_routes_updated_at \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  TRIGGER tracked_routes_updated_at\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   BEFORE UPDATE \cf5 \strokec5 ON\cf4 \strokec4  public\strokec7 .\strokec4 tracked_routes\cb1 \
\cb3   \cf5 \strokec5 FOR\cf4 \strokec4  EACH ROW EXECUTE FUNCTION update_updated_at\strokec7 ();\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 -- Quando um novo usu\'e1rio se cadastra no Auth, cria registro na tabela users\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf6 \strokec6 OR\cf4 \strokec4  REPLACE FUNCTION public\strokec7 .\strokec4 handle_new_user\strokec7 ()\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 RETURNS TRIGGER \cf5 \strokec5 AS\cf4 \strokec4  \cf8 \strokec8 $$\cf4 \cb1 \strokec4 \
\cb3 BEGIN\cb1 \
\cb3   INSERT \cf5 \strokec5 INTO\cf4 \strokec4  public\strokec7 .\strokec4 users \strokec7 (\strokec4 id\strokec7 ,\strokec4  email\strokec7 ,\strokec4  name\strokec7 )\cb1 \strokec4 \
\cb3   VALUES \strokec7 (\cb1 \strokec4 \
\cb3     NEW\strokec7 .\strokec4 id\strokec7 ,\cb1 \strokec4 \
\cb3     NEW\strokec7 .\strokec4 email\strokec7 ,\cb1 \strokec4 \
\cb3     COALESCE\strokec7 (\strokec4 NEW\strokec7 .\strokec4 raw_user_meta_data\cf6 \strokec6 ->>\cf9 \strokec9 'name'\cf4 \strokec7 ,\strokec4  split_part\strokec7 (\strokec4 NEW\strokec7 .\strokec4 email\strokec7 ,\strokec4  \cf9 \strokec9 '@'\cf4 \strokec7 ,\strokec4  \cf8 \strokec8 1\cf4 \strokec7 ))\cb1 \strokec4 \
\cb3   \strokec7 );\cb1 \strokec4 \
\cb3   RETURN NEW\strokec7 ;\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 END\cf4 \strokec7 ;\cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 $$\cf4 \strokec4  LANGUAGE plpgsql SECURITY DEFINER\strokec7 ;\cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 CREATE\cf4 \strokec4  \cf6 \strokec6 OR\cf4 \strokec4  REPLACE TRIGGER on_auth_user_created\cb1 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3   AFTER INSERT \cf5 \strokec5 ON\cf4 \strokec4  auth\strokec7 .\strokec4 users\cb1 \
\cb3   \cf5 \strokec5 FOR\cf4 \strokec4  EACH ROW EXECUTE FUNCTION public\strokec7 .\strokec4 handle_new_user\strokec7 ();\cb1 \strokec4 \
}