import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const API_URL = "http://127.0.0.1:8000/api/blessings/";

const Wishes = () => {
  const [blessings, setBlessings] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlessings(data))
      .catch((err) => console.log(err));
  }, []);

  const addBlessing = async () => {
    if (!name || !message) return alert("Fill all fields");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Failed");

      setBlessings([data, ...blessings]);
      setName("");
      setMessage("");
    } catch (err) {
      alert("Error sending blessing");
    }
  };

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=EB+Garamond:wght@400;500&family=Cinzel:wght@400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
      {/* HEADER */}
      <Header />

      <div style={styles.container}>
        <h1 style={styles.title}>Leave Your Wishes 💌</h1>

        {/* FORM */}
        <div style={styles.form}>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={addBlessing} style={styles.button}>
            Send Wish
          </button>
        </div>

        {/* LIST */}
        <div style={styles.list}>
          {blessings.map((b) => (
            <div key={b.id} style={styles.card}>
              <h3 style={{ color: "#5d1916" }}>{b.name}</h3>
              <p>{b.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "60px 20px",
    background: "#fff",
    minHeight: "100vh",
    textAlign: "center",
  },
  title: {
    fontFamily: "Cinzel, serif",
    color: "#5d1916",
    fontSize: "36px",
  },
  form: {
    maxWidth: "500px",
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    border: "1px solid #c5a059",
    borderRadius: "5px",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #c5a059",
    borderRadius: "5px",
    height: "100px",
  },
  button: {
    padding: "12px",
    background: "#5d1916",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "left",
  },
  card: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },
};

export default Wishes;