import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        {/* Logo di kiri */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="JelajahIndo Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold text-gray-800">JelajahIndo</span>
        </Link>

        {/* Menu navigasi di kanan */}
        <div className="ml-auto hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
          >
            Beranda
          </Link>
          <Link
            to="/destinasi"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
          >
            Destinasi
          </Link>
          <Link
            to="/tentang"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
          >
            Tentang
          </Link>
          <Link
            to="/kontak"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
          >
            Kontak
          </Link>
        </div>
      </div>
    </nav>
  );
}
