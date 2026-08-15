import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Story from '../components/Story';
import Gallery from '../components/Gallery';
import Reservation from '../components/Reservation';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import RollingDishes from '../components/RollingDishes';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Menu />
      <Story />
      <Gallery />
      <Reservation />
      <LocationSection />
      <Footer />
      <WhatsAppButton />
      <RollingDishes />
    </div>
  );
}
