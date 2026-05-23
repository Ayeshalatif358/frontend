import React, { useEffect, useState } from "react";
import "./petals.css";

const Petals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 15,
    }));

    setPetals(generated);
  }, []);

  return (
    <div className="petal-container">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Petals;