import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Petals from "./Petals";
import "./Invitation.css";

const API_URL = "http://localhost:8000/api/blessings/";

const Invitation = () => {
  const [opened, setOpened] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(false);
  
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [blessings, setBlessings] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [openBio, setOpenBio] = useState("");
  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);
  const groomSiblings = [
    { id: "g1", badge: "The International Chef", title: "Farhan (EE - Big Brother)" },
    { id: "g2", badge: "Chief Wedding Planner", title: "Numan (Software Engineer)" },
    { id: "g3", badge: "The Project Manager", title: "Ayesha (CS Student)" },
    { id: "g4", badge: "The Official Taunter", title: "Fatima (ICS Student)" },
  ];

  const brideSiblings = [
    { id: "b1", badge: "The Medical Expert", title: "Fatima (Medical Student)" },
    { id: "b2", badge: "The Bride's Guard", title: "Usman (2nd Year)" },
    { id: "b3", badge: "The Youngest Squad", title: "Farhan (9th Grade)" },
  ];
  // Detect if the link was sent by the groom's side or bride's side
const senderSide =
  new URLSearchParams(window.location.search).get("side") || "both";
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blessings");
        return res.json();
      })
      .then((data) => setBlessings(data))
      .catch((err) => console.error("Error loading blessings:", err.message));
  }, []);
useEffect(() => {
  if (!opened && !invitationVisible) return;

  // 1. Determine the exact target time string based on the URL parameter
  // Groom side or default gets 05:00 PM (17:00), Bride side gets 05:30 PM (17:30)
const eventDate = senderSide === "bride"
  ? new Date(2026, 5, 13, 17, 30, 0).getTime()
  : new Date(2026, 5, 13, 17, 0, 0).getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
      setDays("0"); setHours("0"); setMinutes("0"); setSeconds("0");
      clearInterval(timer);
      return;
    }
    
    setDays(String(Math.floor(distance / (1000 * 60 * 60 * 24))));
    setHours(String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
    setMinutes(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))));
    setSeconds(String(Math.floor((distance % (1000 * 60)) / 1000)));
  }, 1000);

  return () => clearInterval(timer);
}, [opened, invitationVisible, senderSide]); // Added senderSide to dependency array to catch changes safely
  useEffect(() => {
    if (!invitationVisible) return;
    const revealSections = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealSections);
    revealSections();
    return () => window.removeEventListener("scroll", revealSections);
  }, [invitationVisible]);
  const openInvitation = () => {
    window.dispatchEvent(new Event("playGlobalMusic"));

    setEnvelopeOpening(true);
    setTimeout(() => {
      setOpened(true);
      setShowIntro(true);
      setTimeout(() => {
        setHideIntro(true);
        setTimeout(() => {
          setShowIntro(false);
          setInvitationVisible(true);
        }, 1200);
      }, 3500);
    }, 2200);
  };
  const addBlessing = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Please fill in both your name and a message.");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      let data = await res.json();
      if (!res.ok) throw new Error("Server error");
      setBlessings((prev) => [data, ...prev]);
      setName("");
      setMessage("");
    } catch (err) {
      alert(`Could not post blessing: ${err.message}`);
    }
  };
  
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=EB+Garamond:wght@400;500&family=Cinzel:wght@400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
      <Petals />
      <Header />

      {/* ENVELOPE SECTION */}
      {!opened && (
        <div id="envelope-section" className={envelopeOpening ? "hiding" : ""}>
          <div className={`envelope-container${envelopeOpening ? " opened" : ""}`}>
            <div className="flap top"></div>
            <div className="flap bottom"></div>
            <div className="flap left"></div>
            <div className="flap right"></div>
            <div className="wax-seal" onClick={openInvitation}>I &amp; U <br />Click Me</div>
          </div>
        </div>
      )}

      {/* INTRO SCREEN */}
      {showIntro && (
        <div className={`intro-screen ${hideIntro ? "hide" : ""}`}>
          <img src="/images/download.jpg" alt="Couple" className="intro-image" />
          <div className="intro-overlay"></div>
          <div className="intro-text">
            <h1 style={{color:"white"}}>Iqra & Usman</h1><br /><br />
            <p>A BEAUTIFUL NEW BEGINNING</p>
          </div>
        </div>
      )}

      {/* MAIN INVITATION */}
      <div id="invitation" style={{ display: opened ? "block" : "none", opacity: invitationVisible ? 1 : 0, transition: "opacity 1.5s ease" }}>
        
        {/* HERO */}
