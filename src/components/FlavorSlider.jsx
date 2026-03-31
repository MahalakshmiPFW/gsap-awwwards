import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
//React hook to store a reference to a real DOM element
import { useRef } from "react";
// hook to check screen size using media queries
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  // creates a ref so we can directly access the slider wrapper DOM element
  // sliderRef.current will point to the actual <div> after render
  const sliderRef = useRef();

  // checks whether screen width is 1024px or smaller
  // true = tablet/mobile-ish screen
  // false = desktop/larger screen
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    // total extra horizontal content beyond the visible screen width
    // scrollWidth = total full width of the slider content
    // window.innerWidth = visible browser width
    // this tells us how far we need to move horizontally
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    // only run the horizontal pin + slide effect on desktop
    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          // animation lasts this much extra scroll distance
          // bigger value = longer scrolling section
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          // keeps the section fixed while user scrolls through the animation
          pin: true,
        },
      });

      // animate the whole flavor section horizontally to the left
      tl.to(".flavor-section", {
        // move left by the amount needed to reveal all hidden content
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    // ref is attached so we can measure its full width in GSAP
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt=""
              className="absolute bottom-0"
            />

            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt=""
              className="elements"
            />

            <h1>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;