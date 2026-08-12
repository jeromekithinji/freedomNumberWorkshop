import { useEffect, useState } from 'react'
import './view-submissions-page.scss'

function formatDateTime(value) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatDate(value) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

function formatBoolean(value) {
  return value ? 'Yes' : 'No'
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const submissionColumns = [
  {
    label: 'ID',
    getValue: (submission) => submission.id,
  },
  {
    label: 'Full Name',
    getValue: (submission) => submission.name,
  },
  {
    label: 'Email Address',
    getValue: (submission) => submission.email,
  },
  {
    label: 'Mobile Number',
    getValue: (submission) => submission.phone,
  },
  {
    label: 'Country',
    getValue: (submission) => submission.country,
  },
  {
    label: 'Preferred Currency',
    getValue: (submission) => submission.preferredCurrency,
  },
  {
    label: 'Payment Made',
    getValue: (submission) => formatBoolean(submission.hasPaid),
  },
  {
    label: 'Payment Method',
    getValue: (submission) => submission.paymentMethod,
  },
  {
    label: 'Payment Reference',
    getValue: (submission) => submission.paymentReference,
  },
  {
    label: 'Date of Payment',
    getValue: (submission) => formatDate(submission.paymentDate),
  },
  {
    label: 'Proof of Payment',
    getValue: (submission) => submission.proofOfPaymentName,
  },
  {
    label: 'Consent',
    getValue: (submission) => formatBoolean(submission.consent),
  },
  {
    label: 'Future Updates',
    getValue: (submission) => formatBoolean(submission.wantsUpdates),
  },
  {
    label: 'Submitted At',
    getValue: (submission) => formatDateTime(submission.createdAt),
  },
]

export function ViewSubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadSubmissions() {
      try {
        const response = await fetch('/api/registrations/view')
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload.error || 'Unable to load submissions')
        }

        if (isCurrent) {
          setSubmissions(payload.registrations || [])
        }
      } catch (err) {
        if (isCurrent) {
          setErrorMessage(err.message)
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadSubmissions()

    return () => {
      isCurrent = false
    }
  }, [])

  function handleDownloadSpreadsheet() {
    const rows = submissions.map((submission) => (
      `<tr>${submissionColumns.map((column) => (
        `<td>${escapeHtml(column.getValue(submission))}</td>`
      )).join('')}</tr>`
    ))

    const spreadsheet = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${submissionColumns.map((column) => (
                  `<th>${escapeHtml(column.label)}</th>`
                )).join('')}
              </tr>
            </thead>
            <tbody>${rows.join('')}</tbody>
          </table>
        </body>
      </html>
    `

    const blob = new Blob([spreadsheet], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'workshop-registrations.xls'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="submissions-page">
      <header className="submissions-page__header">
        <div>
          <a href="/">Back to landing page</a>
          <h1>Workshop Registrations</h1>
        </div>

        <button
          type="button"
          onClick={handleDownloadSpreadsheet}
          disabled={submissions.length === 0}
        >
          Download Spreadsheet
        </button>
      </header>

      {isLoading ? (
        <p className="submissions-page__status">Loading submissions...</p>
      ) : null}

      {errorMessage ? (
        <p className="submissions-page__status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {!isLoading && !errorMessage && submissions.length === 0 ? (
        <p className="submissions-page__status">
          No submissions have been received yet.
        </p>
      ) : null}

      {submissions.length > 0 ? (
        <div className="submissions-page__table-wrap">
          <table>
            <thead>
              <tr>
                {submissionColumns.map((column) => (
                  <th key={column.label}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  {submissionColumns.map((column) => (
                    <td key={column.label}>
                      {column.getValue(submission) || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}
