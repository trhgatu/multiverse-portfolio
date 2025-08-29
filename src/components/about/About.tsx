import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import BlackHole from "../layouts/BlackHole";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
      },
    });

    tl.to("#clip h1", {
      scale: 10,
      transformOrigin: "center center",
    });
  }, []);

  return (
    <section id="about" className="min-h-screen bg-black">
      <div
        id="clip"
        className="relative h-dvh w-screen flex items-center justify-center overflow-hidden"
      >
        <BlackHole />
        <div className="mask absolute inset-0 flex items-center justify-center mix-blend-screen bg-white z-10">
          <h1 className="text-[8vw] font-extrabold">About me</h1>
        </div>
      </div>
    </section>
  );
};

export default About;
