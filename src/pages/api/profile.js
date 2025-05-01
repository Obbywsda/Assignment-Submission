import { users, sessions } from '../../lib/data'
import cookie from 'cookie'
import { parse } from 'cookie'

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '')
  const userId = sessions[cookies.sessionId]
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(401).json({ message: 'Invalid session' })
  }

  if (req.method === 'GET') {
    // return profile data
    return res.status(200).json({ name: user.name, email: user.email })
  }

  if (req.method === 'POST') {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ message: 'name and email required' })
    }
    user.name = name
    user.email = email
    return res.status(200).json({ message: 'Profile updated' })
  }

  return res.status(405).end()
}
