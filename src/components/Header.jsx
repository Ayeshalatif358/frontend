import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 12px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(93, 25, 22, 0.85);
          backdrop-filter: blur(10px);
          z-index: 4000;
          border-bottom: 1px solid rgba(197, 160, 89, 0.3);
        }

        .nav-left {
          font-family: 'Great Vibes', cursive;
          color: #fff;
          font-size: 22px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          text-decoration: none;
          color: #f8ecea;
          font-family: 'Cinzel', serif;
          font-size: 14px;
          letter-spacing: 2px;
          padding: 6px 10px;
          border-radius: 5px;
          transition: 0.3s;
        }

        .nav-links a:hover {
          background: #c5a059;
          color: #5d1916;
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-left">Engagement Ceremony</div>
      </nav>
    </>
  );
};

export default Header;