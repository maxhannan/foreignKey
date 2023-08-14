import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  let observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (observer.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, observer]);

  return isIntersecting;
}
