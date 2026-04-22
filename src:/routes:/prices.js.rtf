{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const \{ supabase \} = require('../../config/supabase');\
const \{ authenticate \} = require('../middleware/auth');\
const \{ searchFlights \} = require('../services/flightService');\
const \{ getBaseline \} = require('../services/priceAnalyzer');\
const \{ runPriceCheck \} = require('../jobs/priceChecker');\
const \{ logger \} = require('../utils/logger');\
\
const router = express.Router();\
\
// GET /api/prices/history/:origin/:destination\
router.get('/history/:origin/:destination', authenticate, async (req, res) => \{\
  try \{\
    const \{ origin, destination \} = req.params;\
    const \{ month, limit = 100 \} = req.query;\
\
    let query = supabase\
      .from('price_history')\
      .select('price_brl, airline, source, stops, fetched_at, flexible_month, travel_date')\
      .eq('origin_iata', origin.toUpperCase())\
      .eq('destination_iata', destination.toUpperCase())\
      .order('fetched_at', \{ ascending: false \})\
      .limit(parseInt(limit));\
\
    if (month) \{\
      query = query.or(`flexible_month.eq.$\{month\},travel_date.like.$\{month\}%`);\
    \}\
\
    const \{ data, error \} = await query;\
    if (error) return res.status(400).json(\{ error: error.message \});\
\
    return res.json(\{ history: data || [] \});\
  \} catch (err) \{\
    logger.error('Get price history error:', err);\
    return res.status(500).json(\{ error: 'Failed to get price history' \});\
  \}\
\});\
\
// GET /api/prices/baseline/:origin/:destination/:month\
router.get('/baseline/:origin/:destination/:month', authenticate, async (req, res) => \{\
  try \{\
    const \{ origin, destination, month \} = req.params;\
\
    const baseline = await getBaseline(\{\
      origin: origin.toUpperCase(),\
      destination: destination.toUpperCase(),\
      travelMonth: month,\
    \});\
\
    return res.json(\{ baseline, month, origin, destination \});\
  \} catch (err) \{\
    logger.error('Get baseline error:', err);\
    return res.status(500).json(\{ error: 'Failed to get baseline' \});\
  \}\
\});\
\
// GET /api/prices/search\
router.get('/search', authenticate, async (req, res) => \{\
  try \{\
    const \{ origin, destination, date, month \} = req.query;\
\
    if (!origin || !destination) \{\
      return res.status(400).json(\{ error: 'origin and destination required' \});\
    \}\
\
    const flights = await searchFlights(\{\
      origin: origin.toUpperCase(),\
      destination: destination.toUpperCase(),\
      travelDate: date || null,\
      flexibleMonth: month || null,\
    \});\
\
    return res.json(\{ flights, count: flights.length \});\
  \} catch (err) \{\
    logger.error('Search error:', err);\
    return res.status(500).json(\{ error: 'Search failed' \});\
  \}\
\});\
\
// GET /api/prices/alerts\
router.get('/alerts', authenticate, async (req, res) => \{\
  try \{\
    const \{ data, error \} = await supabase\
      .from('alerts_sent')\
      .select(`\
        *,\
        tracked_routes(origin_iata, destination_iata, origin_city, destination_city)\
      `)\
      .eq('user_id', req.user.id)\
      .order('sent_at', \{ ascending: false \})\
      .limit(50);\
\
    if (error) return res.status(400).json(\{ error: error.message \});\
\
    return res.json(\{ alerts: data || [] \});\
  \} catch (err) \{\
    logger.error('Get alerts error:', err);\
    return res.status(500).json(\{ error: 'Failed to get alerts' \});\
  \}\
\});\
\
// POST /api/prices/check-now (manual trigger for testing)\
router.post('/check-now', authenticate, async (req, res) => \{\
  try \{\
    // Run in background\
    runPriceCheck().catch((err) => logger.error('Manual check failed:', err));\
    return res.json(\{ message: 'Price check started in background' \});\
  \} catch (err) \{\
    logger.error('Manual check error:', err);\
    return res.status(500).json(\{ error: 'Failed to trigger check' \});\
  \}\
\});\
\
module.exports = router;}