import { query } from '../_db.js'
import { listRegistrations } from '../_registrations-shared.js'

const database = { query }

export default async function handler(request, response) {
  try {
    if (request.method !== 'GET') {
      response.setHeader('Allow', ['GET'])
      response.status(405).json({ message: 'Method not allowed' })
      return
    }

    const registrations = await listRegistrations(database)
    response.status(200).json({ registrations })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}
