import './DiscoverySection.scss'

function DiscoveryIcon({ name }) {
  const iconPaths = {
    target: (
      <>
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    trend: <path d="M5 15l5-5 3 3 6-7" />,
    calculator: (
      <>
        <rect x="7" y="5" width="10" height="14" rx="1.5" />
        <path d="M9 8h6M9 12h1M12 12h1M15 12h1M9 15h1M12 15h1M15 15h1" />
      </>
    ),
    dollar: <path d="M12 5v14M16 8.5c-1-1-2.2-1.5-4-1.5-2 0-3 1-3 2.4 0 3.6 7 1.8 7 5.2 0 1.4-1.2 2.4-3.5 2.4-1.8 0-3.4-.6-4.5-1.7" />,
    chart: (
      <>
        <path d="M6 18h12" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </>
    ),
    shield: <path d="M12 5l6 2v4.5c0 3.7-2.4 6.2-6 7.5-3.6-1.3-6-3.8-6-7.5V7l6-2z" />,
    compass: (
      <>
        <circle cx="12" cy="12" r="7" />
        <path d="M14.5 9.5l-1.7 3.3-3.3 1.7 1.7-3.3 3.3-1.7z" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 14c-1.2-.9-2-2.2-2-3.8C7 7.3 9.2 5 12 5s5 2.3 5 5.2c0 1.6-.8 2.9-2 3.8" />
        <path d="M10 16h4M10.5 19h3" />
      </>
    ),
    clipboard: (
      <>
        <rect x="7" y="6" width="10" height="13" rx="1.5" />
        <path d="M10 6.5h4M10 11h4M10 14h4" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

export function DiscoverySection({ content }) {
  return (
    <section className="discovery-section" aria-labelledby="discovery-title">
      <div className="discovery-section__inner">
        <h2 id="discovery-title">{content.title}</h2>

        <div className="discovery-section__grid">
          {content.cards.map((card) => (
            <article className="discovery-section__card" key={card.text}>
              <span className="discovery-section__icon">
                <DiscoveryIcon name={card.icon} />
              </span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
