import { Link } from "react-router-dom";

const carousel = [
  { src: "/images/gym6.jpg", color: "142, 249, 252" },
  { src: "/images/gym3.jpg", color: "142, 252, 204" },
  { src: "/images/gym4.jpg", color: "142, 252, 157" },
  { src: "/images/gym5.jpg", color: "215, 252, 142" },
  { src: "/images/slide6.jpg", color: "252, 252, 142" },
];

const highlights = [
  { title: "Strength Training", text: "Build muscle, improve endurance, and grow stronger with guided workouts.", color: "#01e100" },
  { title: "Cardio Zone", text: "Boost stamina and burn calories with high-energy cardio sessions.", color: "#f50076" },
  { title: "Personal Coaching", text: "Get expert guidance with personalized workout and nutrition plans.", color: "#00e6fd" },
  { title: "Group Classes", text: "Stay motivated and have fun with yoga, HIIT, and strength classes.", color: "#9d00ff" },
];

const fitpass = [
  { src: "/images/fitpass.webp", title: "FITPASS", text: "Access Premium Gyms & Fitness Centres of India" },
  { src: "/images/fitcoach.webp", title: "FITCOACH", text: "A.I. Enabled Revolutionary Fitness Coach" },
  { src: "/images/fitfeast.webp", title: "FITFEAST", text: "Dedicated Nutrition Expert with Personalised Diets" },
];

const starters = [
  { text: "Trainers", icon: "fa-user", rotate: -12, to: "/trainers" },
  { text: "Membership", icon: "fa-id-card", rotate: 4, to: "/membership" },
  { text: "Nutritionist", icon: "fa-apple-whole", rotate: 16, to: "/nutritionist" },
];

const features = [
  { icon: "/images/png1.avif", title: "UNLIMITED", text: "Challenge yourself, not your bank account." },
  { icon: "/images/png2.avif", title: "ALL-INCLUSIVE", text: "Classes, studios, specialty workshops and more." },
  { icon: "/images/png3.avif", title: "EXPERT INSTRUCTION", text: "Certified coaches who keep you progressing." },
  { icon: "/images/png4.avif", title: "CONVENIENCE", text: "Everything you need, all under one roof." },
];

const plans = [
  { title: "HEALTH", items: ["Unlimited Classes", "Daily Locker", "Fitness Evaluation", "Guest Passes", "1 PT Session"], cta: "INQUIRE FOR RATES" },
  { title: "HEALTH PLUS", items: ["Health's Features +", "Laundry Service", "Overnight Locker", "3 PT Sessions"], cta: "INQUIRE FOR RATES" },
  { title: "OTHER", items: ["Corporate", "Neighborhood", "Student", "Partner"], cta: "LEARN MORE" },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="carousel-wrap">
          <div className="inner" style={{ "--quantity": carousel.length }}>
            {carousel.map((card, index) => (
              <div
                key={card.src}
                className="card1"
                style={{ "--index": index, "--color-card": card.color }}
              >
                <div className="img">
                  <img src={card.src} alt="Power Zone gym" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ticker">
          <p>One Step Ahead...</p>
          <div className="words">
            <span className="word">Power!</span>
            <span className="word">Weights!</span>
            <span className="word">Energy!</span>
            <span className="word">Workout!</span>
            <span className="word">Training!</span>
          </div>
        </div>
      </section>

      <section className="highlights">
        {highlights.map((item) => (
          <article key={item.title} className="highlight-card" style={{ "--clr": item.color }}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="fitpass-section">
        <h2>
          Personalise Your <span>Fitness Your Way</span> with
          <strong>FITPASS</strong>
        </h2>
        <p className="fitpass-desc">
          Get ready to witness your fitness journey taking a transformative turn
          with personalised fitness plans designed to cater to your unique fitness
          and wellness goals. Embark on a smart fitness experience that engages and
          evolves with you so that you stay motivated every step of the way.
        </p>
        <div className="fitpass-cards">
          {fitpass.map((card) => (
            <article key={card.title} className="fitpass-card">
              <img src={card.src} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="starter-section">
        <h2>Get Started</h2>
        <div className="glass-row">
          {starters.map((item) => (
            <Link
              key={item.text}
              to={item.to}
              className="glass"
              style={{ "--r": item.rotate }}
              data-text={item.text}
            >
              <i className={`fa-solid ${item.icon}`} />
            </Link>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="features-left">
          {features.map((item) => (
            <div key={item.title} className="feature-item">
              <img src={item.icon} alt="" className="feature-icon" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="features-right">
          <img src="/images/slide6.jpg" className="feature-image" alt="Gym training floor" />
        </div>
      </section>

      <section className="membership-section">
        <div className="membership-content">
          <h2>Membership Options</h2>
          <p>
            All Memberships include full access to our amenities, pools, fitness classes & much more.
            Live or work in the area? Inquire about our Corporate & Neighborhood Rates.
          </p>
          <div className="membership-cards">
            {plans.map((plan) => (
              <article key={plan.title} className="membership-box">
                <h3>{plan.title}</h3>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link to="/contact" className="btn outline">{plan.cta}</Link>
              </article>
            ))}
          </div>
          <Link to="/membership" className="btn solid">Membership</Link>
        </div>
      </section>
    </div>
  );
}
