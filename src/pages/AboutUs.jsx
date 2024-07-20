import React, { useContext } from 'react';
import FashionImg from '../img/fast-fashion2.jpeg';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
const AboutUs = () => {
    const { language } = useContext(LanguageContext);
    return <section className='h-[800px] bg-gray-100 flex items-center justify-center'>
        about Shein
    </section>;
};

export default AboutUs;
