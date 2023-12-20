// useTyperEffect.ts
import { useState, useEffect } from 'react';

interface TyperEffectProps {
  text: string;
  speed: number;
}

interface TyperEffectResult {
  displayText: string;
  isTypingComplete: boolean;
}

const useTyperEffect = ({ text, speed }: TyperEffectProps): TyperEffectResult => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = text.charAt(index);
        index += 1;
        if (index > text.length) {
          clearInterval(intervalId);
          setIsTypingComplete(true);
          return prevText;
        }
        return prevText + nextChar;
      });
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
  }, [text, speed]);
  
  return { displayText, isTypingComplete };
};

export default useTyperEffect;
