{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const \{ z \} = require('zod');\
const \{ supabase \} = require('../../config/supabase');\
const \{ authenticate \} = require('../middleware/auth');\
const \{ logger \} = require('../utils/logger');\
\
const router = express.Router();\
\
const signupSchema = z.object(\{\
  email: z.string().email(),\
  password: z.string().min(8),\
  name: z.string().min(1).max(100).optional(),\
\});\
\
const loginSchema = z.object(\{\
  email: z.string().email(),\
  password: z.string().min(1),\
\});\
\
// POST /api/auth/signup\
router.post('/signup', async (req, res) => \{\
  try \{\
    const \{ email, password, name \} = signupSchema.parse(req.body);\
\
    const \{ data, error \} = await supabase.auth.signUp(\{\
      email,\
      password,\
      options: \{\
        data: \{ name: name || email.split('@')[0] \},\
      \},\
    \});\
\
    if (error) \{\
      return res.status(400).json(\{ error: error.message \});\
    \}\
\
    return res.status(201).json(\{\
      message: 'Account created. Check your email to confirm.',\
      user: \{ id: data.user?.id, email: data.user?.email \},\
    \});\
  \} catch (err) \{\
    if (err instanceof z.ZodError) \{\
      return res.status(400).json(\{ error: err.errors[0].message \});\
    \}\
    logger.error('Signup error:', err);\
    return res.status(500).json(\{ error: 'Signup failed' \});\
  \}\
\});\
\
// POST /api/auth/login\
router.post('/login', async (req, res) => \{\
  try \{\
    const \{ email, password \} = loginSchema.parse(req.body);\
\
    const \{ data, error \} = await supabase.auth.signInWithPassword(\{ email, password \});\
\
    if (error) \{\
      return res.status(401).json(\{ error: 'Invalid email or password' \});\
    \}\
\
    return res.json(\{\
      token: data.session.access_token,\
      refresh_token: data.session.refresh_token,\
      user: \{\
        id: data.user.id,\
        email: data.user.email,\
        name: data.user.user_metadata?.name,\
      \},\
    \});\
  \} catch (err) \{\
    if (err instanceof z.ZodError) \{\
      return res.status(400).json(\{ error: err.errors[0].message \});\
    \}\
    logger.error('Login error:', err);\
    return res.status(500).json(\{ error: 'Login failed' \});\
  \}\
\});\
\
// POST /api/auth/refresh\
router.post('/refresh', async (req, res) => \{\
  try \{\
    const \{ refresh_token \} = req.body;\
    if (!refresh_token) return res.status(400).json(\{ error: 'refresh_token required' \});\
\
    const \{ data, error \} = await supabase.auth.refreshSession(\{ refresh_token \});\
    if (error) return res.status(401).json(\{ error: 'Invalid refresh token' \});\
\
    return res.json(\{\
      token: data.session.access_token,\
      refresh_token: data.session.refresh_token,\
    \});\
  \} catch (err) \{\
    logger.error('Refresh error:', err);\
    return res.status(500).json(\{ error: 'Token refresh failed' \});\
  \}\
\});\
\
// GET /api/auth/me\
router.get('/me', authenticate, async (req, res) => \{\
  try \{\
    const \{ data: user, error \} = await supabase\
      .from('users')\
      .select('*')\
      .eq('id', req.user.id)\
      .single();\
\
    if (error) return res.status(404).json(\{ error: 'User not found' \});\
\
    return res.json(\{ user \});\
  \} catch (err) \{\
    logger.error('Get me error:', err);\
    return res.status(500).json(\{ error: 'Failed to get user' \});\
  \}\
\});\
\
// PATCH /api/auth/me\
router.patch('/me', authenticate, async (req, res) => \{\
  try \{\
    const allowed = ['name', 'notify_email', 'notify_telegram', 'alert_threshold_20', 'alert_threshold_50'];\
    const updates = \{\};\
    for (const key of allowed) \{\
      if (req.body[key] !== undefined) updates[key] = req.body[key];\
    \}\
\
    const \{ data, error \} = await supabase\
      .from('users')\
      .update(updates)\
      .eq('id', req.user.id)\
      .select()\
      .single();\
\
    if (error) return res.status(400).json(\{ error: error.message \});\
\
    return res.json(\{ user: data \});\
  \} catch (err) \{\
    logger.error('Update me error:', err);\
    return res.status(500).json(\{ error: 'Update failed' \});\
  \}\
\});\
\
module.exports = router;}