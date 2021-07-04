import { useState, useEffect, useCallback } from "react";

export default function useScrollBox(scrollRef, isClicked) {
  const [clickStartX, setClickStartX] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartX, setScrollStartX] = useState();
  const [direction, setDirection] = useState(0);
  const [momentum] = useState(0);
  const [lastScrollX] = useState(0);
  const [speed, setSpeed] = useState(0);
  const scrollWrapperCurrent = scrollRef.current;

  useEffect(() => {
    if (!isClicked) {
      setIsDragging(true);
    }
    if (isClicked) {
      setIsDragging(false);
    }

    if (scrollRef.current) {
      const handleDragStart = (e) => {
        setClickStartX(e.screenX);
        setScrollStartX(scrollRef.current.scrollLeft);
        setDirection(0);
      };
      const handleDragMove = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (
          clickStartX !== undefined &&
          scrollStartX !== undefined &&
          !isClicked
        ) {
          const touchDelta = clickStartX - e.screenX;
          scrollRef.current.scrollLeft = scrollStartX + touchDelta;

          if (Math.abs(touchDelta) > 1) {
            setIsDragging(true);
            setDirection(touchDelta / Math.abs(touchDelta));
            setSpeed(Math.abs(lastScrollX - e.screenX));
          }
        }
      };
      const handleDragEnd = () => {
        if (isDragging && clickStartX !== undefined) {
          setClickStartX(undefined);
          setScrollStartX(undefined);
          setIsDragging(false);
        }
      };

      if (scrollRef.current.ontouchstart === undefined) {
        scrollRef.current.onmousedown = handleDragStart;
        scrollRef.current.onmousemove = handleDragMove;
        scrollRef.current.onmouseup = handleDragEnd;
        scrollRef.current.onmouseleave = handleDragEnd;
      }
    }
  }, [
    scrollWrapperCurrent,
    isClicked,
    scrollRef,
    clickStartX,
    isDragging,
    scrollStartX,

    lastScrollX,
  ]);

  return {
    clickStartX,
    scrollStartX,
    isDragging,
    direction,
    momentum,
    lastScrollX,
    speed,
  };
}
