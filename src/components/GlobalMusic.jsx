import { useEffect, useRef } from "react";

const GlobalMusic = () => {
  const musicRef = useRef(null);

  useEffect(() => {
    const startMusic = () => {
      if (musicRef.current) {
        musicRef.current.currentTime = 0;

        musicRef.current.play().catch(() => {
          console.log("Playback blocked until interaction");
        });
      }
    };

    window.addEventListener("restartGlobalMusic", startMusic);

    return () => {
      window.removeEventListener(
        "restartGlobalMusic",
        startMusic
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