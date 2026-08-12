import './ParticipantResourcesSection.scss'

function ResourceIcon({ name }) {
  const iconPaths = {
    document: (
      <>
        <path d="M8 5h6l3 3v11H8z" />
        <path d="M14 5v4h3M10 12h4M10 15h4" />
      </>
    ),
    calculator: (
      <>
        <rect x="7" y="5" width="10" height="14" rx="1.5" />
        <path d="M9 8h6M9 12h1M12 12h1M15 12h1M9 15h1M12 15h1M15 15h1" />
      </>
    ),
    chart: (
      <>
        <path d="M6 18h12" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </>
    ),
    clipboard: (
      <>
        <rect x="7" y="6" width="10" height="13" rx="1.5" />
        <path d="M10 6.5h4M10 11h4M10 14h4" />
      </>
    ),
    trend: <path d="M5 15l5-5 3 3 6-7" />,
    calendar: (
      <>
        <rect x="6" y="7" width="12" height="11" rx="1.5" />
        <path d="M9 5v4M15 5v4M6 11h12" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

export function ParticipantResourcesSection({ content }) {
  return (
    <section
      className="participant-resources-section"
      aria-labelledby="participant-resources-title"
    >
      <div className="participant-resources-section__inner">
        <h2 id="participant-resources-title">{content.title}</h2>

        <div className="participant-resources-section__grid">
          {content.resources.map((resource) => (
            <article
              className="participant-resources-section__card"
              key={resource.title}
            >
              <span className="participant-resources-section__icon">
                <ResourceIcon name={resource.icon} />
              </span>
              <p>{resource.title}</p>
            </article>
          ))}
        </div>

        <p className="participant-resources-section__note">{content.note}</p>
      </div>
    </section>
  )
}
