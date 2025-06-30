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
          src="https://res.cloudinary.com/your-cloudinary/video/upload/v1234567890/epoxy_table1.mp4"
          controls
          muted
          loop
          playsInline
        />
        <video
          className="home-video"
          src="https://res.cloudinary.com/your-cloudinary/video/upload/v1234567890/epoxy_table2.mp4"
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
