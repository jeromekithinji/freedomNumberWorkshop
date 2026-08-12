import pg from 'pg'

const { Pool } = pg

let pool

function getConnectionConfig() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required')
  }

  const isLocalDatabase = process.env.DATABASE_URL.includes('localhost')

  return {
    connectionString: process.env.DATABASE_URL,
    ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
  }
}

export function getPool() {
  if (!pool) {
    pool = new Pool(getConnectionConfig())
  }

  return pool
}

export async function query(text, params = []) {
  return getPool().query(text, params)
}
