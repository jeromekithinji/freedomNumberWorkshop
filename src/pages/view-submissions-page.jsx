import { useEffect, useState } from 'react'
import './view-submissions-page.scss'

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

  return (
    <main className="submissions-page">
      <header className="submissions-page__header">
        <a href="/">Back to landing page</a>
        <h1>Workshop Submissions</h1>
        <p>Review registrations submitted through the landing page form.</p>
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
                <th>Name</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Preferred Access</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.name}</td>
                  <td>{submission.email}</td>
                  <td>{submission.experienceLevel}</td>
                  <td>{submission.preferredSession}</td>
                  <td>
                    {new Intl.DateTimeFormat('en', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(submission.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  )
}