<header className="hero">
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <p className="hero-subtext">WE INVITE YOU TO CELEBRATE LOVE</p><br /><br />
    <h1 className="names" style={{ letterSpacing: "2px" }}>
      Iqra <span style={{ color: "#d4af37" }}>&</span> Usman
    </h1><br />
    
    {/* Dynamic Date Text Based on Sender Side */}
    <p className="hero-date">
      {senderSide === "groom" && "ENGAGEMENT CEREMONY • JUNE 13, 2026"}
      {senderSide === "bride" && "BARAT / CEREMONY • JUNE 13, 2026"}
      {senderSide === "both" && "ENGAGEMENT CEREMONY • JUNE 13, 2026"}
    </p>
  </div>
</header>

        {/* OUR STORY */}
        <section className="section">
          <div className="reveal">
            <h2 className="cursive">Our Story</h2>
            <p style={{ maxWidth: 600, margin: "0 auto", lineHeight: 1.8, fontSize: "1.1rem" }}>
              "A beautiful journey begins with a single step and the blessings of those we love. As two families become one, we celebrate the start of a lifetime of friendship, discovery, and a love that grows deeper with every passing day."
            </p>
            <br /><br />
            <img src="/images/main_couple.jpeg" className="story-img" alt="Couple" style={{ width: "100%",maxHeight:500, maxWidth: 600, borderRadius: 10, marginBottom: 1, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "block", margin: "0 auto" }} />
          </div>
        </section>
      {/*-------------------Families-------------*/}
      <section className="section">
        <h2 className="cursive">Meet the Families</h2>
        <div className="family-grid reveal" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "20px", flexDirection: senderSide === "bride" ? "row-reverse" : "row" }}>
          
          {/* Groom's Family Side */}
          <div className="family-member" style={{ flex: 1, padding: "25px", border: senderSide === "groom" ? "2px solid var(--gold)" : "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "10px", background: senderSide === "groom" ? "#fffcfb" : "transparent" }}>
            <h3 className="family-title" style={{ fontFamily: "Cinzel, serif", color: "var(--dark-maroon)" }}>The Groom's Family</h3>
            <p style={{ marginTop: "10px", fontSize: "0.95rem" }}>
              {senderSide === "groom" 
                ? "With great joy, we invite you to join us as we welcome our beautiful new family member into our hearts." 
                : "Welcoming you all with open hearts and prayers to celebrate this blessed bond."}
            </p>
          </div>

          {/* Bride's Family Side */}
          <div className="family-member" style={{ flex: 1, padding: "25px", border: senderSide === "bride" ? "2px solid var(--gold)" : "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "10px", background: senderSide === "bride" ? "#fffcfb" : "transparent" }}>
            <h3 className="family-title" style={{ fontFamily: "Cinzel, serif", color: "var(--dark-maroon)" }}>The Bride's Family</h3>
            <p style={{ marginTop: "10px", fontSize: "0.95rem" }}>
              {senderSide === "bride" 
                ? "With immense love and happiness, we invite our dear guests to witness the beautiful new beginning of our daughter." 
                : "Celebrating a beautiful journey of love, values, and a lifetime union of two beautiful families."}
            </p>
          </div>

        </div>
      </section>

        {/* COUNTDOWN */}
        <section className="section" style={{ background: "#fffcfb" }}>
          <h2 style={{ fontFamily: "Cinzel, serif", fontWeight: 400 }}>THE CELEBRATION BEGINS IN</h2>
          <div className="countdown-grid">
            <div className="countdown-box"><span className="countdown-num">{days}</span>Days</div>
            <div className="countdown-box"><span className="countdown-num">{hours}</span>Hrs</div>
            <div className="countdown-box"><span className="countdown-num">{minutes}</span>Min</div>
            <div className="countdown-box"><span className="countdown-num">{seconds}</span>Sec</div>
          </div>
        </section>

        {/* SCHEDULE & PLANNING */}
        <section className="section">
          <h2 className="cursive">Engagement Planning</h2>
          <div className="event-card reveal">
            <h3 style={{ fontFamily: "Cinzel, serif", color: "var(--gold)" }}>Engagement Ceremony</h3>
            <p style={{ margin: "10px 0" }}>05:00 PM | June 13, 2026</p>
            <p>Venue: Hotel ...</p>
          </div>
        </section>

        
{/* FUNNY WEDDING PROTOCOLS */}
<section className="section" style={{ background: "none", padding: "30px 20px" }}>
  <div style={{ textAlign: "center" }}>
    <h3 style={{ 
  fontFamily: "'Great Vibes', cursive", 
  color: "var(--gold)", 
  fontSize: "2.5rem", // Cursive fonts usually need to be a bit larger to read easily
  fontWeight: "normal"
}}>
  ⚠️ Mandatory Celebration Protocols
</h3><br />
    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px" }}>Please read carefully to avoid dynamic structural layout errors at the venue</p>
  </div>
  
  {/* Card container with a thick golden upper boundary */}
  <div style={{ 
    maxWidth: "550px", 
    margin: "0 auto", 
    textAlign: "left", 
    background: "white", 
    padding: "25px 20px 20px 20px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)", 
    borderTop: "6px solid var(--gold)" // Thick golden upper boundary
  }}>
    <ul style={{ listStyleType: "none", padding: 0, margin: 0, lineHeight: "2" }}>

      <li style={{ marginBottom: "10px" }}>
        ⏰ <strong>Punctuality Protocol:</strong> <em>"Yes, it’s a Pakistani wedding "</em>, but the buffet waits for no one. Arrive late, and you’ll be left with empty platters and just the gravy. Don’t say we didn't warn you!
      </li>
      <li style={{ marginBottom: "10px" }}>
        📸 <strong>Camera Policy:</strong> Feel free to capture our best angles. If you capture an awkward chewing face during dinner, please delete it immediately for security optimization.
      </li>
      <li>
        ❤️ <strong>Mandatory Entry Requirement:</strong> Bringing your warmest smiles, loudest cheers, and abundance of Duas is 100% compulsory.
      </li>
    </ul>
  </div>
</section>


{/*tappey*/}

<div style={{ textAlign: "center", margin: "25px 0", padding: "15px", background: "#fffcfb", borderRadius: "10px" }}>
  <p style={{ fontSize: "1.4rem", color: "var(--dark-maroon)", fontWeight: "bold", fontFamily: "Noto Nastaliq Urdu, serif", lineHeight: "2" }}>
    "کوتھے تے گلاسی اے،
بھکھے ناں رہ جائیو... جنتا ساڈی پیاسی اے"
  </p>
  <p style={{ fontSize: "0.95rem", color: "#666", fontStyle: "italic", marginTop: "5px" }}>
    (بوفے کھلتے ہی مقابلہ سخت ہوگا، دیر مت کیجیے گا ورنہ بھوکے رہ جائیں گے)
  </p>
 
</div>
        {/*venue*/}

        <section className="section" style={{ background: "none" }}> {/* Section background is now transparent */}
        <h2 className="cursive">The Evening's Schedule</h2>
        
        {/* Inner wrapper: centered, white background, golden border, and only takes up required width */}
        <div className="reveal" style={{ 
          maxWidth: "500px", 
          width: "fit-content",       // Dynamic sizing based on text width
          margin: "30px auto", 
          textAlign: "left", 
          padding: "30px 40px 30px 20px", // Generous internal padding for the border layout
          background: "#fff", 
          border: "1px solid var(--gold)", 
          borderRadius: "12px",        // Optional: rounds the corners cleanly
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)" // Optional: matches your event card aesthetic
        }}>
          <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 25, position: "relative" }}>
            {[
              { time: "06:00 PM — Starting Time", desc: "Receiving our guests and families." },
              { time: "07:00 PM — Exchange of Rings", desc: "The formal engagement ceremony and prayers (Duas)." },
              { time: "07:30 PM — Dinner", desc: "A festive meal to celebrate the new bond." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 30 : 0, position: "relative" }}>
                <span style={{ position: "absolute", left: -31, top: 4, background: "var(--dark-maroon)", width: 10, height: 10, borderRadius: "50%", display: "block" }}></span>
                <h4 style={{ fontFamily: "Cinzel, serif", color: "var(--dark-maroon)" }}>{item.time}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* FAMILIES & SIBLINGS */}
        <section className="section" style={{ background: "white" }}>
          <h2 className="cursive">With the Blessings of</h2>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginTop: 20 }}>
            <div>
              <h3 style={{ fontFamily: "Cinzel, serif", color: "var(--gold)" }}>Groom's Parents</h3>
              <p>Muhammad Latif &amp; Rehana Latif</p>
            </div>
            <div style={{ borderLeft: "1px solid var(--gold)", height: 50, alignSelf: "center" }}></div>
            <div>
              <h3 style={{ fontFamily: "Cinzel, serif", color: "var(--gold)" }}>Bride's Parents</h3>
              <p>Muhammad Mumtaz &amp; Shakeela Mumtaz</p>
            </div>
          </div>
        </section>
        {/* SISTER NOTE SECTION */}
        <section 
          className="section" 
          style={{ 
            background: "var(--white)", 
            padding: "40px 20px", 
            border: "2px solid var(--gold)", 
            margin: "20px", 
            borderRadius: "20px", 
            textAlign: "center" 
          }}
        >
          <div style={{ marginBottom: "15px", fontFamily: "Great Vibes, cursive", fontSize: "2.5rem", color: "var(--gold)" }}>
            A Message of Love
          </div>

          {senderSide === "bride" ? (
            // Content when sent by Bride's Side
            <>
              <p style={{ fontStyle: "italic", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>
                "As Iqra's sister, seeing her step into this beautiful new chapter brings so much joy to my heart. 
                With love and excitement, I warmly invite you to be a part of our happiest moments!"
              </p>
              <p style={{ marginTop: "15px", fontFamily: "Cinzel, serif", fontWeight: "bold", letterSpacing: "2px", color: "var(--dark-maroon)" }}>
                — Bride's Sister
              </p>
            </>
          ) : (
            // Default Content / Sent by Groom's Side (Usman's side)
            <>
              <p style={{ fontStyle: "italic", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>
                "As Usman's sister, I've seen the joy this new chapter has brought to our home. 
                I make this invitation with love to welcome our new family members. 
                Can't wait to celebrate with you all!"
              </p>
              <p style={{ marginTop: "15px", fontFamily: "Cinzel, serif", fontWeight: "bold", letterSpacing: "2px", color: "var(--dark-maroon)" }}>
                — Ayesha
              </p>
            </>
          )}
        </section>



        {/* Map & Calendar Card */}
        <div className="event-card reveal">
          <h3 style={{ fontFamily: 'Cinzel, serif', color: "var(--gold)" }}>
            {senderSide === "bride" ? "Wedding Ceremony" : "Engagement Ceremony"}
          </h3>
          <p style={{ margin: "10px 0", fontWeight: 600 }}>
            05:00 PM | June 13, 2026
          </p>
          <p>Venue: [House Number/Area Name]</p>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", marginTop: "5px" }}>
            Lahore, Pakistan
          </p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Your+Address+Here" 
            target="_blank" 
            rel="noreferrer"
            style={{display: "inline-block", marginTop: "15px", padding: "8px 20px", background: "var(--dark-maroon)", color: "white", textDecoration: "none", borderRadius: "5px", fontSize: "0.8rem"}}  >
            📍 OPEN IN GOOGLE MAPS
          </a>

          {/* Dynamically adjusted calendar link to June 13, 2026 */}
          <a 
            href={senderSide === "bride" 
              ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Wedding&dates=20260613T170000/20260613T210000&details=Looking+forward+to+seeing+you!&location=Lahore,+Pakistan"
              : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Engagement&dates=20260613T170000/20260613T210000&details=Looking+forward+to+seeing+you!&location=Lahore,+Pakistan"
            } 
            target="_blank" 
            rel="noreferrer"
            style={{display: "inline-block", marginTop: "10px", padding: "10px 20px", border: "1px solid var(--dark-maroon)", color: "var(--dark-maroon)", textDecoration: "none", fontFamily: 'Cinzel, serif', fontSize: "0.8rem", borderRadius: "5px"}}>
            📅 ADD TO GOOGLE CALENDAR
          </a>
        </div>

{/* SIBLING SQUAD SECTION */}
        <section className="section">
          <h2 className="cursive" style={{ textAlign: 'center' }}>The Sibling Squad</h2>
          <p style={{ marginBottom: 40, textAlign: 'center' }}>The real masterminds behind the celebration</p>

          {/* GROOM'S SIBLINGS (Strict 2x2 Grid Applied Here) */}
          <div className="sibling-section-wrapper">
            <h3 className="section-subtitle" style={{ fontFamily: "Cinzel, serif", textAlign: 'center', marginBottom: 20 }}>
              — Team Groom —
            </h3>
            <div className="sibling-container reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
              {groomSiblings.map((item) => (
                <div className="sibling-card" key={item.id} style={{ padding: "20px", textAlign: "center", margin: 0 }}>
                  <span className="sibling-badge">{item.badge}</span>
                  <h3 style={{ fontFamily: "Cinzel, serif", margin: "10px 0 0 0", fontSize: "1.1rem" }}>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <hr style={{ margin: '50px 0', border: '0', borderTop: '1px dashed #ccc' }} />

          {/* BRIDE'S SIBLINGS */}
          <div className="sibling-section-wrapper">
            <h3 className="section-subtitle" style={{ fontFamily: "Cinzel, serif", textAlign: 'center', marginBottom: 20 }}>
              — Team Bride —
            </h3>
            <div className="sibling-container reveal">
              {brideSiblings.map((item) => (
                <div className="sibling-card" key={item.id} style={{ padding: "20px", textAlign: "center" }}>
                  <span className="sibling-badge">{item.badge}</span>
                  <h3 style={{ fontFamily: "Cinzel, serif", margin: "10px 0 0 0", fontSize: "1.1rem" }}>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLESSING WALL */}
        <section className="section" style={{ background: "#fffcfb", borderTop: "1px solid var(--primary-blush)" }}>
          <h2 className="cursive">Blessing Wall</h2>
          <div id="blessings-display" style={{ maxWidth: 600, margin: "0 auto 30px", maxHeight: 300, overflowY: "auto", padding: 10, border: "1px inset var(--primary-blush)", background: "white", borderRadius: 10 }}>
            {blessings.length === 0 ? <p>Be the first to leave a blessing...</p> : blessings.map((b) => (
              <div key={b.id} className="blessing-entry" style={{ textAlign: "left", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid var(--primary-blush)" }}>
                <strong style={{ color: "var(--dark-maroon)", fontFamily: "Cinzel, serif" }}>{b.name}</strong>
                <p>{b.message}</p>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea rows="3" placeholder="Write your Duas..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={addBlessing} style={{ background: "var(--dark-maroon)", color: "white", padding: 12, border: "none", borderRadius: 5, cursor: "pointer" }}>POST BLESSING</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Invitation;