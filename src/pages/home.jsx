import room1 from "../assets/resort-1 (1).jpg";
import room2 from "../assets/resort-1 (2).jpg";
import room3 from "../assets/resort-1 (3).jpg";
import room4 from "../assets/resort-1 (4).jpg";
import room5 from "../assets/resort-1 (5).jpg";
import room6 from "../assets/resort-1 (6).jpg";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";

// ── DATA ────────────────────────────────────────────────────────────────────

const rooms = [
  { id: 1, img: room1, name: "Ocean Suite",        price: 320, beds: 2, baths: 2, tag: "Best Seller" },
  { id: 2, img: room2, name: "Garden Villa",        price: 280, beds: 1, baths: 1, tag: "New"         },
  { id: 3, img: room3, name: "Royal Penthouse",     price: 580, beds: 3, baths: 3, tag: "Luxury"      },
  { id: 4, img: room4, name: "Forest Cabin",        price: 210, beds: 1, baths: 1, tag: "Cozy"        },
  { id: 5, img: room5, name: "Poolside Bungalow",   price: 350, beds: 2, baths: 2, tag: "Popular"     },
  { id: 6, img: room6, name: "Mountain Retreat",    price: 260, beds: 2, baths: 1, tag: "Scenic"      },
];

const blogs = [
  {
    id: 1,
    category: "Travel Tips",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    title: "10 Things to Do Before Your Resort Stay",
    excerpt:
      "Maximize every moment of your getaway with our insider checklist — from packing smart to securing the best table at our signature restaurant.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: 2,
    category: "Lifestyle",
    date: "Feb 04, 2025",
    readTime: "4 min read",
    title: "How Wellness Amenities Transform Your Vacation",
    excerpt:
      "Spa therapies, sunrise yoga on the deck, and farm-to-table dining — discover why holistic resorts are redefining the future of travel.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
  },
  {
    id: 3,
    category: "Destinations",
    date: "Mar 18, 2025",
    readTime: "6 min read",
    title: "Hidden Gems: Resorts Off the Beaten Path",
    excerpt:
      "Escape the crowds and discover secluded paradises that deliver world-class comfort without the tourist rush.",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
  },
];

const reviews = [
  {
    id: 1,
    name: "Emily Richardson",
    role: "Solo Traveller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    room: "Ocean Suite",
    date: "March 2025",
    text: "Absolutely breathtaking experience. The Ocean Suite exceeded every expectation — staff remembered my name from day one and the sunrise views were worth every penny.",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Family Vacation",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    room: "Poolside Bungalow",
    date: "February 2025",
    text: "Brought the whole family for a week and couldn't have been happier. The kids loved the pool and we loved the on-demand chef service. Will return every year.",
  },
  {
    id: 3,
    name: "Sakura Tanaka",
    role: "Honeymoon",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    room: "Royal Penthouse",
    date: "January 2025",
    text: "The Royal Penthouse was a dream for our honeymoon. Private rooftop, candle-lit dinners arranged by the concierge — the most comfortable bed I've ever slept in.",
  },
  {
    id: 4,
    name: "Marco Ferretti",
    role: "Business Trip",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    room: "Garden Villa",
    date: "April 2025",
    text: "Stayed in the Garden Villa between conferences. High-speed wifi, a beautiful work desk, and the spa helped me unwind completely. Perfect blend of work and relaxation.",
  },
];

// ── HELPERS ─────────────────────────────────────────────────────────────────

function Stars({ n }) {
  return (
    <span className="flex gap-0.5 text-amber-400 text-sm">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s > n ? "text-gray-300" : ""}>★</span>
      ))}
    </span>
  );
}

