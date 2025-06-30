import { Link } from 'react-router-dom';
import './FeaturedCollections.css';

const collections = [
  {
    title: 'Wall Arts',
    image: 'https://res.cloudinary.com/dbazlbkfj/image/upload/v1749833360/ChatGPT_Image_Jun_13_2025_01_57_27_PM_nxsznh.png',
    link: '/category/wall-art',
  },
  {
    title: 'Coffee Tables',
    image: 'https://res.cloudinary.com/dbazlbkfj/image/upload/v1750097587/ChatGPT_Image_Jun_16_2025_11_42_27_PM_lgrt5j.png',
    link: '/category/coffee-table',
  },
  {
    title: 'Kitchen & Dining',
    image: 'https://res.cloudinary.com/dbazlbkfj/image/upload/v1750097722/WhatsApp_Image_2025-06-16_at_23.04.11_1dfba84f_xhbx71.jpg',
    link: '/category/kitchen-accessory',
  },
];

function FeaturedCollections() {
  return (
    <div className="featured-collections">
      <h2 className="fc-heading">✨ Featured Collections</h2>
      <div className="fc-grid">
        {collections.map((item, i) => (
          <Link to={item.link} className="fc-card" key={i}>
            <img src={item.image} alt={item.title} />
            <div className="fc-overlay">
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCollections;
