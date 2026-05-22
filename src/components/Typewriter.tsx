"use client";

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  loop = true,
  typingSpeed = 70,
  deletingSpeed = 40,
  delay = 1500
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingDelay(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        if (!loop && loopNum === words.length - 1) return;
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleType, typingDelay);
      }
    };

    timer = setTimeout(handleType, typingDelay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, words, typingSpeed, deletingSpeed, delay, loop]);

  return (
    <span>
      {text}
      <span className="cursor-blink">|</span>
    </span>
  );
};
