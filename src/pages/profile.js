/// src/pages/profile.js
import { parse } from 'cookie'
import { sessions, users } from '../lib/data'
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

export default function Profile({ user }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="container">
      <h1>Your Profile</h1>
      <div className="details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="actions">
        <button onClick={() => router.push('/update')}>Update Profile</button>
        <button className="logout" onClick={handleLogout}>Log Out</button>
      </div>

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
        .details p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #333;
        }
        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        button {
          flex: 1;
          padding: 0.75rem;
          margin: 0 0.25rem;
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }
        button.logout {
          background: #d00;
        }
        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}
