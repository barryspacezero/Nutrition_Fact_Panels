import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KurkureN from '../assets/KurkureN.png';
import NutellaN from '../assets/NutellaN.png';
import Kurkure from '../assets/Kurkure.png';
import Nutella from '../assets/Nutella.png';

import Phone from '../assets/Phone.png';


const Hero = () => {
  const images = [
    
    Kurkure,KurkureN,
    Nutella,NutellaN,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".reveal-up", {
      opacity: 0,
      y: "100%",
    });

    gsap.fromTo(".slide-in", {
      y: "100%"
    }, {
      y: "0%",
      duration: 1,
    });

    const sections = gsap.utils.toArray("section");
    sections.forEach((sec) => {
      const revealUptimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: sec,
          start: "10% 80%",
          end: "20% 90%",
        }
      });

      revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] font-['Outfit',sans-serif] scroll-smooth"
      id="hero-section"
    >
      <div className="w-full h-full p-[5%] place-content-center min-h-[100vh] gap-6 max-xl:place-items-center flex max-xl:flex-col">
        <div className="flex h-full min-h-[100vh] w-full max-w-[50%] flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4">
          <div className="flex flex-col place-content-center items-center">
            <div className="reveal-up text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
              <span className=""> Nutrition Fact Panels:</span>
              <br />
              <span className=""> Scan. Know. Eat Smart. </span>
            </div>
          </div>

          <div className="flex flex-col w-full place-items-center place-content-center">
            <div className="reveal-up mt-3 max-w-[450px] p-2 text-center text-gray-700 max-lg:max-w-full">
              Discover detailed nutrition insights and food quality ratings at your fingertips—ensuring informed and healthier choices.
            </div>

            <div className="reveal-up mt-10 flex place-items-center gap-4">
              <Link to="/search">
                <a className="p-[10px_15px] w-max rounded-md text-white bg-black flex justify-center items-center cursor-pointer shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03] bg-[#7e22ce85]" href="">
                  Search Products
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="reveal-up max-w-[750px] max-h-[100vh] w-full flex place-content-center overflow-hidden">
          <div className="relative max-w-[450px] slide-in flex place-content-center">
            <div className="overflow-hidden">
              <img src={Phone} alt="phone" className="h-full" />
            </div>
            <div className="absolute bottom-10 max-h-[350px] overflow-hidden">
              <div className="p-5 max-h-[350px] relative max-w-[350px] max-lg:max-w-[300px] max-lg:max-h-[260px] max-lg:!mt-10">
                <Slideshow images={images} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;