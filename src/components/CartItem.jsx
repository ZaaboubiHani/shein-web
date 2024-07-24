import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';
import { LanguageContext } from '../contexts/LanguageContext';
const CartItem = ({ item }) => {
  const { removeFromCart} = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  return <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
    <div className={`w-full min-h-[100px] flex items-center gap-x-4 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row' }`}>
      {/* image */}
      <Link to={`/product/${item.id}`}>
        <img className='max-w-[80px] ' src={item.imageUrl} alt="" />
      </Link>
      <div className={`w-full flex flex-col ${language === 'ar' ? 'items-end' : 'items-start' }`}>
        {/* title and remove icon */}
        <div className={`flex justify-between mb-2 w-full ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          {/*title */}
          <Link
            className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            to={`/product/${item.id}`}>
            {language === 'ar' ? item.category.name : language === 'fr' ? item.category.name : item.category.name}
          </Link>
          {/*remove icon */}
          <div onClick={() => removeFromCart(item.id)} className='text-xl cursor-pointer'>
            <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
          </div>
        </div>
        <div className={`flex gap-x-2 h-[36px] text-sm ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
         
          {/*  item price */}
          <div className='flex-1 flex justify-around items-center'>
            {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
            {parseFloat(item.buyPrice).toFixed(2)}</div>
          
        </div>
        <div className='flex mt-2'>
          <div
            style={{
              cursor: 'pointer',
              height: '25px',
              width: '25px',
              marginRight: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:'4px',
              border: '1px solid black'
            }} >
            {item.size}
          </div>
         
        </div>
      </div>
    </div>
  </div>;
};

export default CartItem;
