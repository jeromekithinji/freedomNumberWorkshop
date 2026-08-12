import { useState } from 'react'
import './RegistrationFormModal.scss'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  experienceLevel: '',
  preferredSession: '',
  message: '',
}

export function RegistrationFormModal({
  errorMessage,
  fieldOptions,
  isOpen,
  isSubmitting,
  isSuccess,
  onClose,
  onSubmit,
}) {
  const [formState, setFormState] = useState(initialFormState)

  if (!isOpen) {
    return null
  }

  function handleClose() {
    setFormState(initialFormState)
    onClose()
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const didSubmit = await onSubmit(formState)

    if (didSubmit) {
      setFormState(initialFormState)
    }
  }

  return (
    <div className="registration-modal" role="presentation">
      <div
        className="registration-modal__backdrop"
        onClick={handleClose}
        role="presentation"
      />
      <section
        aria-labelledby="registration-modal-title"
        aria-modal="true"
        className="registration-modal__dialog"
        role="dialog"
      >
        <button
          type="button"
          className="registration-modal__close"
          onClick={handleClose}
          aria-label="Close registration modal"
        >
          x
        </button>

        {isSuccess ? (
          <div className="registration-modal__success">
            <p className="registration-modal__eyebrow">Registration received</p>
            <h2 id="registration-modal-title">You are on the list</h2>
            <p>
              Thanks for registering. We saved your submission and will follow
              up with workshop access details.
            </p>
            <button
              type="button"
              className="registration-modal__button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form className="registration-modal__form" onSubmit={handleSubmit}>
            <div className="registration-modal__header">
              <p className="registration-modal__eyebrow">Register now</p>
              <h2 id="registration-modal-title">Reserve your seat</h2>
              <p>
                Tell us where you are in your money journey so we can tailor
                the workshop follow-up.
              </p>
            </div>

            <div className="registration-modal__grid">
              <label>
                Full name
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                />
              </label>

              <label>
                Organization
                <input
                  name="organization"
                  value={formState.organization}
                  onChange={handleChange}
                />
              </label>

              <label>
                Experience level
                <select
                  name="experienceLevel"
                  value={formState.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select one</option>
                  {fieldOptions.experienceLevels.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Preferred access
                <select
                  name="preferredSession"
                  value={formState.preferredSession}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select one</option>
                  {fieldOptions.preferredSessions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              What money goal are you working toward?
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="4"
              />
            </label>

            {errorMessage ? (
              <p className="registration-modal__error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="registration-modal__button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit registration'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
