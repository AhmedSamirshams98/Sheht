import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselSliderDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselSliderArrowButtons";

import "./emblaCarouselSlider.css";
import useEmblaCarousel from "embla-carousel-react";
type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarouselSlider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, onDotButtonClick } =
    useDotButton(emblaApi);

  const maxDots = 5;

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="newslider w-full">
      <div className="newslideview" ref={emblaRef}>
        <div className="slidecontainer aspect-square">
          {slides.map(
            (
              slide,
              index // FIXED: Changed (index) to (slide, index)
            ) => (
              <div className="newslides aspect-square" key={index}>
                {" "}
                {/* Use numeric index as key */}
                {slide} {/* Render the slide content */}
              </div>
            )
          )}
        </div>
      </div>

      <div className="controls mt-[1vh] w-full  flex flex-row justify-between">
        <div className="s">
          <PrevButton
            className="w-[4vw] md:w-[3vw] lg:w-[2vw]"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            className="w-[4vw] md:w-[3vw] lg:w-[2vw]"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className="points">
          {[...Array(maxDots)].map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"point".concat(
                selectedIndex % maxDots === index ? " point--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselSlider;
