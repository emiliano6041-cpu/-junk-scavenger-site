import React, { useState } from "react";
import {
  Truck, Phone, Menu, X, Check, ChevronDown, ChevronRight,
  MapPin, Star, Recycle, ShieldCheck, Clock, Sofa, Refrigerator,
  Trees, HardHat, Home, Building2, Boxes, Warehouse, Store,
  Users, Sparkles, ImagePlus, CircleCheck
} from "lucide-react";

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const C = {
  ink: "#000000",
  dark: "#1E1E1E",
  inkSoft: "#5A5A5A",
  darkTextSoft: "#B5B5B5",
  paper: "#FFFFFF",
  paperSoft: "#E8E8E8",
  panel: "#FFFFFF",
  line: "#E8E8E8",
  accent: "#FE4801",
  accentDark: "#D93D00",
  green: "#028001",
  greenSoft: "#E3F2E0",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
.font-head { font-family: 'Archivo', sans-serif; letter-spacing: -0.01em; }
.font-body { font-family: 'Inter', sans-serif; }
`;

const BIRD_ICON_URI = "data:image/png;base64,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";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const RESIDENTIAL_SERVICES = [
  { title: "Furniture removal", desc: "Couches, mattresses, and anything too heavy to move alone.", icon: Sofa },
  { title: "Appliance removal", desc: "Fridges, washers, and units, disconnected and hauled out.", icon: Refrigerator },
  { title: "Garage cleanouts", desc: "Clear years of storage back down to bare floor.", icon: Truck },
  { title: "Basement & attic cleanouts", desc: "Full clear-outs, including the stuff on the top shelf.", icon: Boxes },
  { title: "Yard waste removal", desc: "Branches, old fencing, and yard debris hauled away.", icon: Trees },
  { title: "Estate & moving cleanouts", desc: "Whole-property turnovers handled start to finish.", icon: Home },
];

const COMMERCIAL_SERVICES = [
  { title: "Office cleanouts", desc: "Desks, cubicles, and old equipment cleared on your timeline.", icon: Building2 },
  { title: "Construction debris", desc: "Job-site material hauled on a schedule that matches your crew.", icon: HardHat },
  { title: "Property & apartment turnovers", desc: "Unit and common-area cleanouts for managers and landlords.", icon: Warehouse },
  { title: "Retail & warehouse cleanouts", desc: "Fixtures, pallets, and stock clearance at any volume.", icon: Store },
  { title: "Recurring service", desc: "Standing pickups on a weekly, monthly, or per-job basis.", icon: Clock },
  { title: "Business relocation", desc: "Old furnishings and equipment cleared before the move-in date.", icon: Truck },
];

const WHY_CHOOSE_US = [
  { title: "Eco-friendly disposal & recycling", icon: Recycle },
  { title: "Upfront pricing, no obligation", icon: ShieldCheck },
  { title: "Professional, respectful crews", icon: Users },
  { title: "Local & family owned", icon: Home },
];

const TRUST_POINTS = [
  { title: "Locally owned crews", desc: "The people on the truck are the people we hired, not a subcontractor.", icon: Users },
  { title: "Upfront pricing", desc: "You hear the price before anything gets loaded.", icon: ShieldCheck },
  { title: "Fast scheduling", desc: "Most requests get a next-day or same-day slot.", icon: Clock },
  { title: "Sorted, not dumped", desc: "Usable items get donated or recycled before landfill.", icon: Recycle },
];

const TESTIMONIALS = [
  { name: "Marisol T.", role: "Homeowner", service: "Garage cleanout", quote: "They cleared 12 years of storage in under two hours and swept up after.", rating: 5 },
  { name: "Devon K.", role: "Property Manager", service: "Apartment turnover", quote: "We use them for every unit turn now. Same crew, same price every time.", rating: 5 },
  { name: "Priya R.", role: "General Contractor", service: "Construction debris", quote: "Same-day pickup kept our framing crew from losing a day to cleanup.", rating: 5 },
  { name: "Alan B.", role: "Office Manager", service: "Office cleanout", quote: "Quiet, fast, and out before our staff got in Monday morning.", rating: 4 },
];

const FAQS = [
  { q: "How much does junk removal cost?", a: "Pricing depends on how much space your items take up in the truck, plus material type and access. We confirm the number before anything is loaded — no surprises after the fact." },
  { q: "Do I need to move anything myself?", a: "No. Our crew handles the lifting, carrying, and loading from wherever the items are, including basements and upper floors." },
  { q: "Do you take appliances and electronics?", a: "Yes, most appliances and electronics are accepted. A few refrigerant or hazardous items may need special handling — ask when you request your quote." },
  { q: "Can you handle a large cleanout?", a: "We regularly handle estate, foreclosure, apartment, and office cleanouts of any size, including multiple-truckload jobs." },
  { q: "Do you offer recurring commercial pickups?", a: "Yes. Property managers and contractors can set up a standing schedule instead of booking each pickup individually." },
  { q: "Do you recycle or donate?", a: "Whenever an item is in usable condition, it's set aside for donation or recycling before anything goes to disposal." },
  { q: "How soon can you come out?", a: "Availability depends on your area and the day, but most requests get a next-day or same-day window." },
  { q: "Do you serve my area?", a: "We currently operate only within the DMV — Washington D.C., Maryland, and Northern Virginia. If you're outside that area, we're not able to schedule a pickup yet." },
  { q: "Do I need to be home?", a: "Not always — many customers arrange access and confirm details by phone while they're at work. We'll work out what's easiest for you." },
];

const AREAS = ["Washington, D.C.", "Arlington, VA", "Alexandria, VA", "Fairfax County, VA", "Loudoun County, VA", "Montgomery County, MD", "Prince George's County, MD"];

const LOAD_PRICING = [
  { label: "Minimum", price: "$145", fill: 6 },
  { label: "1/8 load", price: "$205", fill: 13 },
  { label: "1/4 load", price: "$325", fill: 25 },
  { label: "3/8 load", price: "$775", fill: 38 },
  { label: "1/2 load", price: "$1,025", fill: 50 },
  { label: "5/8 load", price: "$1,275", fill: 63 },
  { label: "3/4 load", price: "$1,525", fill: 75 },
  { label: "7/8 load", price: "$1,675", fill: 88 },
  { label: "Full load", price: "$1,800", fill: 100 },
];

const ITEM_PRICES = [
  ["A/Cs", "$30–55"], ["Armoire", "$80"], ["Basketball hoop & stand", "$90"],
  ["Bicycle (adult size)", "$30"], ["Book shelf", "$30"], ["Box spring", "$90"],
  ["BBQ grill", "$70"], ["Cabinet / bottom of hutch", "$70"], ["Cable machine", "$150–225"],
  ["Chair – office", "$25"], ["Chair – recliner", "$60"], ["Chest freezer", "$60"],
  ["Computer monitor", "$25"], ["Copier / printer – commercial", "$100"], ["Couch", "$40 / cushion"],
  ["Dehumidifiers", "$30–55"], ["Desk (large)", "$80"], ["Desk (small)", "$60"],
  ["Dining set (table + 4 chairs)", "$125"], ["Dining set (table + 6 chairs)", "$175"], ["Dishwasher", "$50"],
  ["Dresser / bureau", "$60"], ["Elliptical", "$60–120"], ["Entertainment center", "$150"],
  ["Filing cabinet (small)", "$40"], ["Filing cabinet (tall)", "$80"], ["Freezer (large)", "$115"],
  ["Furnace", "$350"], ["Futon", "$90"], ["Hockey / lacrosse net", "$70"],
  ["Hot tub", "from $425"], ["Hutch (dining room)", "$425"], ["Lawn mower (push)", "$30"],
  ["Lawn mower (ride-on)", "from $200"], ["Mattress / box spring", "$90"], ["Mini freezer", "$30"],
  ["Mini fridge", "$40"], ["Mirror", "$15"], ["Ottoman", "$30"],
  ["Pallet", "$25"], ["Piano", "from $300"], ["Printer (home)", "$20"],
  ["Propane tank", "$25"], ["Refrigerator (full size)", "$100"], ["Stationary bike", "$40–60"],
  ["Stove", "$65"], ["Swingset", "from $250"], ["Table (coffee)", "$40"],
  ["Table (night stand)", "$20"], ["Table (dining room)", "$70"], ["Treadmill", "$100"],
  ["Trash bag (avg.)", "$15"], ["Washer / dryer", "$65"], ["Water heater", "$90"],
  ["Workbench (basement)", "$150"],
];

/* ---------------------------------------------------------
   SMALL BUILDING BLOCKS
--------------------------------------------------------- */
function Ramp({ flip }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 44,
        background: C.ink,
        clipPath: flip
          ? "polygon(0 0, 100% 100%, 100% 0)"
          : "polygon(0 100%, 100% 0, 0 0)",
      }}
    />
  );
}

// Approximate DMV coverage by 3-digit ZIP prefix. This is a rule-of-thumb
// check, not a live database — good enough to catch obviously out-of-area
// requests, but boundary ZIPs should still be confirmed manually.
const DMV_ZIP_PREFIXES = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "220", "221", "222", "223"];

function ZipChecker({ onInArea }) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState(null); // null | "in" | "out" | "invalid"

  const checkZip = () => {
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setResult("invalid");
      return;
    }
    setResult(DMV_ZIP_PREFIXES.includes(trimmed.slice(0, 3)) ? "in" : "out");
  };

  return (
    <div className="rounded-2xl p-6" style={{ background: C.dark }}>
      <p className="font-head font-bold text-white mb-3">Check your ZIP code</p>
      <div className="flex gap-2">
        <input
          value={zip}
          onChange={(e) => { setZip(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && checkZip()}
          placeholder="e.g. 22201"
          maxLength={5}
          className="flex-1 rounded-lg p-3 font-body"
          style={{ border: `1px solid ${C.inkSoft}`, background: "#fff", color: C.ink }}
        />
        <PrimaryButton onClick={checkZip}>Check</PrimaryButton>
      </div>

      {result === "in" && (
        <div className="mt-4 flex items-start gap-2 rounded-lg p-3" style={{ background: C.greenSoft }}>
          <CircleCheck size={18} color={C.green} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm font-semibold" style={{ color: C.green }}>You're in our service area.</p>
            <button onClick={onInArea} className="font-body text-sm font-semibold underline mt-1" style={{ color: C.green }}>
              Get a free quote →
            </button>
          </div>
        </div>
      )}
      {result === "out" && (
        <p className="mt-4 font-body text-sm" style={{ color: C.darkTextSoft }}>
          That ZIP looks outside our current DMV service area. Give us a call at (571) 427-8704 to double-check.
        </p>
      )}
      {result === "invalid" && (
        <p className="mt-4 font-body text-sm" style={{ color: C.darkTextSoft }}>
          Enter a valid 5-digit ZIP code.
        </p>
      )}
    </div>
  );
}

function Pill({ children, active, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      style={{
        borderColor: active ? C.accent : C.line,
        background: active ? C.accent : C.panel,
        color: active ? "#fff" : C.ink,
      }}
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, full, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-6 py-3 font-semibold font-body transition-colors ${full ? "w-full" : ""}`}
      style={{
        background: disabled ? C.line : C.accent,
        color: disabled ? C.inkSoft : "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = C.accentDark; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = C.accent; }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border px-6 py-3 font-semibold font-body transition-colors"
      style={{ borderColor: C.ink, color: C.ink, background: "transparent" }}
    >
      {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, sub, dark }) {
  return (
    <div className="max-w-2xl mb-10">
      {eyebrow ? (
        <p className="font-body text-sm font-semibold mb-2" style={{ color: C.accent }}>{eyebrow}</p>
      ) : null}
      <h2 className="font-head text-3xl md:text-4xl font-extrabold" style={{ color: dark ? "#fff" : C.ink }}>
        {title}
      </h2>
      {sub ? (
        <p className="font-body mt-3 text-base md:text-lg" style={{ color: dark ? C.darkTextSoft : C.inkSoft }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------
   QUOTE FORM (simple)
--------------------------------------------------------- */
// Paste your deployed Google Apps Script Web App URL here (ends in /exec).
const QUOTE_SUBMIT_URL = "https://script.google.com/macros/s/AKfycbwiGUmQLgDpgCvGNVrFxhrsiRlnxy3ef_exMVtKiWq89VB1z3bZeMdWoX8BKXN1kV0h/exec";

function QuoteWizard() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", notes: "" });

  const canSubmit = () => contact.name.trim() && contact.phone.trim();

  const submitQuote = async () => {
    if (!canSubmit()) return;
    setSubmitting(true);
    const payload = {
      propertyType: propertyType === "commercial" ? "Commercial" : "Residential",
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      notes: contact.notes,
    };
    try {
      await fetch(QUOTE_SUBMIT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script doesn't return CORS headers; this still delivers the POST.
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Quote submission failed:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl p-8 md:p-10 text-center" style={{ background: C.panel, boxShadow: "0 20px 50px rgba(27,36,48,0.18)" }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: C.greenSoft }}>
          <CircleCheck size={30} color={C.green} />
        </div>
        <h3 className="font-head text-2xl font-bold" style={{ color: C.ink }}>Thanks, {contact.name.split(" ")[0] || "there"}!</h3>
        <p className="font-body mt-2 max-w-md mx-auto" style={{ color: C.inkSoft }}>
          We've got your info and will call or text you at {contact.phone} shortly to talk pricing and scheduling.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: C.panel, boxShadow: "0 20px 50px rgba(27,36,48,0.18)" }}>
      <h3 className="font-head text-xl font-bold mb-1" style={{ color: C.ink }}>Get a free quote</h3>
      <p className="font-body text-sm mb-5" style={{ color: C.inkSoft }}>Leave your info and we'll reach out to sort out the details.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { id: "residential", label: "Residential", icon: Home },
          { id: "commercial", label: "Commercial", icon: Building2 },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setPropertyType(opt.id)}
            className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 font-body font-semibold text-sm"
            style={{
              borderColor: propertyType === opt.id ? C.accent : C.line,
              background: propertyType === opt.id ? C.paper : C.panel,
              color: C.ink,
            }}
          >
            <opt.icon size={22} color={propertyType === opt.id ? C.accent : C.inkSoft} />
            {opt.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <input
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          placeholder="Full name"
          className="w-full rounded-lg border p-3 font-body"
          style={{ borderColor: C.line }}
        />
        <input
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="Phone number"
          className="w-full rounded-lg border p-3 font-body"
          style={{ borderColor: C.line }}
        />
        <input
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="Email (optional)"
          className="w-full rounded-lg border p-3 font-body"
          style={{ borderColor: C.line }}
        />
        <textarea
          value={contact.notes}
          onChange={(e) => setContact({ ...contact, notes: e.target.value })}
          placeholder="What do you need removed? (optional)"
          rows={3}
          className="w-full rounded-lg border p-3 font-body"
          style={{ borderColor: C.line }}
        />
      </div>

      <div className="mt-6">
        <PrimaryButton full disabled={!canSubmit() || submitting} onClick={submitQuote}>
          {submitting ? "Submitting…" : "Get my free quote"}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */
export default function JunkScavengerSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceTab, setServiceTab] = useState("residential");
  const [faqOpen, setFaqOpen] = useState(0);
  const [showAllItems, setShowAllItems] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-body" style={{ background: C.paper, color: C.ink }}>
      <style>{FONTS}</style>

      {/* NAV */}
      <header className="sticky top-0 z-40" style={{ background: C.paper, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-5 py-4">
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 font-head text-xl font-extrabold italic shrink-0 whitespace-nowrap"
          >
            <img src={BIRD_ICON_URI} alt="" className="h-9 w-9 object-contain shrink-0" />
            <span style={{ color: C.accent }}>JUNK</span>
            <span style={{ color: C.green }}>SCAVENGER</span>
          </button>
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-body text-sm font-medium whitespace-nowrap">
            {["Residential", "Commercial", "Services", "How it works", "Pricing", "Reviews", "FAQ"].map((label) => (
              <button key={label} onClick={() => scrollTo(label.toLowerCase().replace(/ /g, "-"))} style={{ color: C.inkSoft }}>
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4 shrink-0 whitespace-nowrap">
            <a href="tel:+15714278704" className="flex items-center gap-2 font-body text-sm font-semibold" style={{ color: C.ink }}>
              <Phone size={16} /> (571) 427-8704
            </a>
            <PrimaryButton onClick={() => scrollTo("quote")}>Get a free quote</PrimaryButton>
          </div>
          <button className="lg:hidden shrink-0" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden px-5 pb-5 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.line}` }}>
            {["Residential", "Commercial", "Services", "How it works", "Pricing", "Reviews", "FAQ"].map((label) => (
              <button key={label} className="text-left font-body py-1" onClick={() => scrollTo(label.toLowerCase().replace(/ /g, "-"))}>
                {label}
              </button>
            ))}
            <PrimaryButton full onClick={() => scrollTo("quote")}>Get a free quote</PrimaryButton>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-5 pt-14 pb-14 md:pt-20 grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 relative z-10">
            <p className="font-head italic font-extrabold text-sm tracking-wide" style={{ color: C.green }}>
              Removal done right.
            </p>
            <h1 className="font-head italic font-black text-5xl md:text-6xl leading-[0.95] mt-3" style={{ color: C.ink }}>
              We scavenge<br />
              <span style={{ color: C.accent }}>the junk</span><br />
              you don't want.
            </h1>
            <p className="font-body mt-6 text-lg max-w-md" style={{ color: C.inkSoft }}>
              Homes, offices, and job sites across the DMV — if it needs to go, our crew shows up, loads it, and leaves the space clean.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => scrollTo("quote")}>Get a free quote</PrimaryButton>
              <GhostButton onClick={() => scrollTo("commercial")}>Request commercial estimate</GhostButton>
            </div>
            <a href="tel:+15714278704" className="mt-6 flex items-center gap-2 font-body text-sm font-semibold w-max" style={{ color: C.ink }}>
              <Phone size={16} /> Or call (571) 427-8704
            </a>
          </div>

          {/* Why choose us list */}
          <div className="md:col-span-2 relative hidden md:block rounded-2xl p-8" style={{ background: C.dark }}>
            <p className="font-head text-xl font-extrabold text-white mb-5">Why choose Junk Scavenger?</p>
            <div className="space-y-4">
              {WHY_CHOOSE_US.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: C.ink }}>
                    <item.icon size={18} color={C.accent} />
                  </div>
                  <p className="font-body font-semibold text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div style={{ borderTop: `1px solid ${C.line}` }}>
          <div className="max-w-6xl mx-auto px-5 py-6 grid grid-cols-2 gap-4 text-center md:text-left">
            <div>
              <p className="font-head text-2xl md:text-3xl font-extrabold" style={{ color: C.ink }}>4.9★</p>
              <p className="font-body text-xs md:text-sm" style={{ color: C.inkSoft }}>Average customer rating</p>
            </div>
            <div>
              <p className="font-head text-2xl md:text-3xl font-extrabold" style={{ color: C.ink }}>Same-day</p>
              <p className="font-body text-xs md:text-sm" style={{ color: C.inkSoft }}>Slots often available</p>
            </div>
          </div>
        </div>
      </section>


      {/* QUOTE WIDGET (overlaps hero) */}
      <section id="quote" className="max-w-3xl mx-auto px-5 pt-14">
        <QuoteWizard />
      </section>

      {/* RESIDENTIAL VS COMMERCIAL SPLIT */}
      <section className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-6">
        <div id="residential" className="rounded-2xl p-8" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
          <Home size={26} color={C.accent} />
          <h3 className="font-head text-2xl font-bold mt-4">We remove the junk. You get your space back.</h3>
          <p className="font-body mt-3" style={{ color: C.inkSoft }}>
            Furniture, appliances, garage and basement cleanouts, estate and moving cleanouts — booked in minutes, done in a visit.
          </p>
          <button onClick={() => scrollTo("services")} className="mt-5 font-body font-semibold text-sm" style={{ color: C.accent }}>
            See residential services
          </button>
        </div>
        <div id="commercial" className="rounded-2xl p-8 text-white" style={{ background: C.dark }}>
          <Building2 size={26} color={C.accent} />
          <h3 className="font-head text-2xl font-bold mt-4">Volume, scheduling, and crews you can build a business on.</h3>
          <p className="font-body mt-3" style={{ color: C.darkTextSoft }}>
            Property managers, contractors, and retailers rely on us for one-off jobs and standing recurring pickups.
          </p>
          <button onClick={() => scrollTo("commercial-form")} className="mt-5 font-body font-semibold text-sm" style={{ color: C.accent }}>
            Request a commercial estimate
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading title="Services" sub="Grouped by who they're built for — switch tabs to browse." />
        <div className="flex gap-2 mb-8">
          <Pill active={serviceTab === "residential"} onClick={() => setServiceTab("residential")}>Residential</Pill>
          <Pill active={serviceTab === "commercial"} onClick={() => setServiceTab("commercial")}>Commercial</Pill>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {(serviceTab === "residential" ? RESIDENTIAL_SERVICES : COMMERCIAL_SERVICES).map((s) => (
            <div key={s.title} className="rounded-xl p-6" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <s.icon size={22} color={C.accent} />
              <h4 className="font-head font-bold mt-3">{s.title}</h4>
              <p className="font-body text-sm mt-1" style={{ color: C.inkSoft }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16" style={{ background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-5">
          <SectionHeading title="How it works" sub="You point, we do the heavy lifting." />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: 1, t: "Tell us what needs to go", d: "Submit a quote request or give us a call." },
              { n: 2, t: "Get your estimate", d: "Share a few details or photos for accurate pricing." },
              { n: 3, t: "We show up", d: "A crew arrives in the window we confirmed." },
              { n: 4, t: "We load and clean up", d: "Lifting, hauling, and a clean floor when we leave." },
            ].map((step) => (
              <div key={step.n}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full font-head font-bold text-white" style={{ background: C.ink }}>
                  {step.n}
                </div>
                <h4 className="font-head font-bold mt-3">{step.t}</h4>
                <p className="font-body text-sm mt-1" style={{ color: C.inkSoft }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading title="Why people call us back" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_POINTS.map((t) => (
            <div key={t.title}>
              <t.icon size={24} color={C.accent} />
              <h4 className="font-head font-bold mt-3">{t.title}</h4>
              <p className="font-body text-sm mt-1" style={{ color: C.inkSoft }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16" style={{ background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-5">
          <SectionHeading title="Simple, upfront pricing" sub="Pricing is based on how much room your items take up in the truck, plus labor and access. You'll always know the price before we start loading." />

          <div className="grid md:grid-cols-3 gap-8">
            {/* load pricing table */}
            <div className="md:col-span-2">
              <p className="font-head font-bold text-sm uppercase tracking-wide mb-3" style={{ color: C.inkSoft }}>Truck load pricing</p>
              <div className="space-y-2">
                {LOAD_PRICING.map((l) => (
                  <div key={l.label} className="flex items-center gap-4">
                    <span className="font-body text-sm w-24 shrink-0" style={{ color: C.ink }}>{l.label}</span>
                    <div className="h-2 rounded-full flex-1" style={{ background: C.paperSoft }}>
                      <div className="h-2 rounded-full" style={{ width: `${l.fill}%`, background: C.accent }} />
                    </div>
                    <span className="font-head font-bold text-sm w-20 text-right" style={{ color: C.ink }}>{l.price}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs mt-3" style={{ color: C.inkSoft }}>Based on a 16-foot truck, 6 feet high.</p>
            </div>

            {/* labor + access callouts */}
            <div className="space-y-4">
              <div className="rounded-xl p-5" style={{ background: C.paperSoft }}>
                <p className="font-head font-bold text-sm mb-1" style={{ color: C.ink }}>Labor</p>
                <p className="font-body text-sm" style={{ color: C.inkSoft }}>$150 per hour, per crew member, at the job site.</p>
              </div>
              <div className="rounded-xl p-5" style={{ background: C.paperSoft }}>
                <p className="font-head font-bold text-sm mb-1" style={{ color: C.ink }}>Access note</p>
                <p className="font-body text-sm" style={{ color: C.inkSoft }}>Stairs, long carries, tight spaces, or heavy items may increase the price. We'll always give you a free on-site estimate before starting.</p>
              </div>
            </div>
          </div>

          {/* item price list toggle */}
          <div className="mt-10">
            <button
              onClick={() => setShowAllItems((s) => !s)}
              className="flex items-center gap-2 font-body font-semibold text-sm"
              style={{ color: C.accent }}
            >
              {showAllItems ? "Hide" : "See"} common item pricing
              <ChevronDown size={16} style={{ transform: showAllItems ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {showAllItems && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 mt-5">
                {ITEM_PRICES.map(([name, price]) => (
                  <div key={name} className="flex justify-between py-1.5 font-body text-sm" style={{ borderBottom: `1px dotted ${C.line}` }}>
                    <span style={{ color: C.ink }}>{name}</span>
                    <span className="font-semibold" style={{ color: C.inkSoft }}>{price}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="font-body text-xs mt-4" style={{ color: C.inkSoft }}>
              These are estimates only — actual pricing depends on the condition, size, weight, and accessibility of the job. Items marked "from" reflect a minimum for larger or more complex pieces.
            </p>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE DISPOSAL */}
      <section className="py-16" style={{ background: C.greenSoft }}>
        <div className="max-w-6xl mx-auto px-5">
          <SectionHeading eyebrow="" title="Where it goes after we load it" sub="Whenever practical, items are sorted before disposal — not just hauled to a landfill." />
          <div className="flex flex-wrap items-center gap-4 font-head font-bold text-lg" style={{ color: C.green }}>
            {["Reuse", "Donate", "Recycle", "Dispose"].map((step, i, arr) => (
              <React.Fragment key={step}>
                <span className="rounded-full px-5 py-2" style={{ background: "#fff" }}>{step}</span>
                {i < arr.length - 1 && <ChevronRight size={20} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="max-w-6xl mx-auto px-5 py-16">
        <SectionHeading title="From the job site" />
        <div className="grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl p-6" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < t.rating ? C.accent : "none"} color={i < t.rating ? C.accent : C.line} />
                  ))}
                </div>
              </div>
              <p className="font-body mt-3 text-sm" style={{ color: C.ink }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: `1px dashed ${C.line}` }}>
                <span className="font-body text-sm font-semibold">{t.name}</span>
                <span className="font-body text-xs" style={{ color: C.inkSoft }}>{t.role} · {t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE AREA */}
      <section id="service-area" className="py-16" style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading dark title="Junk removal near you" sub="We serve the DMV only — Washington D.C., Maryland, and Northern Virginia. Not sure if we cover your address? Check below." />
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <span key={a} className="rounded-full px-4 py-2 font-body text-sm" style={{ background: C.dark, color: "#fff" }}>
                  <MapPin size={12} className="inline mr-1" /> {a}
                </span>
              ))}
            </div>
          </div>
          <ZipChecker onInArea={() => scrollTo("quote")} />
        </div>
      </section>

      {/* COMMERCIAL FORM TEASER */}
      <section id="commercial-form" className="max-w-4xl mx-auto px-5 py-16 text-center">
        <SectionHeading title="Need a commercial estimate instead?" sub="Company details, property info, and volume — so our commercial team can quote it right the first time." />
        <PrimaryButton onClick={() => scrollTo("quote")}>Request commercial estimate</PrimaryButton>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-5 py-16">
        <SectionHeading title="Common questions" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}`, background: C.panel }}>
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-body font-semibold"
              >
                {f.q}
                <ChevronDown size={18} style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {faqOpen === i && (
                <p className="px-5 pb-4 font-body text-sm" style={{ color: C.inkSoft }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center" style={{ background: C.accent }}>
        <h2 className="font-head text-3xl md:text-4xl font-extrabold text-white">Ready to get rid of the junk?</h2>
        <div className="mt-6">
          <button onClick={() => scrollTo("quote")} className="rounded-lg px-6 py-3 font-body font-semibold" style={{ background: C.ink, color: "#fff" }}>
            Get your free quote
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-14 pb-28 lg:pb-14" style={{ background: C.ink, color: C.darkTextSoft }}>
        <div className="max-w-6xl mx-auto px-5 grid sm:grid-cols-2 md:grid-cols-4 gap-8 font-body text-sm">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 font-head text-lg font-extrabold italic mb-1"
            >
              <img src={BIRD_ICON_URI} alt="" className="h-6 w-6 object-contain" />
              <span style={{ color: C.accent }}>JUNK</span>
              <span style={{ color: C.green }}>SCAVENGER</span>
            </button>
            <p className="text-xs mb-3" style={{ color: C.darkTextSoft }}>Removal done right. Serving the DMV.</p>
            <p>(571) 427-8704</p>
            <p>a.medrano@junkscavenger.com</p>
            <p>Mon–Sat, 5am–7pm</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Services</p>
            <button onClick={() => scrollTo("residential")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Residential</button>
            <button onClick={() => scrollTo("commercial")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Commercial</button>
            <button onClick={() => scrollTo("services")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Cleanouts</button>
            <button onClick={() => scrollTo("services")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Construction debris</button>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Resources</p>
            <button onClick={() => scrollTo("faq")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>FAQ</button>
            <button onClick={() => scrollTo("how-it-works")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>How it works</button>
            <button onClick={() => scrollTo("service-area")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Service areas</button>
            <button onClick={() => scrollTo("pricing")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Pricing</button>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Company</p>
            <button onClick={() => scrollTo("reviews")} className="block text-left bg-transparent border-0 p-0 font-body" style={{ color: C.darkTextSoft }}>Reviews</button>
          </div>
        </div>
        <p className="max-w-6xl mx-auto px-5 mt-10 font-body text-xs" style={{ color: C.inkSoft }}>
          © 2026 Junk Scavenger. All rights reserved.
        </p>
      </footer>

      {/* MOBILE STICKY ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3" style={{ background: C.panel, borderTop: `1px solid ${C.line}` }}>
        <a href="tel:+15714278704" className="flex flex-col items-center justify-center py-3 font-body text-xs font-semibold" style={{ color: C.ink }}>
          <Phone size={18} /> Call
        </a>
        <button onClick={() => scrollTo("quote")} className="flex flex-col items-center justify-center py-3 font-body text-xs font-semibold" style={{ color: "#fff", background: C.accent }}>
          <Sparkles size={18} /> Get quote
        </button>
        <button onClick={() => scrollTo("quote")} className="flex flex-col items-center justify-center py-3 font-body text-xs font-semibold" style={{ color: C.ink }}>
          <ImagePlus size={18} /> Book
        </button>
      </div>
    </div>
  );
}
