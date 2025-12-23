import { useEffect, useRef } from 'react';

export function useClickSound(soundSrc: string = '/audio/button-click-3.wav') {
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const setupClickSound = async () => {
      if (typeof window === 'undefined') return;

      // Wait for AudioContext and master gain to be available (with timeout)
      const waitForAudio = async () => {
        let attempts = 0;
        while (attempts < 50) { // 5 seconds total
          const ctx = (window as any).audioContext as AudioContext;
          const gain = (window as any).masterGain as GainNode;
          
          if (ctx && gain) {
            audioContextRef.current = ctx;
            masterGainRef.current = gain;
            return true;
          }
          
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        return false;
      };

      const audioReady = await waitForAudio();
      
      if (!audioReady) {
        console.error('AudioContext not available for click sounds');
        return;
      }

      try {
        // Load and decode audio file
        const response = await fetch(soundSrc);
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current!.decodeAudioData(arrayBuffer);
        
        console.log('Click sound loaded successfully');
      } catch (err) {
        console.error('Failed to load click sound:', err);
      }
    };

    setupClickSound();

    // Play click sound function
    const playClickSound = () => {
      if (!audioBufferRef.current || !audioContextRef.current || !masterGainRef.current) {
        return;
      }

      try {
        // Resume audio context if suspended
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        // Create buffer source for this play
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;

        // Create gain node for volume control
        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.value = 0.8; // Adjust volume as needed

        // Connect: source -> gain -> masterGain -> destination
        source.connect(gainNode);
        gainNode.connect(masterGainRef.current);

        // Play
        source.start(0);
      } catch (err) {
        console.error('Click sound playback error:', err);
      }
    };

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
        playClickSound();
      }
    };

    document.addEventListener('click', handleClick, true); // Use capture phase

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [soundSrc]);
}