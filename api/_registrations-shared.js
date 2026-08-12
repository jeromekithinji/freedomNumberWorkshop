const createTableSql = `
  CREATE TABLE IF NOT EXISTS registrations (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    preferred_currency TEXT,
    has_paid BOOLEAN NOT NULL DEFAULT false,
    payment_method TEXT,
    payment_reference TEXT,
    payment_date DATE,
    proof_of_payment_name TEXT,
    consent BOOLEAN NOT NULL DEFAULT false,
    wants_updates BOOLEAN NOT NULL DEFAULT false,
    organization TEXT,
    experience_level TEXT,
    preferred_session TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`

const alterTableSql = [
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS country TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS preferred_currency TEXT',
  `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS
    has_paid BOOLEAN NOT NULL DEFAULT false`,
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_method TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_reference TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_date DATE',
  `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS
    proof_of_payment_name TEXT`,
  `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS
    consent BOOLEAN NOT NULL DEFAULT false`,
  `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS
    wants_updates BOOLEAN NOT NULL DEFAULT false`,
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS organization TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS experience_level TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS preferred_session TEXT',
  'ALTER TABLE registrations ADD COLUMN IF NOT EXISTS message TEXT',
]

function cleanValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function cleanDate(value) {
  const date = cleanValue(value)

  return date || null
}

function toRegistration(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    preferredCurrency: row.preferred_currency,
    hasPaid: row.has_paid,
    paymentMethod: row.payment_method,
    paymentReference: row.payment_reference,
    paymentDate: row.payment_date,
    proofOfPaymentName: row.proof_of_payment_name,
    consent: row.consent,
    wantsUpdates: row.wants_updates,
    organization: row.organization,
    experienceLevel: row.experience_level,
    preferredSession: row.preferred_session,
    message: row.message,
    createdAt: row.created_at,
  }
}

export async function ensureRegistrationsTable(database) {
  await database.query(createTableSql)

  for (const statement of alterTableSql) {
    await database.query(statement)
  }
}

export function validateRegistration(input = {}) {
  const registration = {
    name: cleanValue(input.name),
    email: cleanValue(input.email).toLowerCase(),
    phone: cleanValue(input.phone),
    country: cleanValue(input.country || input.organization),
    preferredCurrency: cleanValue(input.preferredCurrency),
    hasPaid: input.hasPaid === true || input.hasPaid === 'yes',
    paymentMethod: cleanValue(input.paymentMethod),
    paymentReference: cleanValue(input.paymentReference),
    paymentDate: cleanDate(input.paymentDate),
    proofOfPaymentName: cleanValue(input.proofOfPaymentName),
    consent: input.consent === true,
    wantsUpdates: input.wantsUpdates === true,
    organization: cleanValue(input.organization),
    experienceLevel: cleanValue(input.experienceLevel),
    preferredSession: cleanValue(input.preferredSession),
    message: cleanValue(input.message),
  }

  if (!registration.name) {
    return { error: 'Name is required' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    return { error: 'A valid email is required' }
  }

  if (!registration.phone) {
    return { error: 'Mobile number is required' }
  }

  if (!registration.country) {
    return { error: 'Country is required' }
  }

  if (!registration.preferredCurrency) {
    return { error: 'Preferred currency is required' }
  }

  if (!registration.consent) {
    return { error: 'Consent is required' }
  }

  return { registration }
}

export async function createRegistration(database, input = {}) {
  const { error, registration } = validateRegistration(input)

  if (error) {
    return { error }
  }

  await ensureRegistrationsTable(database)

  const result = await database.query(
    `INSERT INTO registrations (
      name,
      email,
      phone,
      country,
      preferred_currency,
      has_paid,
      payment_method,
      payment_reference,
      payment_date,
      proof_of_payment_name,
      consent,
      wants_updates,
      organization,
      experience_level,
      preferred_session,
      message
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15, $16
    )
    RETURNING *`,
    [
      registration.name,
      registration.email,
      registration.phone,
      registration.country,
      registration.preferredCurrency,
      registration.hasPaid,
      registration.paymentMethod || null,
      registration.paymentReference || null,
      registration.paymentDate,
      registration.proofOfPaymentName || null,
      registration.consent,
      registration.wantsUpdates,
      registration.organization || null,
      registration.experienceLevel || null,
      registration.preferredSession || null,
      registration.message || null,
    ],
  )

  return { registration: toRegistration(result.rows[0]) }
}

export async function listRegistrations(database) {
  await ensureRegistrationsTable(database)

  const result = await database.query(
    'SELECT * FROM registrations ORDER BY created_at DESC',
  )

  return result.rows.map(toRegistration)
}
