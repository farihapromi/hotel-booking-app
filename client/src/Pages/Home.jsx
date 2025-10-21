import React from 'react';
import Hero from '../Components/Hero';
import FeatureDestination from '../Components/FeatureDestination';
import ExclusiveOffer from '../Components/ExclusiveOffer';
import Testimonial from '../Components/Testimonial';
import NewsLetter from '../Components/NewsLetter';
import RecommodenedHotel from '../Components/RecommodenedHotel';

const Home = () => {
  return (
    <>
      <Hero />
      <RecommodenedHotel />
      <FeatureDestination />
      <ExclusiveOffer />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
