import { useEffect, useRef } from "react";

const GlobalMusic = () => {
  const musicRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      if (musicRef.current) {
        musicRef.current.currentTime = 0;

        musicRef.current.play().catch(() => {
          console.log("Playback blocked until interaction");
        });
      }
    };

    // Listen for BOTH events
    window.addEventListener("playGlobalMusic", playMusic);
    window.addEventListener("restartGlobalMusic", playMusic);

    return () => {
      window.removeEventListener(
        "playGlobalMusic",
        playMusic
      );

      window.removeEventListener(
        "restartGlobalMusic",
        playMusic
      );
    };
  }, []);

  return (
    <audio ref={musicRef} loop>
      <source src="/music/song.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default GlobalMusic;