import React from 'react'; // Fixed the syntax error in import
import magnigyingGlass from '../assets/magnifying-glass-solid.svg';
import barcode from '../assets/barcode-solid.svg';
import apple from '../assets/apple-whole-solid.svg';
import leaf from '../assets/leaf-solid.svg';
import phone from '../assets/phone2.png';

const Features = () => {
  return (
    <section
            className="relative mt-10 flex min-h-[100vh] w-full max-w-[100vw] flex-col place-items-center lg:p-6 font-['Outfit',sans-serif] scroll-smooth"
        >

            <h2 className="text-4xl max-md:text-3xl">Our Key Features</h2>
            
            <div
                className="reveal-up mt-[5%] flex h-full w-full place-content-center gap-8 p-4 max-lg:max-w-full max-lg:flex-col"
            >
                <div
                    className="flex flex-col gap-[200px] h-full max-w-[50%] max-lg:max-w-full px-[10%] max-lg:px-4 max-lg:gap-16 max-lg:w-full lg:top-[20%]"
                >   
                    <div className="flex gap-6">
                        <div className="w-[80px] h-[80px] min-w-[80px] 
                                    min-h-[80px] text-5xl
                                    max-lg:min-h-[60px] max-lg:min-w-[60px] max-lg:h-[60px] max-lg:w-[60px]">
                            <img src={barcode} alt="unlock" className="object-contain w-full h-full"/>
                            
                        </div>
                        <h3
                            className="text-4xl max-lg:text-2xl max-lg:font-normal"
                        >
                            Easily search for Products using barcode.
                        </h3>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-[80px] h-[80px] text-5xl min-w-[80px] min-h-[80px] max-lg:min-h-[60px] max-lg:min-w-[60px] max-lg:h-[60px] max-lg:w-[60px]">
                        <img src={magnigyingGlass} alt="unlock" className="object-contain w-full h-full"/>
                            
                        </div>
                        <h3
                            className="text-4xl max-lg:text-2xl max-lg:font-normal"
                        >
                            Fast, Accurate results
                        </h3>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-[80px] text-5xl h-[80px] min-w-[80px] min-h-[80px] max-lg:min-h-[60px] max-lg:min-w-[60px] max-lg:h-[60px] max-lg:w-[60px]">
                            <img src={apple} alt="unlock" className="object-contain w-full h-full"/>
                            
                        </div>
                        <h3
                            className="text-4xl max-lg:text-2xl max-lg:font-normal"
                        >
                            Food Rating to help you plan your meal.
                        </h3>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-[80px] text-5xl h-[80px] min-w-[80px] min-h-[80px] max-lg:min-h-[60px] max-lg:min-w-[60px] max-lg:h-[60px] max-lg:w-[60px]">
                            <img src={leaf} alt="unlock" className="object-contain w-full h-full"/>
                            
                        </div>
                        <h3
                            className="text-4xl max-lg:text-2xl max-lg:font-normal"
                        >
                            Nutrition Labels to help you track your diet.
                        </h3>
                    </div>


                </div>

                <div
                    className="relative flex max-w-[30%] max-lg:max-w-full flex-col place-items-start gap-4  p-2 max-lg:place-items-center max-lg:place-content-center max-lg:w-full"
                >
                    <div
                        className="top-20 lg:sticky max-h-[800px] h-full max-w-[850px] max-lg:max-h-fit max-lg:max-w-[320px] overflow-hidden rounded-lg"
                    >
                        <img
                            src={phone}
                            alt="phone"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
                
            </div>
        </section>
  );
};

export default Features;