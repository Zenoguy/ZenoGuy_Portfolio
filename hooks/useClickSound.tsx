import { useEffect, useRef } from 'react';

export function useClickSound(soundSrc: string = '/audio/button-click-3.wav') {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundSrc);
    audioRef.current.volume = 1.0; // Adjust volume as needed
    audioRef.current.preload = 'auto';

    // Add click listener to document
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element or any parent is interactive
      const isButton = target.tagName === 'BUTTON' || target.closest('button');
      const isLink = target.tagName === 'A' || target.closest('a');
      const hasClickHandler = target.onclick !== null || target.closest('[onclick]');
      const isClickable = 
        target.getAttribute('role') === 'button' ||
        target.closest('[role="button"]');
      
      // Play sound if any interactive element is clicked
      if (isButton || isLink || hasClickHandler || isClickable) {
        const sound = audioRef.current?.cloneNode() as HTMLAudioElement;
        if (sound) {
          sound.volume = 1.0;
          sound.play().catch(err => console.error('Click sound error:', err));
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [soundSrc]);
}