import React from "react";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-3 flex justify-between items-center z-[4000] border-b border-[rgba(197,160,89,0.3)]"
      style={{ background: "rgba(93,25,22,0.85)", backdropFilter: "blur(10px)" }}>
      <div style={{ fontFamily: "'Great Vibes', cursive", color: "#fff", fontSize: "22px" }}>
        Engagement Ceremony
      </div>
    </nav>
  );
};

export default Header;
