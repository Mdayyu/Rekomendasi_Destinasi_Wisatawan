import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Header from "../component/Header";
import Footer from "../component/Footer";



const cityContent = {
  Jakarta: {
    description: "Jakarta, ibu kota Indonesia, menawarkan perpaduan unik antara modernitas dan warisan budaya. Nikmati wisata sejarah di Kota Tua, kuliner legendaris, hingga kehidupan malam yang dinamis.",
    gallery: [
      'https://plus.unsplash.com/premium_photo-1697730084912-1baae78c1bb3?w=600&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1733259891253-cb820ac92adf?w=600&auto=format&fit=crop&q=60',
      'https://anekatempatwisata.com/wp-content/uploads/2018/04/Taman-Mini-Indonesia-Indah.jpg',
      'https://www.ancol.com/blog/wp-content/uploads/2022/03/wisata-pantai-di-jakarta.jpg',
      'https://img.okezone.com/content/2022/05/09/301/2591148/16-restoran-mewah-di-jakarta-selatan-cocok-buat-dinner-bareng-pasangan-od6EBdWESM.JPG',
      'https://burst.shopifycdn.com/photos/tea-cup-with-hot-peppers-and-yellow-tomatoes-on-red.jpg?height=364&format=pjpg&exif=0&iptc=0'
    ]
  },
  Bandung: {
    description: "Bandung dikenal sebagai Kota Kembang dengan udara sejuk, factory outlet, dan wisata alam yang memukau. Jelajahi keindahan alam pegunungan dan kuliner khas Sunda.",
    gallery: [
      'https://images.unsplash.com/photo-1611638281871-1063d3e76e1f?q=80&w=2033&auto=format&fit=crop',
      'https://images.pexels.com/photos/13443752/pexels-photo-13443752.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/32327670/pexels-photo-32327670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.unsplash.com/photo-1531283547128-6e7baecb9e6e?w=1000&auto=format&fit=crop&q=60',
      'https://images.pexels.com/photos/13443376/pexels-photo-13443376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.unsplash.com/photo-1549473889-14f410d83298?w=1000&auto=format&fit=crop&q=60'
    ]
  },
  Yogyakarta: {
    description: "Jantung budaya Jawa dengan kekayaan sejarah dan tradisi. Jelajahi Candi Borobudur, keraton, dan seni jalanan yang hidup.",
    gallery: [
      'https://plus.unsplash.com/premium_photo-1700955004555-900a9733ee14?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543874768-af0b9c4090d5?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1580883688613-b2c0f57a1f89?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1563700758013-3618e241f12c?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1648376547082-dc7a1b739129?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586319826907-1ff4aadbaddc?w=600&auto=format&fit=crop&q=60'
    ]
  },
  Semarang: {
    description: "Kota dengan jejak sejarah kolonial yang kuat dan kuliner ikonis seperti lumpia. Temukan keindahan Lawang Sewu dan Kota Lama.",
    gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60', // Lawang Sewu
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&auto=format&fit=crop&q=60', // Kota Lama Semarang
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=60', // Gedung Sate (dekat Bandung tapi masih Jawa Barat, kalau mau ganti aku cariin)
  'https://images.unsplash.com/photo-1486308510493-cb0b5f8262a8?w=600&auto=format&fit=crop&q=60', // Pemandangan sungai di Semarang
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=60', // Kuliner Lumpia Semarang
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop&q=60'   // pemandangan kota
    ]
  },
  Surabaya: {
    description: "Kota Pahlawan dengan semangat modern dan sejarah perjuangan. Nikmati wisata kuliner khas Surabaya dan taman kota yang hijau.",
    gallery: [
      'https://plus.unsplash.com/premium_photo-1678481816413-00aabc64678d?w=600&auto=format&fit=crop&q=60', // Kota Surabaya
  'https://images.unsplash.com/photo-1562656611-2b26567ccf19?w=600&auto=format&fit=crop&q=60', // Landmark Surabaya
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60', // Taman kota Surabaya (ganti dengan foto taman yang valid)
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&auto=format&fit=crop&q=60', // Jalanan kota Surabaya (pakai yang valid dari Semarang karena susah cari link lain)
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=60', // Kuliner Surabaya (pakai yang valid dari Semarang)
  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60'   // sunset kota
    ]
  }
};


