import './WorkshopTimelineSection.scss'

export function WorkshopTimelineSection({ content }) {
  return (
    <section
      className="workshop-timeline-section"
      aria-labelledby="workshop-timeline-title"
    >
      <div className="workshop-timeline-section__inner">
        <h2 id="workshop-timeline-title">{content.title}</h2>

        <ol className="workshop-timeline-section__timeline">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className="workshop-timeline-section__number">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="workshop-timeline-section__note">{content.note}</p>
      </div>
    </section>
  )
}
