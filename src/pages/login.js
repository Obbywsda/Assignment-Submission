// src/pages/login.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/profile')
    } else {
      const { message } = await res.json()
      setError(message || 'Login failed')
    }
  }

  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
        </label>

        <button type="submit">Log In</button>
      </form>

      <p className="switch">
      Don’t have an account? <Link href="/">Register</Link>
      </p>

      {error && <p className="error">{error}</p>}

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
        input::placeholder {
          color: #666;
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
        .switch {
          text-align: center;
          margin-top: 1rem;
          color: #555;
        }
        .switch a {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
        }
        .switch a:hover {
          text-decoration: underline;
        }
        .error {
          color: #d00;
          text-align: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  )
}