const getCityImage = (city) => {
  const cityImages = {
    Semarang: 'https://images.unsplash.com/photo-1549973890-38d08b229439',
    Bandung: 'https://images.unsplash.com/photo-1531283547128-6e7baecb9e6e',
    Yogyakarta: 'https://images.unsplash.com/photo-1566559631170-a462eb20c432',
    Jakarta: 'https://images.unsplash.com/photo-1575864716793-49a09717eb03',
    Surabaya: 'https://images.unsplash.com/photo-1667438698939-5fbe5cb7684b',
    All: 'https://images.unsplash.com/photo-1442544213729-6a15f1611937'
  };
  return cityImages[city] || 'https://source.unsplash.com/800x600/?landscape';
};

function Home() {
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All');

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_URL}/destination/`)
      .then((res) => {
        setDestinasi(res.data.destination);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function formatPrice(price) {
  if (!price && price !== 0) return "-";
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

const selectedGallery = selectedCity !== 'All' && cityContent[selectedCity]
  ? cityContent[selectedCity].gallery
  : [];



  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  const cities = ['All', ...new Set(destinasi.map(d => d.city))];
  const filteredDestinasi = selectedCity === 'All'
    ? destinasi
    : destinasi.filter(d => d.city === selectedCity);

  return (
    <>
      <Header />
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[450px] bg-cover bg-center text-white flex items-center justify-start"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')" }}>
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 px-6 md:px-12 text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Liburan Anda,<br />Tujuan Anda
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Jelajahi Dunia dengan Rekomendasi Wisata yang Tepat dan Personal.
          </p>
        </div>
      </section>

      {/* City Swiper Filter */}
      <section className="px-6 py-8 bg-gray-50 ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-400 text-center">Pilih Kota</h2>
        <div className="max-w-6xl mx-auto">
          <Swiper
            effect={'coverflow'}
            grabCursor
            centeredSlides
            slidesPerView={'auto'}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            modules={[EffectCoverflow, Navigation]}
            className="citySwiper"
            breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          >
            {cities.map(city => (
              <SwiperSlide key={city} onClick={() => setSelectedCity(city)} className="!w-[280px] cursor-pointer group relative">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2">
                  <img src={`${getCityImage(city)}?w=600&auto=format&fit=crop&q=80`} alt={city}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-bold">{city}</h3>
                  </div>
                  {city === selectedCity && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse">✓</div>
                  )}
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next !text-blue-500 !scale-75" />
            <div className="swiper-button-prev !text-blue-500 !scale-75" />
          </Swiper>
        </div>
      </section>

      {/* City Content & Masonry Gallery */}
{selectedCity !== 'All' && cityContent[selectedCity] && (
  <section className="px-6 py-12 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* JUDUL & DESKRIPSI TENGAH */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Mengenal {selectedCity}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          {cityContent[selectedCity].description}
        </p>
      </div>

      {/* GALERI */}
      <div className="flex justify-center">
        <div className="w-[800px]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Galeri {selectedCity}
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {/* KIRI */}
            <div className="flex flex-col gap-3">
              <img
                src={selectedGallery[0]}
                alt="Sedang Kiri"
                className="h-[150px] w-full object-cover rounded-md shadow"
              />
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={selectedGallery[1]}
                  alt="Kecil 1"
                  className="w-full aspect-square object-cover rounded-md shadow"
                />
                <img
                  src={selectedGallery[2]}
                  alt="Kecil 2"
                  className="w-full aspect-square object-cover rounded-md shadow"
                />
              </div>
            </div>

            {/* TENGAH */}
            <div>
              <img
                src={selectedGallery[3]}
                alt="Besar Tengah"
                className="h-[306px] w-full object-cover rounded-md shadow"
              />
            </div>

            {/* KANAN */}
            <div className="flex flex-col gap-3">
              <img
                src={selectedGallery[4]}
                alt="Sedang Kanan 1"
                className="h-[145px] w-full object-cover rounded-md shadow"
              />
              <img
                src={selectedGallery[5]}
                alt="Sedang Kanan 2"
                className="h-[145px] w-full object-cover rounded-md shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}


    {/* Destinations Grid */}
<section className="px-6 py-16 bg-gray-50">
  <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
    {selectedCity === 'All' ? 'Semua Destinasi' : `Destinasi di ${selectedCity}`}
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {filteredDestinasi.map(des => (
      <div key={des.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={des.image || getCityImage(des.city)} 
            alt={des.place_name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          
          {/* Lokasi (kota) badge di kanan atas */}
          <div className="absolute top-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {des.city}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{des.place_name}</h3>
          
          {/* Harga di bawah dekat tombol */}
          <div className="text-lg text-green-600 font-bold mb-4">
            {formatPrice(des.price)}
          </div>

          <Link 
            to={`/destinasi/${des.id}`} 
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Lihat Detail
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5.293 5.293a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
   <Footer />
  </>
 );
}

export default Home;
