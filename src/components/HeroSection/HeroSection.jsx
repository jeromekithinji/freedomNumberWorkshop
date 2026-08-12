import './HeroSection.scss'

export function HeroSection({
  content,
  onRegister,
}) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__content">
        <h1 id="hero-title">{content.title}</h1>
        <p className="hero-section__subtitle">{content.subtitle}</p>
        <p className="hero-section__description">{content.description}</p>

        <ul className="hero-section__details" aria-label="Workshop details">
          {content.eventDetails.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <p className="hero-section__investment">{content.investment}</p>

        <button
          type="button"
          className="hero-section__button"
          onClick={onRegister}
        >
          {content.primaryAction}
        </button>

        <p className="hero-section__note">{content.note}</p>
      </div>

      <aside className="hero-section__card" aria-label="Workshop details">
        <div className="hero-section__monogram" aria-hidden="true">
          {content.card.monogram}
        </div>
        <h2>{content.card.title}</h2>
        <p>{content.card.description}</p>
        <span className="hero-section__divider" aria-hidden="true" />
        <p className="hero-section__byline">{content.card.byline}</p>
      </aside>
    </section>
  )
}
