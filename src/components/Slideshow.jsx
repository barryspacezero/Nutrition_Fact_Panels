import React, { useEffect, useRef } from 'react';
// Import Swiper and its styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Autoplay, Navigation } from 'swiper/modules';

// You'll need to install these packages:
// npm install swiper

const Slideshow = ({ images }) => {
  return (
    <Swiper
      effect="creative"
      grabCursor={true}
      loop={true}
      centeredSlides={true}
      slidesPerView="auto"
      creativeEffect={{
        prev: {
          shadow: true,
          origin: "left center",
          translate: ["-5%", 0, -200],
          rotate: [0, 100, 0],
        },
        next: {
          origin: "right center",
          translate: ["5%", 0, -200],
          rotate: [0, -100, 0],
        },
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
      }}
      autoplay={{
        delay: 3000,
      }}
      modules={[EffectCreative, Autoplay, Navigation]}
      className="slideshow-container"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} className="slide tw-rounded-md !tw-h-[450px]">
          <img 
            src={img} 
            alt={`slide-${index}`}
            className="tw-object-cover tw-w-full tw-h-full" 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slideshow;