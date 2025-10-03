
import "./Home.css";
import { FaPlay, FaPercentage, FaGift, FaCalendarAlt } from "react-icons/fa";
import heroImg from "../assets/image/nik-tE2EynlYV-A-unsplash.jpg";
import { useState } from "react";

export default function Home() {
  const [showProcess, setShowProcess] = useState(false);
  const [step, setStep] = useState(0);

  const orderSteps = [
    "Order Accepted",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered"
  ];

  const handleProcess = () => {
    setShowProcess(true);
    setStep(0);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < orderSteps.length) {
        setStep(i);
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <>
      {/* Hero Section */}
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
              <button className="process-btn" onClick={handleProcess}>
                <FaPlay /> Order Process
              </button>
            </div>

            <div className="sub-text">
              👩‍🍳 When you are too Hungry, we are just a click away!
            </div>
          </div>
        </div>
      </section>

      {/* Order Process Modal */}
      {showProcess && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Status</h2>

            {/* Progress Tracker */}
            <div className="progress-container">
              {/* Animated orange line */}
              <div
                className="progress-line"
                style={{
                  width: `${(step / (orderSteps.length - 1)) * 100}%`,
                }}
              ></div>

              {orderSteps.map((s, index) => (
                <div
                  key={index}
                  className={`progress-step ${index <= step ? "active" : ""}`}
                >
                  <div className="circle">{index + 1}</div>
                  <p>{s}</p>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setShowProcess(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Discounts Section */}
      <section className="discounts">
        <h2>Special Offers 🎉</h2>
        <div className="discount-boxes">
          <div className="discount-card">
            <FaPercentage className="icon" />
            <h3>50% Off</h3>
            <p>Get flat 50% off on your first pizza order.</p>
          </div>

          <div className="discount-card">
            <FaGift className="icon" />
            <h3>First Customer</h3>
            <p>New here? Enjoy free garlic bread with your first order.</p>
          </div>

          <div className="discount-card">
            <FaCalendarAlt className="icon" />
            <h3>Weekend Treat</h3>
            <p>Every weekend, buy 1 pizza & get 1 free!</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">

          {/* Brand */}
          <div className="footer-brand">
            <h2>Pizza App 🍕</h2>
            <p>Fast & Fresh Pizza Delivered To Your Doorstep</p>
            {/* App Download Badges */}
            <div className="footer-apps">
              <a href="#"><img src="/assets/google-play.png" alt="Google Play" /></a>
              <a href="#"><img src="/assets/app-store.png" alt="App Store" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="footer-cities">
            <h3>Popular Cities</h3>
            <ul>
              <li>Berlin</li>
              <li>Munich</li>
              <li>Hamburg</li>
              <li>Cologne</li>
              <li>Frankfurt</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Email: support@grocen.com</p>
            <p>Phone: +49 123 456 789</p>
            <p>Address: Alexanderplatz, Berlin</p>
          </div>

          {/* Social Media */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe for latest offers & updates</p>
            <form>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 Pizza App. All Rights Reserved. Designed in Berlin</p>
        </div>
      </footer>
    </>
  );
}
