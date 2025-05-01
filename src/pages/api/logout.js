// src/pages/api/logout.js
import { parse } from 'cookie'
import { serialize } from 'cookie'
import { sessions } from '../../lib/data'

export default function handler(req, res) {
  // remove session server-side
  const cookies = parse(req.headers.cookie || '')
  const sessionId = cookies.sessionId
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId]
  }

  // clear cookie
  res.setHeader('Set-Cookie', serialize('sessionId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  }))

  res.status(200).json({ message: 'Logged out' })
}

