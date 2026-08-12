import './FinancialLevelsSection.scss'

function LevelIcon({ name }) {
  const iconPaths = {
    shield: <path d="M12 5l6 2v4.5c0 3.7-2.4 6.2-6 7.5-3.6-1.3-6-3.8-6-7.5V7l6-2z" />,
    home: (
      <>
        <path d="M5 11l7-6 7 6" />
        <path d="M7 10.5V19h10v-8.5" />
        <path d="M10 19v-5h4v5" />
      </>
    ),
    heart: <path d="M12 19s-7-4.3-7-9.2C5 7.4 6.8 6 8.8 6c1.2 0 2.4.7 3.2 1.8C12.8 6.7 14 6 15.2 6 17.2 6 19 7.4 19 9.8 19 14.7 12 19 12 19z" />,
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

export function FinancialLevelsSection({ content }) {
  return (
    <section
      className="financial-levels-section"
      aria-labelledby="financial-levels-title"
    >
      <div className="financial-levels-section__inner">
        <h2 id="financial-levels-title">{content.title}</h2>

        <div className="financial-levels-section__grid">
          {content.levels.map((level) => (
            <article
              className="financial-levels-section__card"
              key={level.title}
            >
              <span
                className={
                  'financial-levels-section__icon ' +
                  `financial-levels-section__icon--${level.tone}`
                }
              >
                <LevelIcon name={level.icon} />
              </span>
              <h3>{level.title}</h3>
              <p>{level.description}</p>
            </article>
          ))}
        </div>

        <p className="financial-levels-section__note">{content.note}</p>
      </div>
    </section>
  )
}
