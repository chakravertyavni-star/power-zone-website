import { Link, useParams } from "react-router-dom";
import { amenities } from "../data/site";

export default function AmenityDetail() {
  const { id } = useParams();
  const amenity = amenities.find((item) => item.id === id);

  if (!amenity) {
    return (
      <div className="page-status">
        <p>Amenity not found.</p>
        <Link to="/amenities" className="btn solid">Back to amenities</Link>
      </div>
    );
  }

  return (
    <main className="amenity-detail">
      {amenity.sections.map((section) => (
        <section key={section.title}>
          <div className="detail-hero" style={{ backgroundImage: `url(${section.image})` }}>
            <h1>
              {section.title}
              <span>{section.subtitle}</span>
            </h1>
          </div>
          <p className="detail-copy">{section.text}</p>
        </section>
      ))}
      <div className="detail-actions">
        <Link to="/amenities" className="btn outline">All amenities</Link>
        <Link to="/contact" className="btn solid">Get in touch</Link>
      </div>
    </main>
  );
}
