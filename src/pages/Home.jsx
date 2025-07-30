import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicey from '../components/OurPolicey';



const Home = () => {
    return (
        <div>
            <Hero/>
            <LatestCollection/>
            <BestSeller/>
            <OurPolicey/>
            
        </div>
    );
}

export default Home;
