import './PricingSection.scss'

export function PricingSection({ content, onRegister }) {
  return (
    <section className="pricing-section" aria-labelledby="pricing-title">
      <div className="pricing-section__inner">
        <h2 id="pricing-title">{content.title}</h2>

        <div className="pricing-section__card">
          <div className="pricing-section__prices">
            {content.prices.map((price, index) => (
              <span key={price}>
                {price}
                {index < content.prices.length - 1 ? <em>|</em> : null}
              </span>
            ))}
          </div>

          <ul className="pricing-section__includes">
            {content.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button
            type="button"
            className="pricing-section__button"
            onClick={onRegister}
          >
            {content.action}
          </button>
        </div>

        <div className="pricing-section__payment">
          <h3>{content.paymentTitle}</h3>
          <p>{content.paymentDescription}</p>

          <div className="pricing-section__payment-grid">
            {content.paymentMethods.map((method) => (
              <article key={method.title}>
                <h4>{method.title}</h4>
                <p>{method.description}</p>
              </article>
            ))}
          </div>

          <p className="pricing-section__reference">{content.reference}</p>
        </div>
      </div>
    </section>
  )
}
