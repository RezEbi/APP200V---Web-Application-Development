import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ===== HERO / RESTAURANT ===== */
const heroContent = {
  title: "Flavor House",
  subtitle: "Taste the world in one place",
  text: "A modern restaurant experience inspired by destinations, cultures, and unforgettable flavors.",
  image: "/images/restaurant.jpg",
};

/* ===== FEATURED FOOD ===== */
const featuredFoods = [
  {
    id: 1,
    title: "Pizza & Burger",
    text: "Bold favorites made for comfort and sharing.",
    image: "/images/pizza_burger.jpg",
  },
  {
    id: 2,
    title: "Pasta",
    text: "Classic Italian soul with timeless taste.",
    image: "/images/pasta.jpg",
  },
  {
    id: 3,
    title: "Arabic Food",
    text: "Rich tradition, warmth, and authentic flavor.",
    image: "/images/arabic_food.jpg",
  },
  {
    id: 4,
    title: "French Cuisine",
    text: "Elegant dishes with refined presentation.",
    image: "/images/french_food.jpg",
  },
  {
    id: 5,
    title: "Mexican Food",
    text: "Colorful, bold, and full of spice.",
    image: "/images/mexican_food.jpg",
  },
];
/* ===== COUNTRY SLIDER ===== */
const sliderDestinations = [
  {
    id: 1,
    country: "Italy",
    title: "The birthplace of pizza and pasta",
    text: "Romantic atmosphere and timeless Italian flavor.",
    image: "/images/italy.jpg",
  },
  {
    id: 2,
    country: "France",
    title: "Elegant flavors and refined dining",
    text: "Discover a luxurious culinary journey inspired by French culture.",
    image: "/images/france.jpg",
  },
  {
    id: 3,
    country: "Mexico",
    title: "Bold spices and vibrant energy",
    text: "Experience colorful streets and unforgettable bold taste.",
    image: "/images/mexico.jpg",
  },
  {
    id: 4,
    country: "USA",
    title: "Classic comfort and modern favorites",
    text: "Enjoy iconic comfort food inspired by American culture.",
    image: "/images/usa.jpg",
  },
  {
    id: 5,
    country: "Arabia",
    title: "Warm hospitality and rich tradition",
    text: "A journey through authentic Middle Eastern culture and flavor.",
    image: "/images/arabia.jpg",
  },
];

/* ===== MOODS ===== */
const moods = [
  {
    id: 1,
    name: "Romantic ❤️",
    destination: "Italy",
    text: "Soft, elegant, and timeless flavors.",
  },
  {
    id: 2,
    name: "Spicy 🔥",
    destination: "Mexico",
    text: "Bold, exciting, and energetic taste.",
  },
  {
    id: 3,
    name: "Comfort 🍔",
    destination: "USA",
    text: "Familiar favorites and satisfying comfort food.",
  },
  {
    id: 4,
    name: "Warm 🌙",
    destination: "Arabia",
    text: "Rich hospitality and deeply comforting flavors.",
  },
  {
    id: 5,
    name: "Luxury ✨",
    destination: "France",
    text: "Refined presentation and premium dining mood.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMood, setSelectedMood] = useState(moods[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderDestinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = sliderDestinations[currentSlide];

  return (
    <div className="page fh-home">
      {/* ===== HERO ===== */}
      <section className="container">
        <div className="fh-home-hero card">
          <div className="fh-home-hero-content">
            <span className="fh-home-eyebrow">Flavor House • Global Dining</span>
            <h1>{heroContent.title}</h1>
            <h3 className="fh-home-subtitle">{heroContent.subtitle}</h3>
            <p>{heroContent.text}</p>

            <div className="hero-cta">
              <Link to="/menu" className="btn primary">
                Explore Menu
              </Link>
              <Link to="/book" className="btn">
                Book a Table
              </Link>
            </div>
          </div>

          <div className="fh-home-hero-image-wrap">
            <img
              src={heroContent.image}
              alt="Flavor House restaurant"
              className="fh-home-hero-image"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURED FOOD ===== */}
      <section className="container mt-4">
        <div className="fh-home-section-head">
          <span className="fh-home-eyebrow">Featured Favorites</span>
          <h2>Real flavors from the house</h2>
          <p className="muted">
            A quick taste of what makes Flavor House special.
          </p>
        </div>

       <div className="fh-food-wrapper mt-4">
  <button
    className="fh-scroll-btn left"
    onClick={() => {
      document.querySelector(".fh-food-scroll").scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }}
  >
    ‹
  </button>

  <div className="fh-food-scroll">
    {featuredFoods.map((item) => (
      <div key={item.id} className="card fh-home-food-card">
        <img src={item.image} alt={item.title} />
        <div className="fh-home-food-body">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </div>
    ))}
  </div>

  <button
    className="fh-scroll-btn right"
    onClick={() => {
      document.querySelector(".fh-food-scroll").scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }}
  >
    ›
  </button>
</div>
      </section>

      {/* ===== COUNTRY SLIDER ===== */}
      <section className="container mt-4">
        <div className="fh-home-section-head">
          <span className="fh-home-eyebrow">Travel Through Taste</span>
          <h2>Explore destinations</h2>
          <p className="muted">
            Every destination brings its own atmosphere, story, and culinary identity.
          </p>
        </div>

        <div className="fh-home-slider mt-4">
          <img
            src={activeSlide.image}
            alt={activeSlide.country}
            className="fh-home-slider-image"
          />

          <div className="fh-home-slider-overlay">
            <div className="fh-home-slider-content">
              <h2>{activeSlide.country}</h2>
              <h3 className="fh-home-slider-title">{activeSlide.title}</h3>
              <p className="fh-home-slider-text">{activeSlide.text}</p>

              <div className="hero-cta">
                <Link to="/menu" className="btn primary">
                  Explore Menu
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="fh-home-dots">
          {sliderDestinations.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`fh-home-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to ${item.country}`}
            />
          ))}
        </div>
      </section>

      {/* ===== MOOD ===== */}
      <section className="container mt-4">
        <div className="card fh-home-mood-section">
          <div className="fh-home-section-head">
            <span className="fh-home-eyebrow">Interactive Experience</span>
            <h2>Choose your mood</h2>
            <p className="muted">
              Let your mood guide your next destination.
            </p>
          </div>

          <div className="fh-home-mood-list mt-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={`fh-home-mood-btn ${
                  selectedMood.id === mood.id ? "active" : ""
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                {mood.name}
              </button>
            ))}
          </div>

          <div className="card fh-home-mood-result mt-4">
            <span className="fh-home-result-label">Recommended destination</span>
            <h3>{selectedMood.destination}</h3>
            <p>{selectedMood.text}</p>

            <Link to="/menu" className="btn primary">
              Explore this mood
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="container mt-4">
        <div className="card fh-home-final-cta">
          <div>
            <span className="fh-home-eyebrow">Ready to begin?</span>
            <h2>Your next flavor journey starts here.</h2>
            <p className="muted">
              Explore the menu or reserve your table in seconds.
            </p>
          </div>

          <div className="hero-cta">
            <Link to="/menu" className="btn primary">
              Explore Menu
            </Link>
            <Link to="/book" className="btn">
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
