function useVisibleCount() {
  const [n, setN] = useState(() => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    if (w <= 1100) return 3;
    return 4;
  });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w <= 640) setN(1);
      else if (w <= 1024) setN(2);
      else if (w <= 1100) setN(3);
      else setN(4);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return n;
}

