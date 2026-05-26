import { useEffect, useRef } from "react";

const GlobalMusic = () => {
  const musicRef = useRef(null);

  useEffect(() => {
  // Restore saved time
  const savedTime = localStorage.getItem("music-time");

  if (musicRef.current && savedTime) {
    musicRef.current.currentTime = Number(savedTime);
  }

  // Normal play
  const startMusic = () => {
    musicRef.current?.play().catch(() => {
      console.log("Playback blocked until interaction");
    });
  };

  // Restart from beginning
  const restartMusic = () => {
    if (musicRef.current) {
      musicRef.current.currentTime = 0;

      musicRef.current.play().catch(() => {
        console.log("Playback blocked until interaction");
      });
    }
  };

  // Event listeners
  window.addEventListener("playGlobalMusic", startMusic);
  window.addEventListener("restartGlobalMusic", restartMusic);

  // Save progress every second
  const interval = setInterval(() => {
    if (musicRef.current && !musicRef.current.paused) {
      localStorage.setItem(
        "music-time",
        musicRef.current.currentTime
      );
    }
  }, 1000);

  return () => {
    window.removeEventListener("playGlobalMusic", startMusic);
    window.removeEventListener("restartGlobalMusic", restartMusic);

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