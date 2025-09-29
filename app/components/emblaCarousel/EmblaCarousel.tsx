"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};
import "./emblaCarousel.css";
import { Button } from "../ui/Button";
import Link from "next/link";

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla ">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((slides, index) => (
            <div className="embla__slide " key={index}>
              {slides}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <Link className="w-full relative flex justify-center" href="/allcars">
            <Button kind="secondarySpecial">عرض الكل</Button>
          </Link>

          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmblaCarousel;
