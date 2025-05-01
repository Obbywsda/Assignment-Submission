import { users, sessions } from '../../lib/data'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import cookie from 'cookie'
import { serialize } from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // create session
  const sessionId = uuidv4()
  sessions[sessionId] = user.id

  // set cookie
  res.setHeader('Set-Cookie', serialize('sessionId', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  }))

  return res.status(200).json({ message: 'Logged in' })
}

