import React from 'react';
import bannerRunner from '../assets/bannerrunner.jpg'

const Banner = () => {
   return (
      <div className="w-full">
         <a href='https://wa.link/8g3t92' target='_blank'>
            <img
               src={bannerRunner}
               alt="Banner promocional"
               className="w-full h-auto object-cover"
            />
         </a>
      </div>
   );
};

export default Banner