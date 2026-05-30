import React, { useEffect, useState } from "react";
import Header from "./Header";
import Petals from "./Petals";
import { supabase } from '../supabaseClient'

const translations = {
  en: {
    inviteText: "We Invite You To Celebrate Love",
    heroBoth: "ENGAGEMENT CEREMONY • JUNE 7, 2026",
    heroGroom: "ENGAGEMENT CEREMONY • JUNE 7, 2026",
    heroBride: "ENGAGEMENT CEREMONY • JUNE 7, 2026",
    ourStoryTitle: "Our Story",
    ourStoryText: `"A beautiful journey begins with a single step and the blessings of those we love. As two families become one, we celebrate the start of a lifetime of friendship, discovery, and a love that grows deeper with every passing day."`,
    familiesTitle: "Meet the Families",
    groomFamilyTitle: "The Groom's Family",
    groomFamilyTextGroom: "With great joy, we invite you to join us as we welcome our beautiful new family member into our hearts.",
    groomFamilyTextOther: "Welcoming you all with open hearts and prayers to celebrate this blessed bond.",
    brideFamilyTitle: "The Bride's Family",
    brideFamilyTextBride: "With immense love and happiness, we invite our dear guests to witness the beautiful new beginning of our daughter.",
    brideFamilyTextOther: "Celebrating a beautiful journey of love, values, and a lifetime union of two beautiful families.",
    countdownTitle: "THE CELEBRATION BEGINS IN",
    days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec",
    engagementTitle: "Engagement Planning",
    engagementCeremony: "Engagement Ceremony",
    engagementTime: "05:00 PM | June 7, 2026",
    engagementVenue: "Musa Palace",
    protocolTitle: "⚠️ Mandatory Celebration Protocols",
    protocolSubtitle: "Please read carefully to avoid dynamic structural layout errors at the venue",
    protocol1Title: "Punctuality Protocol:",
    protocol1: `"Yes, it's a Pakistani engagement", but the buffet waits for no one. Arrive late, and you'll be left with empty platters and just the gravy. Don't say we didn't warn you!`,
    protocol2Title: "Camera Policy:",
    protocol2: "Feel free to capture our best angles. If you capture an awkward chewing face during dinner, please delete it immediately for security optimization.",
    protocol3Title: "Mandatory Entry Requirement:",
    protocol3: "Bringing your warmest smiles, loudest cheers, and abundance of Duas is 100% compulsory.",
    urduPoem: "نک دے وچ کوکا اے\nجنوں بلایا اوہی آوے، اج منگنی دا موقع اے 🫣😂",
    urduPoem2: "،پپلاں دے پتے ہلدے نے\n!ایتھے بوفے مکن توں بعد... صرف خالی برتن ای ملدے نے",
    urduPoemNote2: "(!وقت کی پابندی لازمی ہے! ہمارے معزز مہمان کھانے کے معاملے میں رحم نہیں کھاتے۔ دیر کی تو برتن چمکتے ہوئے ملیں گے)",
    scheduleTitle: "The Evening's Schedule",
    schedule: [
      { time: "06:00 PM — Starting Time", desc: "Receiving our guests and families." },
      { time: "07:00 PM — Exchange of Rings", desc: "The formal engagement ceremony and prayers (Duas)." },
      { time: "07:30 PM — Dinner", desc: "A festive meal to celebrate the new bond." },
    ],
    parentsTitle: "With the Blessings of",
    groomParentsTitle: "Groom's Parents",
    groomParents: "Muhammad Latif & Rehana Latif",
    brideParentsTitle: "Bride's Parents",
    brideParents: "Muhammad Mumtaz & Shakeela Mumtaz",
    messageLoveTitle: "A Message of Love",
    brideMessage: `"As Iqra's sister, seeing her step into this beautiful new chapter brings so much joy to my heart. With love and excitement, I warmly invite you to be a part of our happiest moments!"`,
    brideSigner: "— Bride's Sister",
    groomMessage: `"As Usman's sister, I've seen the joy this new chapter has brought to our home. I make this invitation with love to welcome our new family members. Can't wait to celebrate with you all!"`,
    groomSigner: "— Ayesha",
    venueGroomTitle: "Engagement Ceremony",
    venueBrideTitle: "Wedding Ceremony",
    venueTime: "05:00 PM | June 7, 2026",
    venueAddress: "Venue: [Arshad Marquee]",
    venueCity: "Lahore, Pakistan",
    mapsBtn: "📍 OPEN IN GOOGLE MAPS",
    calBtn: "📅 ADD TO GOOGLE CALENDAR",
    siblingTitle: "The Sibling Squad",
    siblingSubtitle: "The real masterminds behind the celebration",
    teamGroom: "— Team Groom —",
    teamBride: "— Team Bride —",
    blessingTitle: "Blessing Wall",
    blessingEmpty: "Be the first to leave a blessing...",
    namePlaceholder: "Your Name",
    messagePlaceholder: "Write your Duas...",
    postBtn: "POST BLESSING",
    loginBtn: "🔐 Login with Google to Post Blessings",
    refreshBtn: "🔄 Refresh Blessings",
    toggleBtn: "🌐 اردو میں پڑھیں",
  },
  ur: {
    inviteText: "ہم آپ کو محبت کی خوشی میں شامل ہونے کی دعوت دیتے ہیں",
    heroBoth: "منگنی کی تقریب ۷ جون ۲۰۲۶",
    heroGroom: "منگنی کی تقریب •  ۷ جون ۲۰۲۶",
    heroBride: "بارات / نکاح • ۷ جون ۲۰۲۶",
    ourStoryTitle: "ہماری کہانی",
    ourStoryText: `"ایک خوبصورت سفر ایک قدم سے شروع ہوتا ہے اور اپنوں کی دعاؤں سے۔ جب دو خاندان ایک ہوتے ہیں تو ہم دوستی، محبت اور خوشیوں کے ایک نئے باب کا جشن مناتے ہیں۔"`,
    familiesTitle: "خاندانوں سے ملیں",
    groomFamilyTitle: "دولہا کا خاندان",
    groomFamilyTextGroom: "بڑی خوشی کے ساتھ ہم آپ کو دعوت دیتے ہیں کہ ہمارے ساتھ اس خوبصورت لمحے کا حصہ بنیں۔",
    groomFamilyTextOther: "کھلے دل اور دعاؤں کے ساتھ آپ سب کا خیرمقدم ہے۔",
    brideFamilyTitle: "دلہن کا خاندان",
    brideFamilyTextBride: "بے پناہ محبت اور خوشی کے ساتھ ہم اپنی بیٹی کی نئی شروعات کا جشن منانے کی دعوت دیتے ہیں۔",
    brideFamilyTextOther: "دو خوبصورت خاندانوں کے اس پاکیزہ رشتے کا جشن منائیں۔",
    countdownTitle: "تقریب شروع ہونے میں",
    days: "دن", hours: "گھنٹے", minutes: "منٹ", seconds: "سیکنڈ",
    engagementTitle: "منگنی کا پروگرام",
    engagementCeremony: "منگنی کی تقریب",
    engagementTime: "شام ۵ بجے | ۷ جون ۲۰۲۶",
    engagementVenue:"موسیٰ پیلس",
    protocolTitle: "⚠️ لازمی جشن پروٹوکول",
    protocolSubtitle: "براہ کرم غور سے پڑھیں تاکہ تقریب میں کوئی تکنیکی خرابی نہ ہو",
    protocol1Title: "وقت کی پابندی:",
    protocol1: `"جی ہاں یہ پاکستانی شادی ہے" لیکن بوفے کسی کا انتظار نہیں کرتا۔ دیر سے آئے تو صرف گریوی ملے گی!`,
    protocol2Title: "کیمرہ پالیسی:",
    protocol2: "اچھے زاویوں سے تصویریں لیں۔ اگر کوئی کھانا کھاتے وقت عجیب تصویر آئے تو فوری ڈیلیٹ کریں!",
    protocol3Title: "لازمی شرط:",
    protocol3: "مسکراہٹ، خوشی اور ڈھیر ساری دعائیں لے کر آنا لازمی ہے۔",
    urduPoem: "نک دے وچ کوکا اے\nجنوں بلایا اوہی آوے، اج منگنی دا موقع اے 🫣😂",
    urduPoem2: "،پپلاں دے پتے ہلدے نے\n!ایتھے بوفے مکن توں بعد... صرف خالی برتن ای ملدے نے",
    urduPoemNote2: "(!وقت کی پابندی لازمی ہے! ہمارے معزز مہمان کھانے کے معاملے میں رحم نہیں کھاتے۔ دیر کی تو برتن چمکتے ہوئے ملیں گے)",
    scheduleTitle: "شام کا پروگرام",
    schedule: [
      { time: "شام ۶ بجے — آغاز", desc: "مہمانوں اور خاندان والوں کا استقبال۔" },
      { time: "شام ۷ بجے — انگوٹھی کی تبادلہ", desc: "رسمی منگنی کی تقریب اور دعائیں۔" },
      { time: "شام ساڑھے ۷ بجے — کھانا", desc: "نئے رشتے کی خوشی میں دعوتِ طعام۔" },
    ],
    parentsTitle: "بڑوں کی دعاؤں کے ساتھ",
    groomParentsTitle: "دولہا کے والدین",
    groomParents: "محمد لطیف اور رحانہ لطیف",
    brideParentsTitle: "دلہن کے والدین",
    brideParents: "محمد ممتاز اور شکیلہ ممتاز",
    messageLoveTitle: "محبت بھرا پیغام",
    brideMessage: `"اقرا کی بہن کے طور پر اسے اس خوبصورت نئے سفر میں قدم رکھتے دیکھ کر دل خوشی سے بھر جاتا ہے۔ محبت کے ساتھ آپ سب کو دعوت دیتی ہوں!"`,
    brideSigner: "— دلہن کی بہن",
    groomMessage: `"عثمان کی بہن کے طور پر میں نے اس خوشی کو گھر میں محسوس کیا ہے۔ محبت کے ساتھ آپ سب کو دعوت دیتی ہوں۔ آپ سے مل کر خوشی ہوگی!"`,
    groomSigner: "— عائشہ",
    venueGroomTitle: "منگنی کی تقریب",
    venueBrideTitle: "شادی کی تقریب",
    venueTime: "شام ۵ بجے | ۷ جون ۲۰۲۶",
    venueAddress: "مقام: [گھر نمبر / علاقہ]",
    venueCity: "لاہور، پاکستان",
    mapsBtn: "📍 گوگل میپس پر دیکھیں",
    calBtn: "📅 گوگل کیلنڈر میں شامل کریں",
    siblingTitle: "بہن بھائیوں کی ٹیم",
    siblingSubtitle: "تقریب کے اصل منتظمین",
    teamGroom: "— ٹیم دولہا —",
    teamBride: "— ٹیم دلہن —",
    blessingTitle: "خوشیوں کے پیغامات",
    blessingEmpty: "پہلی دعا لکھنے والے آپ بنیں...",
    namePlaceholder: "آپ کا نام",
    messagePlaceholder: "اپنی دعا لکھیں...",
    postBtn: "دعا پوسٹ کریں",
    loginBtn: "🔐 دعا پوسٹ کرنے کے لیے گوگل سے لاگ ان کریں",
    refreshBtn: "🔄 دعائیں تازہ کریں",
    toggleBtn: "🌐 Read in English",
  }
};

