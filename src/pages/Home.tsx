import React from 'react';
import Hero from '../components/Hero';
import ProgramFeatures from '../components/ProgramFeatures';
import ClientTestimonials from '../components/ClientTestimonials';
import TestimonialGallery from '../components/TestimonialGallery';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <ProgramFeatures />
      <ClientTestimonials />
      <TestimonialGallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}