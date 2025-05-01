// src/pages/register.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/login')
    } else {
      const { message } = await res.json()
      setError(message)
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form">
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

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>

      <p className="switch">
        Already have an account?{' '}
   <Link href="/login">Log In</Link>
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
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 1rem;
          font-weight: 500;
        }
       input {
         width: 100%;
         padding: 0.5rem;
         margin-top: 0.25rem;
         border: 1px solid #ccc;
         border-radius: 4px;
         font-size: 1rem;
         background: #f9f9f9;    /* light grey background */
         color: #111;             /* dark text */
       }
     input::placeholder {
        color: #666;             /* grey placeholder */}
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
        }
        .switch a {
          color: #0070f3;
          text-decoration: none;
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
