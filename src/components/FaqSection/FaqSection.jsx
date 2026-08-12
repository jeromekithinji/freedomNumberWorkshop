import { useState } from 'react'
import './FaqSection.scss'

export function FaqSection({ content }) {
  const [openIndex, setOpenIndex] = useState(null)

  function handleToggle(index) {
    setOpenIndex((currentIndex) => (
      currentIndex === index ? null : index
    ))
  }

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <h2 id="faq-title">{content.title}</h2>

        <div className="faq-section__list">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <article
                className={
                  isOpen
                    ? 'faq-section__item faq-section__item--open'
                    : 'faq-section__item'
                }
                key={item.question}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => handleToggle(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-section__chevron" aria-hidden="true" />
                </button>

                {isOpen ? (
                  <p id={answerId}>{item.answer}</p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
