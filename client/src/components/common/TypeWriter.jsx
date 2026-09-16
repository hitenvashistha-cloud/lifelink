import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function TypeWriter({
  text,
  speed = 60,
  delay = 0,
  className = '',
  cursor = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const hasStarted = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isVisible || hasStarted.current) return;
    hasStarted.current = true;

    const startTyping = () => {
      let index = 0;
      const type = () => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
          timeoutRef.current = setTimeout(type, speed);
        } else {
          setIsDone(true);
          if (onComplete) onComplete();
        }
      };
      type();
    };

    timeoutRef.current = setTimeout(startTyping, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {cursor && !isDone && (
        <span className="inline-block w-[3px] h-[1em] bg-red-600 ml-1 align-middle animate-pulse"></span>
      )}
    </span>
  );
}

export default TypeWriter;