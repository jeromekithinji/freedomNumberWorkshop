import './AudienceSection.scss'

export function AudienceSection({ content }) {
  return (
    <section className="audience-section" aria-labelledby="audience-title">
      <div className="audience-section__inner">
        <h2 id="audience-title">{content.title}</h2>

        <ul className="audience-section__list">
          {content.items.map((item) => (
            <li key={item}>
              <span className="audience-section__check" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M8.5 12.2l2.2 2.2 4.8-5" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
