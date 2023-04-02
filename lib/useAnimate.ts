import { useState, useRef, useEffect, RefObject } from "react";

export default function useAnimate(ref: RefObject<HTMLElement>) {
  const [animate, setAnimate] = useState(false);
  const observerRef = useRef<any>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setAnimate(true);
    });
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);
    return () => observerRef.current.disconnect();
  }, [ref]);

  return animate;
}
