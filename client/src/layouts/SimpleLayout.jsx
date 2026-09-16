import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SimpleLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default SimpleLayout;