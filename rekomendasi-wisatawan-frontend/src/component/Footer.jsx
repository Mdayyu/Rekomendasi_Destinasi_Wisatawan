import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-blue-600">
            JelajahIndo
          </h4>
          <p className="text-sm">
            Platform untuk menemukan dan menjelajahi destinasi wisata terbaik di
            Indonesia.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/destinasi" className="hover:text-blue-600">
                Destinasi
              </Link>
            </li>
            <li>
              <Link to="/tentang" className="hover:text-blue-600">
                Tentang
              </Link>
            </li>
            <li>
              <Link to="/kontak" className="hover:text-blue-600">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Hubungi Kami</h4>
          <p className="text-sm mb-2">Email: info@jelajahindo.id</p>
          <p className="text-sm mb-2">Telp: +62 812 3456 7890</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 11-20 0 10 10 0 0120 0zm-6-1h-2v-1c0-.6.4-1 1-1h1V7h-2c-1.7 0-3 1.3-3 3v1H9v2h2v6h2v-6h2l1-2z" />
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.42 3.6 8.09 8.15 8.93v-6.32h-2.45v-2.61h2.45v-2.04c0-2.43 1.45-3.77 3.67-3.77 1.06 0 2.17.19 2.17.19v2.38h-1.22c-1.21 0-1.58.75-1.58 1.51v1.73h2.68l-.43 2.61h-2.25v6.32c4.55-.84 8.15-4.51 8.15-8.93 0-5.51-4.45-9.96-9.96-9.96z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm py-4 border-t bg-gray-50 text-gray-500">
        © {new Date().getFullYear()} JelajahIndo. Semua hak dilindungi.
      </div>
    </footer>
  );
}
