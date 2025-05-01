// src/lib/data.js
// if we’ve already set up a global stash, reuse it
if (!globalThis.__MY_APP_STORE__) {
    globalThis.__MY_APP_STORE__ = {
      users:   [],
      sessions:{}
    }
  }
  const store = globalThis.__MY_APP_STORE__
  
  export const users    = store.users
  export const sessions = store.sessions
  