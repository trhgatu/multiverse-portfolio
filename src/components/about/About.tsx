import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import BackgroundScene from "../scenes/BackgroundScene";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=250vh",
        scrub: 2,
        pin: "#clip",
        anticipatePin: 1,
      },
    });

    tl.to("#clip h1", {
      scale: 15,
      transformOrigin: "center center",
      ease: "power3.inOut",
      z: 100,
    })

      .to("#clip h1", {
        opacity: 0,
        duration: 0.2,
        ease: "power3.inOut",
      }, 0.8)

      .to(".mask", {
        opacity: 0,
        ease: "power3.inOut",
      }, 0.85)

      .to("#background-scene", {
        scale: 1.2,
        ease: "power3.inOut",
      }, 0);

  }, []);

  return (
    <section id="about" className="min-h-[350vh] relative">
      <BackgroundScene />
      <div
        id="clip"
        className="relative h-dvh w-screen flex items-center justify-center overflow-hidden"
      >
        <div className="mask absolute inset-0 flex items-center justify-center mix-blend-screen bg-white z-10 pointer-events-none">
          <h1 className="text-[8vw] font-extrabold will-change-transform whitespace-nowrap">
            About me.
          </h1>
        </div>
      </div>

    </section>
  );
};

export default About;
