import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import Logo from '../assets/title.png';
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
const Footer = () => {
  const { language } = useContext(LanguageContext);
  return <footer className='bg-white py-8 w-full bottom-0'>
    <div className="container mx-auto flex flex-col items-center">
      <img className='h-[100px]' src={Logo} alt="" />
      <p className='flex items-center my-2 text-left'>
        <MdEmail className='mr-2' />
        {language === 'ar' ? 'sheinig@shein.com : البريد الإلكتروني' : language === 'fr' ? 'E-mail: sheinig@shein.com' : 'Email: sheinig@shein.com'}
        
      </p>
      <a href='https://www.instagram.com/sheinofficial' className='text-center flex items-center my-2'>
        <FaInstagramSquare className='mr-2' />
        {language === 'ar' ? 'sheinofficial : إنستغرام' : language === 'fr' ? 'Instagram: arela_clothsy' : 'Instagram: arela_clothsy'}
        
      </a>
      <a href='https://www.facebook.com/SHEINOFFICIAL' className='text-center flex items-center my-2'>
        <FaSquareFacebook className='mr-2' />
        {language === 'ar' ? 'SHEIN : فايسبوك' : language === 'fr' ? 'Facebook: arela_clothsy' : 'Facebook: arela_clothsy'}
        
      </a>
      <p className='text-center my-2'>
        {language === 'ar' ? '.جميع الحقوق محفوظة' : language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </p>
    </div>
  </footer>;

};

export default Footer;
