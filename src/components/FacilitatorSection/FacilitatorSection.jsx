import './FacilitatorSection.scss'

export function FacilitatorSection({ content }) {
  return (
    <section
      className="facilitator-section"
      aria-labelledby="facilitator-title"
    >
      <div className="facilitator-section__inner">
        <h2 id="facilitator-title">{content.title}</h2>

        <div className="facilitator-section__layout">
          <div className="facilitator-section__photo-card">
            <div className="facilitator-section__initials">
              {content.initials}
            </div>
            <p>{content.placeholder}</p>
            <span>{content.placeholderNote}</span>
          </div>

          <div className="facilitator-section__content">
            <h3>{content.name}</h3>
            <p className="facilitator-section__role">{content.role}</p>

            {content.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <blockquote>
              <span aria-hidden="true">"</span>
              <div>
                <p>{content.quote}</p>
                <cite>{content.quoteAttribution}</cite>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
