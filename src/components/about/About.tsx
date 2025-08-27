import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import BlackHole from "../layouts/BlackHole";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

const About = () => {

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    })
  }, []);

  return (
    <section id="about" className="min-h-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2>
          Welcome to the About Page!
        </h2>
        <div className="mt-5 uppercase text-">
          Disc<b>o</b>ver My Journey
        </div>

        <div className="">
          <p>The Game of Games begin u life, now an epic MMORPG</p>
          <p>Embark on a journey through my world of code, creativity, and endless possibilities.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="relative mask-clip-path mx-auto w-[400px] h-[400px] rounded-[40px]">
          <BlackHole />
        </div>
      </div>
    </section>
  );
}
export default About;