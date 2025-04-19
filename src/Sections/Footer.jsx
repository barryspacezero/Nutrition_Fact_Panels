import React from "react";
import KurkureN from "../assets/KurkureN.png";
import Logo from "../assets/logo.png";

function Footer() {
    return (<>
    <section className="mt-5 flex min-h-[80vh] w-full flex-col place-content-center place-items-center p-[2%] max-lg:p-3 font-['Outfit',sans-serif] scroll-smooth">
            <h3
                className="reveal-up text-center text-4xl font-medium max-md:text-2xl"
            >
                Our Grading System✨
            </h3>
            <div
                className="reveal-up mt-10 flex flex-wrap place-content-center gap-10 max-lg:flex-col"
            >
                <a
                    href=""
                    className="flex border-[1px] border-black h-[400px] w-[400px] flex-col gap-4 overflow-clip rounded-lg p-4 max-lg:w-[300px]"
                >
                    <div
                        className="h-[250px] w-full overflow-hidden rounded-md"
                    >
                        <img
                            src="https://static.openfoodfacts.org/images/misc/nutriscore-biscuits-e.800x600.jpg"
                            alt="article image"
                            className="h-full w-full object-cover transition-transform duration-[0.3s] hover:scale-[1.04]"
                        />
                    </div>
                    <h3
                        className="mt-2 text-2xl font-semibold max-md:text-xl"
                    >
                        A to E Grades to help you choose your diet.
                    </h3>
                    <p className="text-gray-800">
                    The total score is calculated. In simple cases, the formula is just N-P, however there are some special cases.
                    </p>
                </a>
                <a
                    href=""
                    className="border-[1px] border-black flex h-[400px] w-[400px] flex-col gap-4 overflow-clip rounded-lg p-4 max-lg:w-[300px]"
                >
                    <div
                        className="h-[250px] w-full overflow-hidden rounded-md"
                    >
                        <img
                            src="https://static.openfoodfacts.org/images/misc/nutriscore-a.png"
                            alt="article image"
                            className="h-full w-full object-cover transition-transform duration-[0.3s] hover:scale-[1.04]"
                        />
                    </div>
                    <h3
                        className="mt-2 text-2xl font-semibold max-md:text-xl"
                    >
                        It it based on International Nutri Grade
                    </h3>
                    <p className="text-gray-800">
                    Negative points: energy, saturated fat, sugars, sodium (high levels are considered unhealthy)
                    </p>

                </a>
                <a
                    href=""
                    className="border-[1px] border-black flex h-[400px] w-[400px] flex-col gap-4 overflow-clip rounded-lg p-4 max-lg:w-[300px]"
                >
                    <div
                        className="h-[250px] w-full overflow-hidden rounded-md"
                    >
                        <img
                            src={KurkureN}
                            alt="article image"
                            className="h-full w-full object-cover transition-transform duration-[0.3s] hover:scale-[1.04]"
                        />
                    </div>
                    <h3
                        className="mt-2 text-2xl font-semibold max-md:text-xl"
                    >
                        This can simplify your work by just showing the grade!
                    </h3>
                    <p className="text-gray-800">
                    Positive points: the proportion of fruits,
                     vegetables and nuts, of olive, colza and nut oils, of fibers and proteins.
                    </p>
                </a>
            </div>
        </section>
        <footer
            className="mt-auto flex w-full place-content-around gap-3 p-[5%] px-[10%] text-white font-['Outfit',sans-serif] max-md:flex-col"
        >
            <div
                className="flex h-full w-[250px] flex-col place-items-center gap-6 max-md:w-full"
            >
                <img
                    src={Logo}
                    alt="logo"
                    className="max-w-[120px]"
                />
            </div>

            <div className="flex h-full w-[250px] flex-col gap-4">
                <h2 className="text-3xl max-md:text-xl">Company</h2>
                <div className="flex flex-col gap-3 max-md:text-sm">
                    <a href="" className="text-[#434242] hover:text-[#0b0b0b] transition-colors duration-300">How-it-works</a>
                    <a href="" className="text-[#434242] hover:text-[#0b0b0b] transition-colors duration-300">Search</a>
                    <a href="" className="text-[#434242] hover:text-[#0b0b0b] transition-colors duration-300">Features</a>
                    <a href="" className="text-[#434242] hover:text-[#0b0b0b] transition-colors duration-300">Nutri Grade System</a>
                    <a href="" className="text-[#434242] hover:text-[#0b0b0b] transition-colors duration-300">Contact Us</a>
                </div>
            </div>

        </footer>
        
        <div className="mt-5 text-center text-gray-500 font-['Outfit',sans-serif]">Made by The Students of Shri Ramswaroop Memorial University</div>
        </>
    );
}

export default Footer;