// src/pages/update.js
import { parse } from 'cookie'
import { sessions, users } from '../lib/data'
import { useState } from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '')
  const userId = sessions[cookies.sessionId]
  if (!userId) {
    return { redirect: { destination: '/login', permanent: false } }
  }
  const user = users.find(u => u.id === userId)
  return { props: { user: { name: user.name, email: user.email } } }
}

export default function UpdateProfile({ user }) {
  const [form, setForm] = useState(user)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleUpdate(e) {
    e.preventDefault()
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setMessage(data.message || 'Profile updated')
    if (res.ok) {
      setTimeout(() => router.push('/profile'), 1000)
    }
  }

  return (
    <div className="container">
      <h1>Update Profile</h1>
      <form onSubmit={handleUpdate} className="form">
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 4rem auto;
          padding: 2rem;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          box-shadow: 0 2px 8px #0070f3;
          font-family: Arial, sans-serif;
          background: #fff;
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #0070f3;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 1rem;
          font-weight: 500;
          color: #0070f3;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          background: #f9f9f9;
          color: #111;
        }
        button {
          padding: 0.75rem;
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover {
          background: #005bb5;
        }
        .message {
          text-align: center;
          margin-top: 1rem;
          color: #008000;
        }
      `}</style>
    </div>
  )
}
