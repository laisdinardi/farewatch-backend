{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const winston = require('winston');\
\
const logger = winston.createLogger(\{\
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',\
  format: winston.format.combine(\
    winston.format.timestamp(),\
    winston.format.errors(\{ stack: true \}),\
    winston.format.json()\
  ),\
  transports: [\
    new winston.transports.Console(\{\
      format: winston.format.combine(\
        winston.format.colorize(),\
        winston.format.printf((\{ timestamp, level, message, ...meta \}) => \{\
          const metaStr = Object.keys(meta).length ? ` $\{JSON.stringify(meta)\}` : '';\
          return `$\{timestamp\} [$\{level\}]: $\{message\}$\{metaStr\}`;\
        \})\
      ),\
    \}),\
  ],\
\});\
\
module.exports = \{ logger \};}