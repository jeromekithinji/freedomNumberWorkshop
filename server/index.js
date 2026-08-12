import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {
  createRegistration,
  listRegistrations,
} from '../api/_registrations-shared.js'
import { getDatabase } from './db.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
  response.status(200).json({ status: 'ok' })
})

app.get('/api/registrations', async (request, response) => {
  try {
    const registrations = await listRegistrations(getDatabase())
    response.json({ registrations })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

app.post('/api/registrations', async (request, response) => {
  try {
    const result = await createRegistration(getDatabase(), request.body || {})

    if (result.error) {
      response.status(400).json({ message: result.error })
      return
    }

    response.status(201).json({ registration: result.registration })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

app.get('/api/registrations/view', async (request, response) => {
  try {
    const registrations = await listRegistrations(getDatabase())
    response.json({ registrations })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Local API listening on http://localhost:${port}`)
})
