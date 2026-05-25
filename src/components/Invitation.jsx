import React, { useEffect, useState } from "react";
import Header from "./Header";
import Petals from "./Petals";
import { supabase } from './supabaseClient'
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

  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  const groomSiblings = [
    { id: "g1", badge: "Chief Guest 😎", title: "Farhan (QC Inspector)" },
    { id: "g2", badge: "Chief Wedding Planner 🫠", title: "Numan (Software Engineer)" },
    { id: "g3", badge: "The Project Manager 🫣", title: "Ayesha (CS Student)" },
    { id: "g4", badge: "The Drama Queen 🤭", title: "Fatima (ICS Student)" },
  ];

  const brideSiblings = [
    { id: "b1", badge: "The Medical Expert 🤓", title: "Fatima (Medical Student)" },
    { id: "b2", badge: "The Bride's Guard 💂", title: "Usman (2nd Year)" },
    { id: "b3", badge: "The Innocent One 😇", title: "Farhan (9th Grade)" },
  ];

  const senderSide =
    new URLSearchParams(window.location.search).get("side") || "both";

  useEffect(() => {
  // Initial fetch
  supabase
    .from('blessings')
    .select('*')
    .order('created_at', { ascending: false })
    .then(({ data }) => { if (data) setBlessings(data) })

  // Real-time subscription — new blessing appears for ALL users instantly
  const channel = supabase
    .channel('blessings-channel')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'blessings'
    }, (payload) => {
      setBlessings(prev => [payload.new, ...prev])
    })
    .subscribe()

  return () => supabase.removeChannel(channel)
}, [])

  useEffect(() => {
    if (!opened && !invitationVisible) return;
    const eventDate =
      senderSide === "bride"
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
  }, [opened, invitationVisible, senderSide]);

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
    alert('Please fill in both your name and a message.')
    return
  }
  const { error } = await supabase
    .from('blessings')
    .insert([{ name: name.trim(), message: message.trim() }])

  if (error) {
    alert('Could not post blessing. Please try again.')
    return
  }
  setName('')
  setMessage('')
  // No need to manually update state — real-time subscription handles it
};
  return (
    <>
      <Petals />
      <Header />

      {/* ── ENVELOPE SECTION ── */}
      {!opened && (
        <div
          id="envelope-section"
          className={`fixed inset-0 z-[2000] bg-white flex items-center justify-center transition-opacity duration-1000 ${
            envelopeOpening ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className={`relative w-screen h-screen flex items-center justify-center ${envelopeOpening ? "opened" : ""}`}>
            <div className="flap top" />
            <div className="flap bottom" />
            <div className="flap left" />
            <div className="flap right" />
            <button
              onClick={openInvitation}
              className="absolute z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-bold border-2 border-white shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 text-lg leading-tight"
              style={{
                background: "radial-gradient(circle, #c5a059, #a67c37)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              I &amp; U
              <span className="text-sm font-normal mt-1">Click Me</span>
            </button>
          </div>
        </div>
      )}

      {/* ── INTRO SCREEN ── */}
      {showIntro && (
        <div
          className={`intro-screen fixed inset-0 z-[2500] bg-black flex items-center justify-center overflow-hidden ${
            hideIntro ? "hide" : ""
          }`}
        >
          <img src="/images/download.jpg" alt="Couple" className="intro-image" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute text-white text-center z-10 px-4">
            <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(50px,10vw,110px)" }}>
              Iqra &amp; Usman
            </h1>
            <p
              className="mt-4 tracking-[4px] text-base uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              A Beautiful New Beginning
            </p>
          </div>
        </div>
      )}

      {/* ── MAIN INVITATION ── */}
      <div
        id="invitation"
        className="relative z-10"
        style={{
          display: opened ? "block" : "none",
          opacity: invitationVisible ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      >
        {/* HERO */}
        <header
          className="mt-[60px] h-screen flex items-center justify-center relative"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070') center/cover no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white text-center px-4">
            <p
              className="tracking-[5px] text-sm uppercase mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              We Invite You To Celebrate Love
            </p>
            <h1
              className="tracking-[2px]"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(60px,15vw,120px)",
                textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              Iqra <span style={{ color: "#d4af37" }}>&amp;</span> Usman
            </h1>
            <p className="mt-4 text-lg tracking-[2px]">
              {senderSide === "groom" && "ENGAGEMENT CEREMONY • JUNE 13, 2026"}
              {senderSide === "bride" && "BARAT / CEREMONY • JUNE 13, 2026"}
              {senderSide === "both" && "ENGAGEMENT CEREMONY • JUNE 13, 2026"}
            </p>
          </div>
        </header>

        {/* OUR STORY */}
        <section className="py-20 px-5 text-center">
          <div className="reveal">
            <h2
              className="mb-5"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
            >
              Our Story
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed text-lg">
              "A beautiful journey begins with a single step and the blessings of those we love. As two families become
              one, we celebrate the start of a lifetime of friendship, discovery, and a love that grows deeper with every
              passing day."
            </p>
            <img
              src="/images/main_couple.jpeg"
              alt="Couple"
              className="w-full max-w-lg max-h-[500px] object-cover rounded-xl mt-8 mx-auto shadow-xl"
            />
          </div>
        </section>

        {/* FAMILIES */}
        <section className="py-20 px-5 text-center">
          <h2
            className="mb-8"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            Meet the Families
          </h2>
          <div
            className={`reveal flex gap-5 max-w-3xl mx-auto flex-col sm:flex-row ${
              senderSide === "bride" ? "sm:flex-row-reverse" : ""
            }`}
          >
            {/* Groom's Family */}
            <div
              className={`flex-1 p-6 rounded-xl transition-transform duration-300 hover:-translate-y-2 shadow-md ${
                senderSide === "groom"
                  ? "border-2 border-[#c5a059] bg-[#fffcfb]"
                  : "border border-[rgba(212,175,55,0.3)] bg-transparent"
              }`}
            >
              <h3
                className="text-lg mb-3"
                style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}
              >
                The Groom's Family
              </h3>
              <p className="text-sm leading-relaxed">
                {senderSide === "groom"
                  ? "With great joy, we invite you to join us as we welcome our beautiful new family member into our hearts."
                  : "Welcoming you all with open hearts and prayers to celebrate this blessed bond."}
              </p>
            </div>
            {/* Bride's Family */}
            <div
              className={`flex-1 p-6 rounded-xl transition-transform duration-300 hover:-translate-y-2 shadow-md ${
                senderSide === "bride"
                  ? "border-2 border-[#c5a059] bg-[#fffcfb]"
                  : "border border-[rgba(212,175,55,0.3)] bg-transparent"
              }`}
            >
              <h3
                className="text-lg mb-3"
                style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}
              >
                The Bride's Family
              </h3>
              <p className="text-sm leading-relaxed">
                {senderSide === "bride"
                  ? "With immense love and happiness, we invite our dear guests to witness the beautiful new beginning of our daughter."
                  : "Celebrating a beautiful journey of love, values, and a lifetime union of two beautiful families."}
              </p>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-20 px-5 text-center bg-[#fffcfb]">
          <h2
            className="font-normal text-xl sm:text-2xl mb-8"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            THE CELEBRATION BEGINS IN
          </h2>
          <div className="flex justify-center gap-3 flex-wrap mt-4">
            {[{ label: "Days", val: days }, { label: "Hrs", val: hours }, { label: "Min", val: minutes }, { label: "Sec", val: seconds }].map(
              ({ label, val }) => (
                <div
                  key={label}
                  className="text-white py-4 px-5 rounded min-w-[75px] text-center"
                  style={{ background: "#5d1916" }}
                >
                  <span
                    className="text-3xl block mb-1"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {val}
                  </span>
                  {label}
                </div>
              )
            )}
          </div>
        </section>

        {/* SCHEDULE CARD */}
        <section className="py-20 px-5 text-center">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            Engagement Planning
          </h2>
          <div className="reveal bg-white mx-auto max-w-sm p-8 rounded-2xl shadow-md border-t-[5px] border-t-[#c5a059]">
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>Engagement Ceremony</h3>
            <p className="my-3">05:00 PM | June 13, 2026</p>
            <p>Venue: Hotel ...</p>
          </div>
        </section>

        {/* FUNNY PROTOCOLS */}
        <section className="py-8 px-5 text-center">
          <h3
            className="font-normal"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "2.5rem" }}
          >
            ⚠️ Mandatory Celebration Protocols
          </h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Please read carefully to avoid dynamic structural layout errors at the venue
          </p>
          <div className="max-w-lg mx-auto text-left bg-white p-6 rounded-xl shadow-md border-t-[6px] border-t-[#c5a059]">
            <ul className="list-none space-y-4 leading-relaxed">
              <li>
                ⏰ <strong>Punctuality Protocol:</strong>{" "}
                <em>"Yes, it's a Pakistani wedding"</em>, but the buffet waits for no one. Arrive late, and you'll be
                left with empty platters and just the gravy. Don't say we didn't warn you!
              </li>
              <li>
                📸 <strong>Camera Policy:</strong> Feel free to capture our best angles. If you capture an awkward
                chewing face during dinner, please delete it immediately for security optimization.
              </li>
              <li>
                ❤️ <strong>Mandatory Entry Requirement:</strong> Bringing your warmest smiles, loudest cheers, and
                abundance of Duas is 100% compulsory.
              </li>
            </ul>
          </div>
        </section>

        {/* URDU TAPPA */}
        <div className="text-center my-6 py-5 px-5 bg-[#fffcfb] rounded-xl mx-4">
          <p
            className="text-xl sm:text-2xl font-bold leading-loose"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif", color: "#5d1916" }}
          >
            "کوتھے تے گلاسی اے،
            <br />
            بھکھے ناں رہ جائیو... جنتا ساڈی پیاسی اے"
          </p>
          <p className="text-sm text-gray-500 italic mt-2">
            (بوفے کھلتے ہی مقابلہ سخت ہوگا، دیر مت کیجیے گا ورنہ بھوکے رہ جائیں گے)
          </p>
        </div>

        {/* EVENING SCHEDULE TIMELINE */}
        <section className="py-20 px-5 text-center">
          <h2
            className="mb-8"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            The Evening's Schedule
          </h2>
          <div className="reveal max-w-md mx-auto text-left bg-white border border-[#c5a059] rounded-xl p-8 shadow-md">
            <div className="border-l-2 border-[#c5a059] pl-6 relative">
              {[
                { time: "06:00 PM — Starting Time", desc: "Receiving our guests and families." },
                { time: "07:00 PM — Exchange of Rings", desc: "The formal engagement ceremony and prayers (Duas)." },
                { time: "07:30 PM — Dinner", desc: "A festive meal to celebrate the new bond." },
              ].map((item, i) => (
                <div key={i} className={`relative ${i < 2 ? "mb-8" : ""}`}>
                  <span
                    className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#5d1916" }}
                  />
                  <h4
                    className="font-normal mb-1"
                    style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}
                  >
                    {item.time}
                  </h4>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARENTS */}
        <section className="py-20 px-5 text-center bg-white">
          <h2
            className="mb-8"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            With the Blessings of
          </h2>
          <div className="reveal flex flex-col sm:flex-row justify-center gap-8 sm:gap-10 mt-5 flex-wrap">
            <div>
              <h3 className="mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>
                Groom's Parents
              </h3>
              <p>Muhammad Latif &amp; Rehana Latif</p>
            </div>
            <div className="hidden sm:block border-l border-[#c5a059] self-center h-12" />
            <div>
              <h3 className="mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>
                Bride's Parents
              </h3>
              <p>Muhammad Mumtaz &amp; Shakeela Mumtaz</p>
            </div>
          </div>
        </section>

        {/* SISTER NOTE */}
        <section className="py-10 px-5 text-center border-2 border-[#c5a059] mx-4 my-5 rounded-2xl">
          <div
            className="mb-4 text-[2.5rem] font-normal"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059" }}
          >
            A Message of Love
          </div>
          {senderSide === "bride" ? (
            <>
              <p className="italic text-lg max-w-md mx-auto leading-relaxed">
                "As Iqra's sister, seeing her step into this beautiful new chapter brings so much joy to my heart. With
                love and excitement, I warmly invite you to be a part of our happiest moments!"
              </p>
              <p
                className="mt-4 font-bold tracking-widest"
                style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}
              >
                — Bride's Sister
              </p>
            </>
          ) : (
            <>
              <p className="italic text-lg max-w-md mx-auto leading-relaxed">
                "As Usman's sister, I've seen the joy this new chapter has brought to our home. I make this invitation
                with love to welcome our new family members. Can't wait to celebrate with you all!"
              </p>
              <p
                className="mt-4 font-bold tracking-widest"
                style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}
              >
                — Ayesha
              </p>
            </>
          )}
        </section>

        {/* VENUE / MAP CARD */}
        <div className="reveal bg-white mx-5 sm:mx-auto max-w-sm p-8 rounded-2xl shadow-md border-t-[5px] border-t-[#c5a059] my-8 text-center">
          <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>
            {senderSide === "bride" ? "Wedding Ceremony" : "Engagement Ceremony"}
          </h3>
          <p className="my-3 font-semibold">05:00 PM | June 13, 2026</p>
          <p>Venue: [House Number/Area Name]</p>
          <p className="italic text-sm mt-1">Lahore, Pakistan</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-center">
            <a
              href="href="https://www.google.com/maps/search/?api=1&query=Hotel+Name+Gulberg+Lahore+Pakistan""
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-2 rounded text-sm text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: "#5d1916" }}
            >
              📍 OPEN IN &nbsp;&nbsp;&nbsp;&nbsp;GOOGLE <br />&nbsp;&nbsp;MAPS
            </a>
            <a
              href={
                senderSide === "bride"
                  ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Wedding&dates=20260613T170000/20260613T210000"
                  : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Engagement&dates=20260613T170000/20260613T210000"
              }
              target="_blank"
              rel="noreferrer"
              className="border border-[#5d1916] text-[#5d1916] hover:bg-[#5d1916] hover:text-white font-cinzel transition duration-300 px-4 py-2 inline-block"
              
            >
              📅 ADD TO GOOGLE CALENDAR
            </a>
          </div>
        </div>

        {/* SIBLING SQUAD */}
        <section className="py-20 px-5 text-center">
          <h2
            className="mb-3"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            The Sibling Squad
          </h2>
          <p className="mb-10 text-base">The real masterminds behind the celebration</p>

          {/* Team Groom */}
          <h3
            className="mb-5 font-normal"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            — Team Groom —
          </h3>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
            {groomSiblings.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#c5a059] rounded-2xl p-5 text-center transition-shadow hover:shadow-xl"
              >
                <span
                  className="inline-block px-4 py-1 rounded-full text-sm text-white mb-3"
                  style={{ background: "#5d1916", fontFamily: "'Cinzel', serif" }}
                >
                  {item.badge}
                </span>
                <h3 className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <hr className="my-10 border-dashed border-gray-200" />

          {/* Team Bride */}
          <h3
            className="mb-5 font-normal"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            — Team Bride —
          </h3>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {brideSiblings.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#c5a059] rounded-2xl p-5 text-center transition-shadow hover:shadow-xl"
              >
                <span
                  className="inline-block px-4 py-1 rounded-full text-sm text-white mb-3"
                  style={{ background: "#5d1916", fontFamily: "'Cinzel', serif" }}
                >
                  {item.badge}
                </span>
                <h3 className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* BLESSING WALL */}
        <section
          className="py-20 px-5 text-center border-t"
          style={{ background: "#fffcfb", borderColor: "#f8ecea" }}
        >
          <h2
            className="mb-6"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            Blessing Wall
          </h2>
          <div
            id="blessings-display"
            className="max-w-lg mx-auto mb-8 max-h-72 overflow-y-auto p-3 bg-white rounded-xl border"
            style={{ borderColor: "#f8ecea" }}
          >
            {blessings.length === 0 ? (
              <p>Be the first to leave a blessing...</p>
            ) : (
              blessings.map((b) => (
                <div
                  key={b.id}
                  className="blessing-entry text-left mb-4 pb-3 border-b"
                  style={{ borderColor: "#f8ecea" }}
                >
                  <strong
                    className="block mb-1"
                    style={{ color: "#5d1916", fontFamily: "'Cinzel', serif" }}
                  >
                    {b.name}
                  </strong>
                  <p>{b.message}</p>
                </div>
              ))
            )}
          </div>
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              style={{ borderColor: "#c5a059", fontFamily: "'EB Garamond', serif" }}
            />
            <textarea
              rows="3"
              placeholder="Write your Duas..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              style={{ borderColor: "#c5a059", fontFamily: "'EB Garamond', serif" }}
            />
            <button
              onClick={addBlessing}
              className="w-full py-3 rounded-lg text-white font-semibold tracking-widest transition-opacity hover:opacity-90 cursor-pointer"
              style={{
                background: "#5d1916",
                fontFamily: "'Cinzel', serif",
                border: "none",
              }}
            >
              POST BLESSING
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Invitation;
