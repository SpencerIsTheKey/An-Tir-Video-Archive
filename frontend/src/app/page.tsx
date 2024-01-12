import Hero from '@/components/landing_page/hero';
import NavBar from '../components/common/NavBar/NavBar';
import AboutSection from '@/components/landing_page/about';
import ContactSection from '@/components/landing_page/contact';

export default function Home() {
  return (
    <>
    <Hero />
    <AboutSection />
    <ContactSection />
    </>
  )
}
