import AboutPartners from '@/components/about/AboutPartners';
import AboutStory from '@/components/about/AboutStory';
import AboutusBreadcrumb from '@/components/about/AboutusBreadcrumb';
import AboutusCTA from '@/components/about/AboutusCTA';
import AboutUsHero from '@/components/about/AboutUsHero';
import AboutVisionmission from '@/components/about/AboutVisionmission';


export default function AboutPage() {
  return (
    <>
      <AboutusBreadcrumb />
      <AboutUsHero/>
      <AboutStory/>
      <AboutVisionmission/>
      <AboutPartners/>
      <AboutusCTA/>
    </>
  );
}
