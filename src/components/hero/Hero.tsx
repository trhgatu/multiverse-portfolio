import KnightScene from "../scenes/KnightScene";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import BackgroundScene from "../scenes/BackgroundScene";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.set(sectionRef.current, {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 20%"
    });

    gsap.from(sectionRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
      }

    });
  }, { scope: sectionRef });

  return (
    <section className="h-dvh hero-section w-screen overflow-hidden bg-white relative">
      <p className="text-8xl text-white mix-blend-difference font-extrabold hero-heading absolute bottom-5 right-5 z-40">
        Ab<b>o</b>ut Me
      </p>
      <div ref={sectionRef} className="h-dvh overflow-hidden">
        <BackgroundScene />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-1 pointer-events-none mix-blend-screen"
          style={{ filter: 'hue-rotate(20deg) saturate(2)' }}
        >
          <source src="/assets/blackhole.webm" type="video/webm" />
        </video>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="flex flex-col justify-center items-start px-8 md:px-16 py-12 space-y-6 ">
            <div className="absolute z-40 top-1/2 left-12 -translate-y-1/2 w-1/2 pointer-events-none">
              <h1 className="text-[4vw] text-white font-extrabold leading-tight">
                The Forgotten Knight
              </h1>
              <p className="mt-6 text-white text-lg max-w-xl leading-relaxed">
                Once a mighty warrior, abandoned by time but not by nature.
                His armor, entwined with crimson roses, stands as a testament to battles long past.
                No longer does he hear the clash of swords, only the whisper of petals in the wind.
                A silent guardian, a symbol of eternal memory and unfulfilled duty.
              </p>
            </div>
          </div>
          <div className="relative h-full w-full">
            <div className="p-6">
              <KnightScene />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;