const groomSiblingsEn = [
  { id: "g1", badge: "Chief Guest 😎", title: "Farhan (QC Inspector)" },
  { id: "g2", badge: "Chief Wedding Planner 🫠", title: "Numan (Software Engineer)" },
  { id: "g3", badge: "The Project Manager 🫣", title: "Ayesha (CS Student)" },
  { id: "g4", badge: "The Drama Queen 🤭", title: "Fatima (ICS Student)" },
];
const groomSiblingsUr = [
  { id: "g1", badge: "مہمانِ خصوصی 😎", title: "فرحان (کوالٹی انسپکٹر)" },
  { id: "g2", badge: "شادی کے منتظمِ اعلیٰ 🫠", title: "نعمان (سافٹ ویئر انجینئر)" },
  { id: "g3", badge: "پروجیکٹ مینیجر 🫣", title: "عائشہ (سی ایس طالبہ)" },
  { id: "g4", badge: "ڈراما کوئین 🤭", title: "فاطمہ (آئی سی ایس طالبہ)" },
];
const brideSiblingsEn = [
  { id: "b1", badge: "The Medical Expert 🤓", title: "Fatima (Medical Student)" },
  { id: "b2", badge: "The Bride's Guard 💂", title: "Usman (2nd Year)" },
  { id: "b3", badge: "The Innocent One 😇", title: "Farhan (9th Grade)" },
];
const brideSiblingsUr = [
  { id: "b1", badge: "طبی ماہر 🤓", title: "فاطمہ (میڈیکل طالبہ)" },
  { id: "b2", badge: "دلہن  کا گارڈ💂", title: "عثمان (دوسرا سال)" },
  { id: "b3", badge: "معصوم فرشتہ 😇", title: "فرحان (نویں جماعت)" },
];

