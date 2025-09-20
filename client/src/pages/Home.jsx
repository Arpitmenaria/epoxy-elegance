import { useEffect, useState } from "react";
import FeaturedCollections from "../components/FeaturedCollections";
import ImageBanner from "../components/ImageBanner";
import Slider from "../components/Slider";
import "./Home.css";
import FranchiseSection from "./FranchiseSection";

function Home() {
  // Customer counter state
  const [count, setCount] = useState(1);

  useEffect(() => {
    let current = 1;
    const maxCount = 165;
    const interval = setInterval(() => {
      current += 1;
      if (current > maxCount) {
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 60); // update speed - 30ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Slider />
      <FeaturedCollections />
      <ImageBanner />

      {/* Videos Section */}
      <section className="videos-section">
        <video
          className="home-video"
          src="https://res.cloudinary.com/dbazlbkfj/video/upload/v1758393735/WhatsApp_Video_2025-09-21_at_00.11.32_26ffe63b_ymdca7.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <video
          className="home-video"
          src="https://res.cloudinary.com/dbazlbkfj/video/upload/v1758393457/WhatsApp_Video_2025-09-21_at_00.01.35_94e87538_lkkdag.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>

      {/* Full-width Horizontal Banner */}
      <section className="horizontal-banner">
        <img src="https://res.cloudinary.com/dbazlbkfj/image/upload/v1750186095/location_banner__gn8lkr.jpg" alt="banner" />
        {/* <h2>Discover The Finest Epoxy Tables - Handcrafted for You</h2> */}
      </section>

      {/* Customers Counter Section - Digital Board Style */}
      <section className="customers-counter">
        <div className="digital-board">
          <span className="count">{count}+</span>
          <span className="label">customers bought from us</span>
        </div>
      </section>
      <FranchiseSection />
    </div>
  );
}

export default Home;
