import { query } from './_db.js'
import {
  createRegistration,
  listRegistrations,
} from './_registrations-shared.js'

const database = { query }

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload)
}

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const registrations = await listRegistrations(database)
      sendJson(response, 200, { registrations })
      return
    }

    if (request.method === 'POST') {
      const result = await createRegistration(database, request.body || {})

      if (result.error) {
        sendJson(response, 400, { message: result.error })
        return
      }

      sendJson(response, 201, { registration: result.registration })
      return
    }

    response.setHeader('Allow', ['GET', 'POST'])
    sendJson(response, 405, { message: 'Method not allowed' })
  } catch (err) {
    sendJson(response, 500, { message: err.message })
  }
}
