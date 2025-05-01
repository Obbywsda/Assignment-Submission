import { users } from '../../lib/data'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, and password are required' })
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), name, email, password: hashed }
  users.push(user)

  return res.status(201).json({ message: 'User registered' })
}
