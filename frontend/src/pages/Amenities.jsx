import { Link } from "react-router-dom";
import { amenities } from "../data/site";

export default function Amenities() {
  return (
    <main className="amenities-page">
      {amenities.map((item, index) => (
        <article key={item.id} style={{ "--index": index }}>
          <div className="article__img">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="article__info">
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <Link to={`/amenities/${item.id}`}>{item.cta}</Link>
          </div>
        </article>
      ))}
    </main>
  );
}
