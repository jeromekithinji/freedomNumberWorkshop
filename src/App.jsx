import { AudienceSection } from './components/AudienceSection/AudienceSection'
import { CtaSection } from './components/CtaSection/CtaSection'
import { DiscoverySection } from './components/DiscoverySection/DiscoverySection'
import { FacilitatorSection } from './components/FacilitatorSection/FacilitatorSection'
import { FaqSection } from './components/FaqSection/FaqSection'
import { FeatureSection } from './components/FeatureSection/FeatureSection'
import { FinalCtaSection } from './components/FinalCtaSection/FinalCtaSection'
import { FooterSection } from './components/FooterSection/FooterSection'
import {
  FinancialLevelsSection,
} from './components/FinancialLevelsSection/FinancialLevelsSection'
import { HeroSection } from './components/HeroSection/HeroSection'
import {
  ParticipantResourcesSection,
} from './components/ParticipantResourcesSection/ParticipantResourcesSection'
import { PricingSection } from './components/PricingSection/PricingSection'
import { RegistrationSection } from './components/RegistrationSection/RegistrationSection'
import {
  WorkshopTimelineSection,
} from './components/WorkshopTimelineSection/WorkshopTimelineSection'
import {
  audienceContent,
  ctaContent,
  discoveryContent,
  facilitatorContent,
  faqContent,
  featureContent,
  finalCtaContent,
  financialLevelsContent,
  footerContent,
  heroContent,
  participantResourcesContent,
  pricingContent,
  registrationFields,
  workshopTimelineContent,
} from './data/project-data'
import './App.css'

function App() {
  function handleOpenRegistration() {
    document
      .getElementById('registration-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <main>
        <HeroSection
          content={heroContent}
          onRegister={handleOpenRegistration}
        />
        <FeatureSection content={featureContent} />
        <CtaSection content={ctaContent} />
        <DiscoverySection content={discoveryContent} />
        <FinancialLevelsSection content={financialLevelsContent} />
        <WorkshopTimelineSection content={workshopTimelineContent} />
        <AudienceSection content={audienceContent} />
        <ParticipantResourcesSection content={participantResourcesContent} />
        <FacilitatorSection content={facilitatorContent} />
        <PricingSection
          content={pricingContent}
          onRegister={handleOpenRegistration}
        />
        <RegistrationSection fieldOptions={registrationFields} />
        <FaqSection content={faqContent} />
        <FinalCtaSection
          content={finalCtaContent}
          onRegister={handleOpenRegistration}
        />
      </main>

      <FooterSection content={footerContent} />

    </div>
  )
}

export default App
