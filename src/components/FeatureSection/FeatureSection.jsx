import './FeatureSection.scss'

export function FeatureSection({ content }) {
  return (
    <section className="feature-section" aria-labelledby="feature-title">
      <div className="feature-section__inner">
        <h2 id="feature-title">{content.title}</h2>
        <p>{content.intro}</p>
        <blockquote>{content.quote}</blockquote>
        <p>{content.body}</p>
        <p className="feature-section__emphasis">{content.emphasis}</p>
      </div>
    </section>
  )
}
