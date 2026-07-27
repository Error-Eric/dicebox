import { useEffect, useState } from "react";

export function useWindowRatio(): number {
  const [ratio, setRatio] = useState(
    () => window.innerWidth / window.innerHeight,
  );

  useEffect(() => {
    const onResize = () =>
      setRatio(window.innerWidth / window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return ratio;
}
