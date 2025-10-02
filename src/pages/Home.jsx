
import "./Home.css";
import { FaPlay } from "react-icons/fa";
import heroImg from "../assets/image/nik-tE2EynlYV-A-unsplash.jpg";

export default function Home() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="overlay">
        <div className="hero-content">
          <span className="tag">🚴 Bike Delivery</span>
          <h1>
            Fastest <span className="highlight">Delivery</span> & Easy Pickup
          </h1>
          <p>
            Grocen assures fresh Pizza everyday to your family without
            getting out from your apartment.
          </p>

          <div className="hero-buttons">
            <a href="/menu" className="order-btn">Order Now</a>
            <button className="process-btn"><FaPlay /> Order Process</button>
          </div>

          <div className="sub-text">
            👩‍🍳 When you are too Hungry, we are just a click away!
          </div>
        </div>
      </div>
    </section>
  );
}
