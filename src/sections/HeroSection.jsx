import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const HeroSection = () => {

  // custom react hook that makes it easy to run GSAP Animations when a component maps
  useGSAP(() => {

    //SplitText is a plugin in GSAP that lets you take any block of text and break into smaller parts like words, lines, or individual chars.
    //Super useful in creating dynamic detailed text and animation.

    const titleSplit = SplitText.create(".hero-title", {
        type: "chars",
    })

    //timeline = slight delay for dramatic effect
    const tl = gsap.timeline({
        delay: 1,
    })

    //default duration = 0.5
    tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        // smooth in and out motion
        ease: "power1.inOut",
    })
        .to(
          ".hero-text-scroll", 
            {
              duration: 1,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "circ.out"
            }, 
            "-=0.5" //overlap animation slightly with the previous one for a smooth flow.
        )
        .from(titleSplit.chars, 
            {
             yPercent: 200,
             stagger: 0.02, //kind of a wavy effect
             ease: "power2.out"
            },
            "-=0.5" //overlap animation slightly with the previous one for a smooth flow.
        );
    
    const heroTL = gsap.timeline({
        // gsap plugin that connects animation to your scroll position instead of animation just playing when the page loads. 
        // So the score trigger lets you start an animation when a starting element enters the viewport
        // or pin an element so it stays fixed during scroll and tie animation progress directly to the scroll position like scrubbing
        // it makes user control the animation just by scrolling

        scrollTrigger:{
            trigger: ".hero-container",
            start: "1% top", //start when top of the hero container at the top of the viewport
            end: "bottom top",
            scrub: true, //ties the animation to the scroll position
        },
    });
    //rotate and scale the hero container
    heroTL.to(".hero-container",{
        rotate: 7,
        scale: 0.9,
        yPercent: 30,
        ease: "power1.inOut"
    })

  });

  return ( 
    <section className="bg-main-bg">
        <div className="hero-container">
            <img 
            src='/images/static-img.png' 
            alt="static-img" 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto scale-100 md:scale-150"
            />
            <div className="hero-content opacity-0">
                <div className="overflow-hidden">
                    <h1 className="hero-title">Freaking Delicious</h1>
                </div>
                
                <div style={{
                    clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                }} 
                className="hero-text-scroll">
                    <div className="hero-subtitle">
                        <h1>Protein + Caffeine</h1>
                    </div>   
                </div>
                
                <h2>Live life to the fullest  with SPYLT: Shatter boredom and embrace your inner kid with every deliciously smooth chug.</h2> 
                
                <div className="hero-button">
                    <p>Chug a SPLYT</p>
                </div>   
            </div>
        </div>
    </section>
  );
};

export default HeroSection