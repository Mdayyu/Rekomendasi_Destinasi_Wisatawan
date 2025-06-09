import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// Komponen Bintang Rating yang diperbaiki
const RatingStars = ({ rating }) => {
  // Konversi rating (0-50) ke skala 0-5
  const ratingInFive = rating / 10;
  const fullStars = Math.floor(ratingInFive);
  const hasHalfStar = ratingInFive - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Bintang penuh */}
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {/* Bintang setengah */}
      {hasHalfStar && (
        <div className="relative inline-block w-5 h-5">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Bintang kosong */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      <span className="ml-2 text-gray-700 font-medium">
        {ratingInFive.toFixed(1)}
      </span>
    </div>
  );
};

// Fungsi untuk mendapatkan gambar kota
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

// Fungsi format harga
function formatPrice(price) {
  if (!price && price !== 0) return "Gratis";
  return price === 0 ? "Gratis" : new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
}

function ShowDetail() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [destination, setDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/destination/${id}/`)
      .then((res) => {
        setDestination(res.data.destination);
        setRecommendations(res.data.recommendations);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
        setLoading(false);
      });
  }, [id, API_URL]);

  if (loading) return <p className="text-center mt-10">Loading detail...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!destination) return <p className="text-center mt-10">Data tidak ditemukan</p>;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <img 
          src={destination.image || getCityImage(destination.city)} 
          alt={destination.place_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 md:p-12 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{destination.place_name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full">
                {destination.city}
              </span>
              <span className="bg-green-600 text-white px-4 py-1 rounded-full">
                {formatPrice(destination.price)}
              </span>
              
            </div>
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Informasi Tambahan: Kategori, Jam, Rating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Kategori</h3>
            <p className="text-xl font-bold text-blue-900">{destination.category || "Wisata Umum"}</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-amber-800 mb-2">Durasi Kunjungan</h3>
            <p className="text-xl font-bold text-amber-900">
              {destination.hour ? `${destination.hour} jam` : "4-6 jam"}
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-green-800 mb-2">Rating Pengunjung</h3>
            {destination.rating ? (
              <RatingStars rating={destination.rating} />
            ) : (
              <p className="text-gray-600">Belum ada rating</p>
            )}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="prose prose-lg max-w-none mb-10">
          <p className="text-gray-700 whitespace-pre-line">{destination.description}</p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke daftar destinasi
        </Link>
      </div>

      {/* Rekomendasi */}
   <section className="px-6 py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-semibold mb-8 text-gray-800">Rekomendasi Destinasi Serupa</h2>
    
    {recommendations.length === 0 ? (
      <p className="text-gray-500">Tidak ada rekomendasi tersedia.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map((data) => (
          <div key={data.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={data.image || getCityImage(data.city)} 
                alt={data.place_name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />

              {/* Badge Lokasi (kota) */}
              <div className="absolute top-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {data.city}
                </div>
              </div>
            </div>
            
            <div className='p-5'>
              <h3 className='text-xl font-bold text-amber-900'>
                Similarity Score : {data.score}
              </h3>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{data.place_name}</h3>

              {/* Harga di bawah */}
              <div className="text-lg text-green-600 font-bold mb-4">
                {formatPrice(data.price)}
              </div>

              <Link 
                to={`/destinasi/${data.id}`} 
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
    )}
  </div>
</section>

    </div>
  );
}

export default ShowDetail;