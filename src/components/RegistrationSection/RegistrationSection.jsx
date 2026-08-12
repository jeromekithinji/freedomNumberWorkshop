import { useState } from 'react'
import './RegistrationSection.scss'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  country: '',
  preferredCurrency: '',
  hasPaid: '',
  paymentMethod: '',
  paymentReference: '',
  paymentDate: '',
  proofOfPaymentName: '',
  consent: false,
  wantsUpdates: false,
}

export function RegistrationSection({ fieldOptions }) {
  const [formState, setFormState] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const { name, type, checked, value } = event.target

    setFormState((currentState) => ({
      ...currentState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handlePaymentChange(event) {
    const hasPaid = event.target.value

    setFormState((currentState) => ({
      ...currentState,
      hasPaid,
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files[0]

    setFormState((currentState) => ({
      ...currentState,
      proofOfPaymentName: file ? file.name : '',
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to submit registration')
      }

      setSuccessMessage('Your registration has been submitted.')
      setFormState(initialFormState)
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="registration-section"
      id="registration-section"
      aria-labelledby="registration-section-title"
    >
      <div className="registration-section__inner">
        <header>
          <h2 id="registration-section-title">Register for the Workshop</h2>
          <p>Complete the form below to reserve your place.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name <span>*</span>
            <input
              name="name"
              placeholder="Enter your full name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address <span>*</span>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mobile Number (including country code) <span>*</span>
            <input
              type="tel"
              name="phone"
              placeholder="+254 700 000 000"
              value={formState.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Country <span>*</span>
            <input
              name="country"
              placeholder="e.g. Kenya, Nigeria, United States"
              value={formState.country}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Preferred Currency <span>*</span>
            <select
              name="preferredCurrency"
              value={formState.preferredCurrency}
              onChange={handleChange}
              required
            >
              <option value="">Select your preferred currency</option>
              {fieldOptions.currencies.map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="registration-section__radios">
            <legend>Have you made payment? <span>*</span></legend>
            <label>
              <input
                type="radio"
                name="hasPaid"
                value="yes"
                checked={formState.hasPaid === 'yes'}
                onChange={handlePaymentChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasPaid"
                value="no"
                checked={formState.hasPaid === 'no'}
                onChange={handlePaymentChange}
                required
              />
              No
            </label>
          </fieldset>

          {formState.hasPaid === 'yes' ? (
            <div className="registration-section__payment-card">
              <h3>Payment Details (optional)</h3>

              <label>
                Payment Method
                <input
                  name="paymentMethod"
                  placeholder="e.g. M-Pesa, Bank Transfer, PayPal"
                  value={formState.paymentMethod}
                  onChange={handleChange}
                />
              </label>

              <label>
                Payment Reference or Transaction Code
                <input
                  name="paymentReference"
                  placeholder="Enter your transaction reference"
                  value={formState.paymentReference}
                  onChange={handleChange}
                />
              </label>

              <label>
                Date of Payment
                <input
                  type="date"
                  name="paymentDate"
                  value={formState.paymentDate}
                  onChange={handleChange}
                />
              </label>

              <label>
                Upload Proof of Payment
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <small>Accepted formats: images or PDF (max 5MB)</small>
              </label>
            </div>
          ) : null}

          {formState.hasPaid === 'no' ? (
            <p className="registration-section__pending-note">
              Your place will be reserved temporarily. Registration will be
              confirmed after payment is received and verified.
            </p>
          ) : null}

          <label className="registration-section__checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={formState.consent}
              onChange={handleChange}
              required
            />
            <span>
              I consent to my information being used to process my workshop
              registration and communicate important workshop updates. <b>*</b>
            </span>
          </label>

          <label className="registration-section__checkbox">
            <input
              type="checkbox"
              name="wantsUpdates"
              checked={formState.wantsUpdates}
              onChange={handleChange}
            />
            <span>
              I would like to receive future financial wellness resources and
              programme updates from Helen Kithinji.
            </span>
          </label>

          {errorMessage ? (
            <p className="registration-section__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="registration-section__success" role="status">
              {successMessage}
            </p>
          ) : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit My Registration'}
          </button>

          <p className="registration-section__privacy">
            Your information will be used only for registration and relevant
            workshop communication.
          </p>
        </form>
      </div>
    </section>
  )
}