const Invitation = () => {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const isUrdu = lang === "ur";

  const [opened, setOpened] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [invitationVisible, setInvitationVisible] = useState(false);

  const [user, setUser] = useState(null);
  const [likedBlessings, setLikedBlessings] = useState([]);

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [blessings, setBlessings] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [showIntro, setShowIntro] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  const groomSiblings = isUrdu ? groomSiblingsUr : groomSiblingsEn;
  const brideSiblings = isUrdu ? brideSiblingsUr : brideSiblingsEn;

  
  const senderSide =
    new URLSearchParams(window.location.search).get("side") || "both";

  // ── Load blessings from Supabase ──
  const loadBlessings = async (showLoader = false) => {
    if (showLoader) setRefreshing(true);
    const { data, error } = await supabase
      .from('blessings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('Supabase fetch error:', error.message); }
    else if (Array.isArray(data)) setBlessings(data);
    if (showLoader) setRefreshing(false);
  };

  // ── Fetch blessings + realtime subscription ──
  useEffect(() => {
    loadBlessings();

    const channel = supabase
      .channel('blessings-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blessings' }, (payload) => {
        setBlessings(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ── Auth state ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user || null;
      setUser(sessionUser);

      // If returning from OAuth redirect, restore state without intro animation
      const savedScroll = sessionStorage.getItem("blessingScrollY");
      if (sessionUser && savedScroll !== null) {
        // Skip envelope + intro: go straight to invitation visible
        setOpened(true);
        setInvitationVisible(true);
        sessionStorage.removeItem("blessingScrollY");
        // Restore scroll after DOM paints
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "instant" });
          }, 100);
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Fetch liked blessings when user logs in ──
  useEffect(() => {
    if (!user) return;
    fetchLikes();
  }, [user]);

  const fetchLikes = async () => {
    const { data } = await supabase
      .from("blessing_likes")
      .select("blessing_id")
      .eq("user_id", user.id);

    if (data) {
      setLikedBlessings(data.map((l) => l.blessing_id));
    }
  };

  // ── Countdown timer ──
  useEffect(() => {
    if (!opened && !invitationVisible) return;
    const eventDate =
      senderSide === "bride"
        ? new Date(2026, 5, 7, 18, 0, 0).getTime()
        : new Date(2026, 5, 7, 17, 0, 0).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      if (distance < 0) {
        setDays("0"); setHours("0"); setMinutes("0"); setSeconds("0");
        clearInterval(timer); return;
      }
      setDays(String(Math.floor(distance / (1000 * 60 * 60 * 24))));
      setHours(String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
      setMinutes(String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))));
      setSeconds(String(Math.floor((distance % (1000 * 60)) / 1000)));
    }, 1000);
    return () => clearInterval(timer);
  }, [opened, invitationVisible, senderSide]);

  // ── Scroll reveal ──
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

  // ── Open envelope with integrated 5-Second Delayed Slow Scroll ──
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
          
          // ✨ NEW: Wait 5 seconds after the invitation is visible, then scroll slowly to the end
          setTimeout(() => {
            slowScrollToBottom();
          }, 3000);

        }, 1200);
      }, 3500);
    }, 2200);
  };

  // ── Google Login ──
  const handleLogin = async () => {
    // Save current scroll so we can restore after OAuth redirect
    sessionStorage.setItem("blessingScrollY", String(window.scrollY));
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname + window.location.search,
      },
    });
  };

  // ── Post blessing ──
  const addBlessing = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    if (!name.trim() || !message.trim()) {
      alert("Fill all fields");
      return;
    }
    setPosting(true);
    const { error } = await supabase
      .from("blessings")
      .insert([{ user_id: user.id, name: name.trim(), message: message.trim() }]);

    if (error) {
      console.error(error);
      alert("Could not post blessing");
    }
    setName("");
    setMessage("");
    setPosting(false);
  };

  // ── Like / Unlike ──
  const likeBlessing = async (blessingId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const alreadyLiked = likedBlessings.includes(blessingId);

    if (alreadyLiked) {
      await supabase
        .from("blessing_likes")
        .delete()
        .eq("blessing_id", blessingId)
        .eq("user_id", user.id);

      await supabase.rpc("decrement_likes", { row_id: blessingId });

      setLikedBlessings((prev) => prev.filter((id) => id !== blessingId));
      setBlessings((prev) =>
        prev.map((b) =>
          b.id === blessingId ? { ...b, likes_count: b.likes_count - 1 } : b
        )
      );
    } else {
      await supabase
        .from("blessing_likes")
        .insert([{ blessing_id: blessingId, user_id: user.id }]);

      await supabase.rpc("increment_likes", { row_id: blessingId });

      setLikedBlessings((prev) => [...prev, blessingId]);
      setBlessings((prev) =>
        prev.map((b) =>
          b.id === blessingId ? { ...b, likes_count: b.likes_count + 1 } : b
        )
      );
    }
  };

  const urduStyle = isUrdu
    ? { direction: "rtl", fontFamily: "Noto Nastaliq Urdu, serif" }
    : {};

    // ── Smooth Scroll past Hero ──
  const scrollToContent = () => {
    const nextSection = document.getElementById("our-story-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
// ── Smooth Continuous Slow Scroll To Page End ──
  const slowScrollToBottom = () => {
    const scrollSpeed = 1; // 💡 Adjust this number to change speed (e.g., 0.5 for slower, 2 for faster)
    let animationFrameId;

    const scroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Stop the animation if we have reached the bottom of the page
      if (window.scrollY >= maxScroll) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      window.scrollBy(0, scrollSpeed);
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the scroll animation
    animationFrameId = requestAnimationFrame(scroll);

    // Optional: Stop autoscrolling instantly if the guest manually touches/scrolls the screen
    const stopScroll = () => cancelAnimationFrame(animationFrameId);
    window.addEventListener("wheel", stopScroll, { once: true });
    window.addEventListener("touchmove", stopScroll, { once: true });
  };
  return (
    <>
      <Petals />
      <Header />

      {/* ── LANGUAGE TOGGLE ── */}
      {invitationVisible && (
        <button
          onClick={() => setLang(lang === "en" ? "ur" : "en")}
          className="fixed z-[5000] bottom-6 right-5 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg transition-transform hover:scale-105"
          style={{ background: "#5d1916", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}
        >
          {t.toggleBtn}
        </button>
      )}

      {/* ── ENVELOPE ── */}
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
              style={{ background: "radial-gradient(circle, #c5a059, #a67c37)", fontFamily: "'Cinzel', serif" }}
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
          className={`intro-screen fixed inset-0 z-[2500] bg-black flex items-center justify-center overflow-hidden ${hideIntro ? "hide" : ""}`}
        >
          <img src="/images/download.jpg" alt="Couple" className="intro-image" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute text-white text-center z-10 px-4">
            <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(50px,10vw,110px)" }}>
              Iqra &amp; Usman
            </h1>
            <p className="mt-4 tracking-[4px] text-base uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
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
          ...urduStyle,
        }}>
        {/* HERO */}
        <header className="mt-[60px] h-[calc(95vh-95px)] sm:h-[calc(100vh-60px)] w-full flex items-center justify-center relative bg-[#1a0a09] overflow-hidden">
          
          {/* Background Image styled exactly like your intro-image */}
          <img 
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070" 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover object-top z-0 select-none pointer-events-none"
          />
          
          {/* Dark Overlay to keep text readable */}
          <div className="absolute inset-0 bg-black/45 z-10" />

          {/* Hero Content */}
          <div className="relative z-20 text-white text-center px-4 pb-16">
            <p className="tracking-[5px] text-xs sm:text-sm uppercase mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.inviteText}
            </p>
            <h1
              className="tracking-[2px]"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(50px,13vw,120px)",
                textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              Iqra <span style={{ color: "#d4af37" }}>&amp;</span> Usman
            </h1>
            <p className="mt-4 text-base sm:text-lg tracking-[2px]">
              {senderSide === "groom" && t.heroGroom}
              {senderSide === "bride" && t.heroBride}
              {senderSide === "both" && t.heroBoth}
            </p>
          </div>

          {/* ── RESPONSIVE SCROLL DOWN BUTTON ── */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-4 sm:bottom-8 left-0 right-0 mx-auto z-20 flex flex-col items-center justify-center text-white/80 hover:text-[#d4af37] transition-all duration-300 focus:outline-none bg-black/30 hover:bg-black/50 backdrop-blur-sm animate-bounce cursor-pointer group rounded-full w-12 h-12 sm:w-auto sm:h-auto sm:py-3 sm:px-5 sm:max-w-[150px]"
            aria-label="Scroll Down"
          >
            <span 
              className="text-[11px] tracking-[2px] uppercase mb-1 hidden sm:block font-medium transition-colors duration-300 group-hover:text-[#d4af37]" 
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {isUrdu ? "نیچے جائیں" : "Scroll Down"}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-y-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
</header>

        {/* OUR STORY */}
        <section id="our-story-section" className="py-20 px-5 text-center">
          <div className="reveal">
            <h2 className="mb-5" style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}>
              {t.ourStoryTitle}
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed text-lg">{t.ourStoryText}</p>
            <img
              src="/images/main_couple.jpeg"
              alt="Couple"
              className="w-full max-w-lg max-h-[500px] object-cover rounded-xl mt-8 mx-auto shadow-xl"
            />
          </div>
        </section>

        {/* FAMILIES */}
        <section className="py-20 px-5 text-center">
          <h2 className="mb-8" style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}>
            {t.familiesTitle}
          </h2>
          <div
            className={`reveal flex gap-5 max-w-3xl mx-auto flex-col sm:flex-row ${
              senderSide === "bride" ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex-1 p-6 rounded-xl transition-transform duration-300 hover:-translate-y-2 shadow-md ${
                senderSide === "groom"
                  ? "border-2 border-[#c5a059] bg-[#fffcfb]"
                  : "border border-[rgba(212,175,55,0.3)] bg-transparent"
              }`}
            >
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}>
                {t.groomFamilyTitle}
              </h3>
              <p className="text-sm leading-relaxed">
                {senderSide === "groom" ? t.groomFamilyTextGroom : t.groomFamilyTextOther}
              </p>
            </div>
            <div
              className={`flex-1 p-6 rounded-xl transition-transform duration-300 hover:-translate-y-2 shadow-md ${
                senderSide === "bride"
                  ? "border-2 border-[#c5a059] bg-[#fffcfb]"
                  : "border border-[rgba(212,175,55,0.3)] bg-transparent"
              }`}
            >
              <h3 className="text-lg mb-3" style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}>
                {t.brideFamilyTitle}
              </h3>
              <p className="text-sm leading-relaxed">
                {senderSide === "bride" ? t.brideFamilyTextBride : t.brideFamilyTextOther}
              </p>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-20 px-5 text-center bg-[#fffcfb]">
          <h2 className="font-normal text-xl sm:text-2xl mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            {t.countdownTitle}
          </h2>
          <div className="flex justify-center gap-3 flex-wrap mt-4">
            {[
              { label: t.days, val: days },
              { label: t.hours, val: hours },
              { label: t.minutes, val: minutes },
              { label: t.seconds, val: seconds },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="text-white py-4 px-5 rounded min-w-[75px] text-center"
                style={{ background: "#5d1916" }}
              >
                <span className="text-3xl block mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                  {val}
                </span>
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* SCHEDULE CARD */}
        <section className="py-20 px-5 text-center">
          <h2
            className="mb-5"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}
          >
            {t.engagementTitle}
          </h2>
          <div className="reveal bg-white mx-auto max-w-sm p-8 rounded-2xl shadow-md border-t-[5px] border-t-[#c5a059]">
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>{t.engagementCeremony}</h3>
            <p className="my-3">
  {senderSide === "bride"
    ? (isUrdu ? "شام ۶ بجے | ۷ جون ۲۰۲۶" : "06:00 PM | June 7, 2026")
    : t.engagementTime}
</p>
            <p>{t.engagementVenue}</p>
            <p className="italic text-sm mt-1">{t.venueCity}</p>
            <div className="flex flex-col gap-3 mt-5 items-center">
              <a
                href="https://www.google.com/maps/place/31%C2%B035'54.2%22N+74%C2%B022'07.2%22E/@31.5983775,74.3660938,597m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d31.5983775!4d74.3686687"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-5 py-2 rounded text-sm text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "#5d1916" }}
              >
                {t.mapsBtn}
              </a>
              <a
                href={
                  senderSide === "bride"
                    ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Wedding&dates=20260607T170000/20260607T210000"
                    : "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Iqra+%26+Usman+Engagement&dates=20260607T170000/20260607T210000"
                }
                target="_blank"
                rel="noreferrer"
                className="border border-[#5d1916] text-[#5d1916] hover:bg-[#5d1916] hover:text-white font-cinzel transition duration-300 px-4 py-2 inline-block"
              >
                {t.calBtn}
              </a>
            </div>
          </div>
        </section>

        {/* FUNNY PROTOCOLS */}
        <section className="py-8 px-5 text-center">
          <h3
            className="font-normal"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "2.5rem" }}
          >
            {t.protocolTitle}
          </h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">{t.protocolSubtitle}</p>
          <div className="max-w-lg mx-auto text-left bg-white p-6 rounded-xl shadow-md border-t-[6px] border-t-[#c5a059]">
            <ul className="list-none space-y-4 leading-relaxed">
              <li>⏰ <strong>{t.protocol1Title}</strong> {t.protocol1}</li>
              <li>📸 <strong>{t.protocol2Title}</strong> {t.protocol2}</li>
              <li>❤️ <strong>{t.protocol3Title}</strong> {t.protocol3}</li>
            </ul>
          </div>
        </section>

        {/* URDU TAPPA */}
        <div className="text-center my-6 py-5 px-5 bg-[#fffcfb] rounded-xl mx-4">
          <p
            className="text-xl sm:text-2xl font-bold leading-loose"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif", color: "#5d1916" }}
          >
            {t.urduPoem.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <p className="text-sm text-gray-500 italic mt-2">{t.urduPoemNote}</p>
        </div>

        {/* EVENING SCHEDULE TIMELINE */}
        <section className="py-20 px-5 text-center">
          <h2 className="mb-8" style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}>
            {t.scheduleTitle}
          </h2>
          <div className="reveal max-w-md mx-auto text-left bg-white border border-[#c5a059] rounded-xl p-8 shadow-md">
            <div className="border-l-2 border-[#c5a059] pl-6 relative">
              {t.schedule.map((item, i) => (
                <div key={i} className={`relative ${i < 2 ? "mb-8" : ""}`}>
                  <span
                    className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#5d1916" }}
                  />
                  <h4 className="font-normal mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}>
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
          <h2 className="mb-8" style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}>
            {t.parentsTitle}
          </h2>
          <div className="reveal flex flex-col sm:flex-row justify-center gap-8 sm:gap-10 mt-5 flex-wrap">
            <div>
              <h3 className="mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>
                {t.groomParentsTitle}
              </h3>
              <p>{t.groomParents}</p>
            </div>
            <div className="hidden sm:block border-l border-[#c5a059] self-center h-12" />
            <div>
              <h3 className="mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#c5a059" }}>
                {t.brideParentsTitle}
              </h3>
              <p>{t.brideParents}</p>
            </div>
          </div>
        </section>

        {/* SISTER NOTE */}
        <section className="py-10 px-5 text-center border-2 border-[#c5a059] mx-4 my-5 rounded-2xl">
          <div
            className="mb-4 text-[2.5rem] font-normal"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059" }}
          >
            {t.messageLoveTitle}
          </div>
          {senderSide === "bride" ? (
            <>
              <p className="italic text-lg max-w-md mx-auto leading-relaxed">{t.brideMessage}</p>
              <p className="mt-4 font-bold tracking-widest" style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}>
                {t.brideSigner}
              </p>
            </>
          ) : (
            <>
              <p className="italic text-lg max-w-md mx-auto leading-relaxed">{t.groomMessage}</p>
              <p className="mt-4 font-bold tracking-widest" style={{ fontFamily: "'Cinzel', serif", color: "#5d1916" }}>
                {t.groomSigner}
              </p>
            </>
          )}
        </section>

        {/* SIBLING SQUAD */}
        <section className="py-20 px-5 text-center">
          <h2 className="mb-3" style={{ fontFamily: "'Great Vibes', cursive", color: "#c5a059", fontSize: "45px" }}>
            {t.siblingTitle}
          </h2>
          <p className="mb-10 text-base">{t.siblingSubtitle}</p>

          <h3 className="mb-5 font-normal" style={{ fontFamily: "'Cinzel', serif" }}>{t.teamGroom}</h3>
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
                <h3 className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
              </div>
            ))}
          </div>

          <hr className="my-10 border-dashed border-gray-200" />

          <h3 className="mb-5 font-normal" style={{ fontFamily: "'Cinzel', serif" }}>{t.teamBride}</h3>
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
                <h3 className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
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
            {t.blessingTitle}
          </h2>

          {/* Refresh button */}
          <div className="flex justify-end max-w-lg mx-auto mb-2">
            <button
              onClick={() => loadBlessings(true)}
              disabled={refreshing}
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-80"
              style={{
                borderColor: "#c5a059",
                color: "#5d1916",
                fontFamily: "'Cinzel', serif",
                background: "white",
                cursor: refreshing ? "not-allowed" : "pointer",
                opacity: refreshing ? 0.6 : 1,
              }}
            >
              <span style={{ display: "inline-block", animation: refreshing ? "spin 0.8s linear infinite" : "none" }}>
                
              </span>
              {refreshing
                ? (isUrdu ? "لوڈ ہو رہا ہے..." : "Loading...")
                : t.refreshBtn}
            </button>
          </div>

          {/* Blessings list */}
          <div
            id="blessings-display"
            className="max-w-lg mx-auto mb-8 max-h-72 overflow-y-auto p-3 bg-white rounded-xl border"
            style={{ borderColor: "#f8ecea" }}
          >
            {!Array.isArray(blessings) || blessings.length === 0 ? (
              <p>{t.blessingEmpty}</p>
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
                  <button
                    onClick={() => likeBlessing(b.id)}
                    className="mt-3 flex items-center gap-2 text-sm transition-transform hover:scale-105"
                    style={{ color: "#c5a059", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <span style={{ fontSize: "20px", transition: "0.2s" }}>
                      {likedBlessings.includes(b.id) ? "❤️" : "🤍"}
                    </span>
                    {b.likes_count || 0}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Login OR input form */}
          <div className="max-w-md mx-auto flex flex-col gap-3">
            {!user ? (
              /* ── Not logged in: show login button only ── */
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-lg text-white font-semibold tracking-widest transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: "#5d1916", fontFamily: "'Cinzel', serif", border: "none" }}
              >
                {t.loginBtn}
              </button>
            ) : (
              /* ── Logged in: show name, email, inputs and post button ── */
              <>
                <p className="text-sm text-gray-500 mb-1">
                  {isUrdu ? "لاگ ان:" : "Logged in as"} {user.email}
                </p>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  style={{ borderColor: "#c5a059", fontFamily: "'EB Garamond', serif" }}
                />
                <textarea
                  rows="3"
                  placeholder={t.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  style={{ borderColor: "#c5a059", fontFamily: "'EB Garamond', serif" }}
                />
                <button
                  onClick={addBlessing}
                  disabled={posting}
                  className="w-full py-3 rounded-lg text-white font-semibold tracking-widest transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: "#5d1916",
                    fontFamily: "'Cinzel', serif",
                    border: "none",
                    opacity: posting ? 0.7 : 1,
                  }}
                >
                  {posting ? (
                    <>
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid white",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      {isUrdu ? "لوڈ ہو رہا ہے..." : "Posting..."}
                    </>
                  ) : (
                    t.postBtn
                  )}
                </button>
              </>
            )}
          </div>
        </section>


        <div className="text-center my-6 py-5 px-5 bg-[#fffcfb] rounded-xl mx-4">
          <p
            className="text-xl sm:text-2xl font-bold leading-loose"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif", color: "#5d1916" }}
          >
            {t.urduPoem2.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <p className="text-sm text-gray-500 italic mt-2">{t.urduPoemNote2}</p>
        </div>
      </div>
    </>
  );
};

export default Invitation;