import { Link, useParams } from "react-router-dom";
import { storyPages } from "../data/site";

export default function StoryPage({ forcedSlug }) {
  const { slug } = useParams();
  const page = storyPages[forcedSlug || slug];

  if (!page) {
    return (
      <div className="page-status">
        <p>Page not found.</p>
        <Link to="/" className="btn solid">Back home</Link>
      </div>
    );
  }

  return (
    <main className="story-page">
      <h1>{page.title}</h1>
      <div className="story-grid">
        {page.slides.map((slide) => (
          <article key={slide.heading} className="story-card">
            <div className="story-images">
              <img src={slide.left} alt="" />
              <img src={slide.right} alt="" />
            </div>
            <div className="story-copy">
              <h2>{slide.heading}</h2>
              <p className="story-label">{slide.label}</p>
              <p>{slide.text}</p>
            </div>
          </article>
        ))}
      </div>
      <Link to="/contact" className="btn solid">Inquire now</Link>
    </main>
  );
}
