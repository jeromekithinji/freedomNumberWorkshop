import './CtaSection.scss'

export function CtaSection({ content }) {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="cta-section__inner">
        <h2 id="cta-title">{content.title}</h2>
        <p>{content.description}</p>
        <p>{content.preface}</p>

        <ul className="cta-section__outcomes">
          {content.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>

        <ol className="cta-section__process" aria-label="Workshop process">
          {content.processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}