// ── HOME ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeReview, setActiveReview] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── 1. WELCOME BANNER ── */}
      <section
        className="relative mx-6 mt-6 overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #1c0a00 0%, #4a2000 55%, #1c0a00 100%)",
          minHeight: 320,
        }}
      >
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 rounded-full pointer-events-none w-80 h-80 bg-amber-600/20 blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 translate-y-1/2 rounded-full pointer-events-none bg-amber-400/10 blur-2xl -translate-x-1/4" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-10 md:flex-row">
          {/* text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold border rounded-full bg-amber-500/20 border-amber-500/30 text-amber-300">
              ⭐ Rated #1 Luxury Resort 2025
            </div>
            <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Welcome to <span className="text-amber-400">ResortLuxe</span>
            </h1>
            <p className="max-w-lg mb-6 text-base leading-relaxed text-gray-300 md:text-lg">
              Discover world-class suites, breathtaking views, and unparalleled service. Every stay
              is crafted to be an unforgettable story.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <button className="px-6 py-3 text-sm font-bold text-white transition-colors shadow-lg bg-amber-500 hover:bg-amber-600 rounded-xl">
                Explore Rooms →
              </button>
              <button className="px-6 py-3 text-sm font-semibold text-white transition-colors border border-white/30 hover:border-amber-400 hover:text-amber-400 rounded-xl">
                View Packages
              </button>
            </div>
          </div>

          {/* stat pills */}
          <div className="flex flex-wrap justify-center gap-3 md:flex-col">
            {[
              { num: "500+", label: "Monthly Guests" },
              { num: "4.9*", label: "Avg Rating" },
              { num: "6",    label: "Room Types" },
              { num: "24/7", label: "Concierge" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[100px]"
              >
                <p className="text-xl font-extrabold text-amber-400">{num}</p>
                <p className="text-gray-400 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. ROOM GALLERY ── */}
      <section className="px-6 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Our Accommodations</p>
            <h2 className="text-2xl font-extrabold text-gray-900">Rooms & Suites</h2>
          </div>
          <button className="px-4 py-2 text-sm font-semibold transition-colors border rounded-lg text-amber-600 hover:text-amber-700 border-amber-200 hover:border-amber-400">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              {/* image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.img}
                  alt={room.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {room.tag}
                </span>
                <span className="absolute px-3 py-1 text-xs font-bold text-gray-900 rounded-full top-3 right-3 bg-white/90 backdrop-blur-sm">
                  ₹ {room.price}<span className="font-normal text-gray-400">/night</span>
                </span>
              </div>

              {/* info */}
              <div className="p-4">
                <h3 className="mb-1 text-base font-bold text-gray-900">{room.name}</h3>
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <span>🛏 {room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
                  <span>🚿 {room.baths} Bath{room.baths > 1 ? "s" : ""}</span>
                </div>
                <button className="w-full bg-gray-900 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. BLOG SECTION ── */}
      <section className="px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Stories & Insights</p>
            <h2 className="text-2xl font-extrabold text-gray-900">From Our Blog</h2>
          </div>
          <button className="px-4 py-2 text-sm font-semibold transition-colors border rounded-lg text-amber-600 hover:text-amber-700 border-amber-200 hover:border-amber-400">
            All Articles →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogs.map((post, i) => (
            <article
              key={post.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`overflow-hidden ${i === 0 ? "h-52" : "h-40"}`}>
                <img
                  src={post.img}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="ml-auto text-xs text-gray-400"> {post.readTime}</span>
                </div>
                <h3 className="mb-2 text-sm font-bold leading-snug text-gray-900">{post.title}</h3>
                <p className="mb-3 text-xs leading-relaxed text-gray-500 line-clamp-3">{post.excerpt}</p>
                <span className="text-xs font-semibold text-amber-600 hover:underline">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 4. REVIEWS ── */}
      <section className="px-6 mt-12 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Guest Testimonials</p>
            <h2 className="text-2xl font-extrabold text-gray-900">What Our Guests Say</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <span className="text-base text-amber-400">★</span>
            <span className="text-sm font-extrabold text-gray-900">4.9</span>
            <span className="text-xs text-gray-400">/ 1,200 reviews</span>
          </div>
        </div>

        {/* featured card */}
        <div className="flex flex-col items-center p-6 mb-5 text-center bg-gradient-to-br from-amber-900 via-stone-900 to-gray-900 rounded-2xl md:p-8">
          <img
            src={reviews[activeReview].avatar}
            alt={reviews[activeReview].name}
            className="object-cover w-16 h-16 mb-3 border-4 rounded-full border-amber-500"
          />
          <Stars n={reviews[activeReview].rating} />
          <p className="max-w-2xl mt-3 mb-4 text-sm italic leading-relaxed text-gray-200 md:text-base">
            "{reviews[activeReview].text}"
          </p>
          <p className="font-bold text-white">{reviews[activeReview].name}</p>
          <p className="text-amber-400 text-xs mt-0.5">
            {reviews[activeReview].role} · {reviews[activeReview].room} · {reviews[activeReview].date}
          </p>
        </div>

        {/* mini cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              onClick={() => setActiveReview(i)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-200 ${
                i === activeReview
                  ? "border-amber-500 bg-amber-50 shadow-md"
                  : "border-gray-100 bg-white hover:border-amber-200 hover:shadow"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={r.avatar} alt={r.name} className="object-cover rounded-full w-9 h-9" />
                <div>
                  <p className="text-xs font-bold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role}</p>
                </div>
              </div>
              <Stars n={r.rating} />
              <p className="mt-2 text-xs italic text-gray-500 line-clamp-3">"{r.text}"</p>
              <p className="mt-2 text-xs font-semibold text-amber-600">{r.room}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

