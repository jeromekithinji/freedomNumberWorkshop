import './FinalCtaSection.scss'

const detailIcons = ['calendar', 'clock', 'screen']

function DetailIcon({ name }) {
  const paths = {
    calendar: (
      <>
        <path d="M7 3v4M17 3v4" />
        <path d="M5 5h14v14H5z" />
        <path d="M5 9h14" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    screen: (
      <>
        <path d="M4 5h16v11H4z" />
        <path d="M9 20h6M12 16v4" />
      </>
    ),
    coins: (
      <>
        <circle cx="9" cy="10" r="6" />
        <path d="M9 7v6M7.5 8.5h2.25a1.5 1.5 0 0 1 0 3H8" />
        <path d="M14 8.5a6 6 0 1 1-2.5 10.95" />
      </>
    ),
  }

  return (
    <svg
      className="final-cta-section__detail-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export function FinalCtaSection({ content, onRegister }) {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-title">
      <div className="final-cta-section__inner">
        <h2 id="final-cta-title">{content.title}</h2>
        <p>{content.description}</p>
        <p>{content.supportingText}</p>

        <button type="button" onClick={onRegister}>
          {content.action}
        </button>

        <ul className="final-cta-section__details">
          {content.details.map((detail, index) => (
            <li key={detail}>
              <DetailIcon name={detailIcons[index]} />
              {detail}
            </li>
          ))}
        </ul>

        <p className="final-cta-section__investment">
          <DetailIcon name="coins" />
          {content.investment}
        </p>
      </div>
    </section>
  )
}
