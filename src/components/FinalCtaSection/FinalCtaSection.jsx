import './FinalCtaSection.scss'

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
          {content.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <p className="final-cta-section__investment">
          {content.investment}
        </p>
      </div>
    </section>
  )
}
