import { getPool } from '../api/_db.js'

export function getDatabase() {
  return getPool()
}
