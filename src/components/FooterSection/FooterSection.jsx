import './FooterSection.scss'

export function FooterSection({ content }) {
  return (
    <footer className="footer-section">
      <div className="footer-section__inner">
        <h2>{content.title}</h2>
        <p className="footer-section__facilitator">
          {content.facilitator}
        </p>

        <a className="footer-section__email" href={`mailto:${content.email}`}>
          <span aria-hidden="true">✉</span>
          {content.email}
        </a>

        <nav aria-label="Footer links">
          {content.links.map((link) => (
            <a href="/" key={link}>{link}</a>
          ))}
        </nav>

        <div className="footer-section__contact">
          {content.contactLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <hr />

        <p className="footer-section__disclaimer">
          {content.disclaimer}
        </p>
        <p className="footer-section__copyright">{content.copyright}</p>
      </div>
    </footer>
  )
}
