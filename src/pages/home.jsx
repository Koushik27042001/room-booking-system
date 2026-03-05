import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { getBlogs, getRooms } from "../services/api";
import room1 from "../assets/resort-1 (1).jpg";
import room2 from "../assets/resort-1 (2).jpg";
import room3 from "../assets/resort-1 (3).jpg";
import room4 from "../assets/resort-1 (4).jpg";
import room5 from "../assets/resort-1 (5).jpg";
import room6 from "../assets/resort-1 (6).jpg";

const roomImageMap = {
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
};

const fallbackRoomImage =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80";

const reviews = [
  {
    id: 1,
    name: "Emily Richardson",
    role: "Solo Traveller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    room: "Ocean Suite",
    date: "March 2025",
    text: "Absolutely breathtaking experience. The Ocean Suite exceeded every expectation and the sunrise views were worth every penny.",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Family Vacation",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    room: "Poolside Bungalow",
    date: "February 2025",
    text: "The kids loved the pool and we loved the on-demand chef service. This was our best family vacation so far.",
  },
  {
    id: 3,
    name: "Sakura Tanaka",
    role: "Honeymoon",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    room: "Royal Penthouse",
    date: "January 2025",
    text: "The Royal Penthouse was perfect for our honeymoon. Private rooftop and concierge support made everything seamless.",
  },
  {
    id: 4,
    name: "Marco Ferretti",
    role: "Business Trip",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    room: "Garden Villa",
    date: "April 2025",
    text: "High-speed wifi, a comfortable work desk, and fast room service. Great mix of productivity and relaxation.",
  },
];

function Stars({ n }) {
  return (
    <span className="flex gap-0.5 text-amber-400 text-sm">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s > n ? "text-gray-300" : ""}>
          *
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const roomsSectionRef = useRef(null);
  const blogsSectionRef = useRef(null);

  const [rooms, setRooms] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    Promise.all([getRooms(), getBlogs()])
      .then(([roomsRes, blogsRes]) => {
        setRooms(roomsRes.data);
        setBlogs(blogsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load home data");
        setLoading(false);
      });
  }, []);

  const roomCount = useMemo(() => rooms.length, [rooms]);
  const roomsToDisplay = useMemo(() => rooms.slice(0, 6), [rooms]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleViewAllRooms = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/dashboard");
  };

  const handleBookNow = (roomId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "user") {
      navigate("/dashboard");
      return;
    }

    navigate(`/room/${roomId}`);
  };

  const handleReadMore = (link) => {
    if (!link) {
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleAllArticles = () => {
    if (blogs.length > 0 && blogs[0].link) {
      handleReadMore(blogs[0].link);
      return;
    }
    scrollToSection(blogsSectionRef);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        className="relative mx-6 mt-6 overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #1c0a00 0%, #4a2000 55%, #1c0a00 100%)",
          minHeight: 320,
        }}
      >
        <div className="absolute top-0 right-0 rounded-full pointer-events-none w-80 h-80 bg-amber-600/20 blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 translate-y-1/2 rounded-full pointer-events-none bg-amber-400/10 blur-2xl -translate-x-1/4" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-10 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold border rounded-full bg-amber-500/20 border-amber-500/30 text-amber-300">
              Rated #1 Luxury Resort 2025
            </div>
            <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Welcome to <span className="text-amber-400">ResortLuxe</span>
            </h1>
            <p className="max-w-lg mb-6 text-base leading-relaxed text-gray-300 md:text-lg">
              Discover world-class suites, breathtaking views, and unparalleled service.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <button
                onClick={() => scrollToSection(roomsSectionRef)}
                className="px-6 py-3 text-sm font-bold text-white transition-colors shadow-lg bg-amber-500 hover:bg-amber-600 rounded-xl"
              >
                Explore Rooms
              </button>
              <button
                onClick={handleViewAllRooms}
                className="px-6 py-3 text-sm font-semibold text-white transition-colors border border-white/30 hover:border-amber-400 hover:text-amber-400 rounded-xl"
              >
                View Packages
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:flex-col">
            {[
              { num: "500+", label: "Monthly Guests" },
              { num: "4.9*", label: "Avg Rating" },
              { num: String(roomCount), label: "Room Types" },
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

      <section ref={roomsSectionRef} className="px-6 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Our Accommodations</p>
            <h2 className="text-2xl font-extrabold text-gray-900">Rooms & Suites</h2>
          </div>
          <button
            onClick={handleViewAllRooms}
            className="px-4 py-2 text-sm font-semibold transition-colors border rounded-lg text-amber-600 hover:text-amber-700 border-amber-200 hover:border-amber-400"
          >
            View All
          </button>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading rooms...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roomsToDisplay.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={roomImageMap[room.imageKey] || room.image || fallbackRoomImage}
                  alt={room.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                {room.tag && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {room.tag}
                  </span>
                )}
                <span className="absolute px-3 py-1 text-xs font-bold text-gray-900 rounded-full top-3 right-3 bg-white/90 backdrop-blur-sm">
                  INR {room.price}/night
                </span>
              </div>

              <div className="p-4">
                <h3 className="mb-1 text-base font-bold text-gray-900">{room.name}</h3>
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <span>{room.beds ?? 1} Bed{(room.beds ?? 1) > 1 ? "s" : ""}</span>
                  <span>{room.baths ?? 1} Bath{(room.baths ?? 1) > 1 ? "s" : ""}</span>
                </div>
                <button
                  onClick={() => handleBookNow(room.id)}
                  className="w-full bg-gray-900 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={blogsSectionRef} className="px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Stories & Insights</p>
            <h2 className="text-2xl font-extrabold text-gray-900">From Our Blog</h2>
          </div>
          <button
            onClick={handleAllArticles}
            className="px-4 py-2 text-sm font-semibold transition-colors border rounded-lg text-amber-600 hover:text-amber-700 border-amber-200 hover:border-amber-400"
          >
            All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogs.map((post, i) => (
            <article
              key={post.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`overflow-hidden ${i === 0 ? "h-52" : "h-40"}`}>
                <img
                  src={post.image}
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
                  <span className="ml-auto text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="mb-2 text-sm font-bold leading-snug text-gray-900">{post.title}</h3>
                <p className="mb-3 text-xs leading-relaxed text-gray-500 line-clamp-3">{post.excerpt}</p>
                <button
                  onClick={() => handleReadMore(post.link)}
                  className="text-xs font-semibold text-amber-600 hover:underline"
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 mt-12 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Guest Testimonials</p>
            <h2 className="text-2xl font-extrabold text-gray-900">What Our Guests Say</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <span className="text-sm font-extrabold text-gray-900">4.9 / 1,200 reviews</span>
          </div>
        </div>

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
            {reviews[activeReview].role} | {reviews[activeReview].room} | {reviews[activeReview].date}
          </p>
        </div>

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
