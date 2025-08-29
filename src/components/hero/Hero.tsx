// import KnightScene from "../scenes/KnightScene";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
// import BackgroundScene from "../scenes/BackgroundScene";
import HeroMarquee from "./HeroMarquee";
// import AstronautScene from "../scenes/AstronautScene";
import HeroScene from "../scenes/HeroScene";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      }
    })
      .to(".hero-marquee", {
        opacity: 0,
        y: 50,
        ease: "power2.inOut"
      });
  }, []);


  return (
    <section className="h-dvh w-screen bg-black relative">
      <div className=" absolute inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>
      <div className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75 pointer-events-none">
        <div id="clip-wrapper" className="relative size-full overflow-hidden">
          <div className="grid h-full grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col justify-center space-y-6 px-8 py-12 md:px-16">
              <div className="pointer-events-none absolute max-w-md left-12 top-1/2 w-1/2 -translate-y-1/2">
                <h1 className="text-4xl font-extrabold leading-tight text-white">
                  Software Engineer
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white">
                  Once a warrior who defied the flow of time, now reborn through code and creation. His armor, entwined with roses of crimson, tells not only of battles fought, but of resilience, growth, and the artistry of forging worlds through pixels and lines of code.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HeroMarquee />
      </div>
    </section>
  );
}


export default Hero;