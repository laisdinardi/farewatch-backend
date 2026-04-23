const express = require('express');
const { z } = require('zod');
const { supabase } = require('../../../config/supabase');
const { authenticate } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

const routeSchema = z.object({
  origin_iata: z.string().length(3).toUpperCase(),
  destination_iata: z.string().length(3).toUpperCase(),
  origin_city: z.string().optional(),
  destination_city: z.string().optional(),
  travel_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  flexible_month: z.string().regex(/^\d{4}-\d{2}$/).optional().nullable(),
  is_flexible: z.boolean().default(false),
  alert_20_percent: z.boolean().default(true),
  alert_50_percent: z.boolean().default(true),
});

// GET /api/routes
router.get('/', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tracked_routes')
      .select(`
        *,
        alerts_sent(count)
      `)
      .eq('user_id', req.user.id)
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    // Enrich with latest baseline
    const enriched = await Promise.all((data || []).map(async (route) => {
      const month = route.travel_date
        ? route.travel_date.substring(0, 7)
        : route.flexible_month;

      if (month) {
        const { data: baseline } = await supabase
          .from('price_baselines')
          .select('baseline_price_brl, computed_at')
          .eq('origin_iata', route.origin_iata)
          .eq('destination_iata', route.destination_iata)
          .eq('travel_month', month)
          .single();

        return { ...route, baseline };
      }
      return route;
    }));

    return res.json({ routes: enriched });
  } catch (err) {
    logger.error('Get routes error:', err);
    return res.status(500).json({ error: 'Failed to get routes' });
  }
});

// POST /api/routes
router.post('/', authenticate, async (req, res) => {
  try {
    const body = routeSchema.parse(req.body);

    // Validate: must have either travel_date or flexible_month
    if (!body.travel_date && !body.flexible_month) {
      return res.status(400).json({ error: 'Either travel_date or flexible_month is required' });
    }

    // Check limit per user (free tier: 10 routes)
    const { count } = await supabase
      .from('tracked_routes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .eq('active', true);

    if (count >= 10) {
      return res.status(400).json({ error: 'Maximum 10 tracked routes allowed' });
    }

    const { data, error } = await supabase
      .from('tracked_routes')
      .insert({
        ...body,
        user_id: req.user.id,
      })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ route: data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    logger.error('Create route error:', err);
    return res.status(500).json({ error: 'Failed to create route' });
  }
});

// DELETE /api/routes/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { error } = await supabase
      .from('tracked_routes')
      .update({ active: false })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: 'Route removed' });
  } catch (err) {
    logger.error('Delete route error:', err);
    return res.status(500).json({ error: 'Failed to delete route' });
  }
});

// PATCH /api/routes/:id
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const allowed = ['alert_20_percent', 'alert_50_percent', 'active'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const { data, error } = await supabase
      .from('tracked_routes')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ route: data });
  } catch (err) {
    logger.error('Update route error:', err);
    return res.status(500).json({ error: 'Failed to update route' });
  }
});

module.exports = router;