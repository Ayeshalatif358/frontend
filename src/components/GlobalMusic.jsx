import { useEffect, useRef } from "react";

const GlobalMusic = () => {
  const musicRef = useRef(null);

  useEffect(() => {
    // 1. Restore time from localStorage
    const savedTime = localStorage.getItem("music-time");
    if (musicRef.current && savedTime) {
      musicRef.current.currentTime = Number(savedTime);
    }

    // 2. Listen for a "start-music" event from other components
    const startMusic = () => {
      musicRef.current?.play().catch((err) => console.log("Playback blocked until interaction"));
    };

    window.addEventListener("playGlobalMusic", startMusic);
    
    // Auto-save progress
    const interval = setInterval(() => {
      if (musicRef.current && !musicRef.current.paused) {
        localStorage.setItem("music-time", musicRef.current.currentTime);
      }
    }, 1000);

    return () => {
      window.removeEventListener("playGlobalMusic", startMusic);
      clearInterval(interval);
    };
  }, []);

  return (
    <audio ref={musicRef} loop>
      <source src="/music/song.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default GlobalMusic;