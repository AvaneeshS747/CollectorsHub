import React from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

// Mock data for the explore page, could be trending or random posts
const mockExplorePosts = [
  { id: 101, imageUrl: 'https://placehold.co/500x500/dcfce7/14532d?text=Stamp+1' },
  { id: 102, imageUrl: 'https://placehold.co/500x500/ede9fe/4c1d95?text=Vinyl+Record' },
  { id: 103, imageUrl: 'https://placehold.co/500x500/fef2f2/991b1b?text=Action+Figure' },
  { id: 104, imageUrl: 'https://placehold.co/500x500/fff7ed/c2410c?text=Vintage+Car' },
  { id: 105, imageUrl: 'https://placehold.co/500x500/eff6ff/1d4ed8?text=Rare+Book' },
  { id: 106, imageUrl: 'https://placehold.co/500x500/f0f9ff/0891b2?text=Fossil' },
  { id: 107, imageUrl: 'https://placehold.co/500x500/fdf4ff/a21caf?text=Art+Print' },
  { id: 108, imageUrl: 'https://placehold.co/500x500/f5f3ff/6d28d9?text=Watch' },
  { id: 109, imageUrl: 'https://placehold.co/500x500/fafafa/0a0a0a?text=Sneaker' },
  { id: 110, imageUrl: 'https://placehold.co/500x500/fefce8/a16207?text=Postcard' },
  { id: 111, imageUrl: 'https://placehold.co/500x500/ecfdf5/047857?text=Gemstone' },
  { id: 112, imageUrl: 'https://placehold.co/500x500/fff1f2/9f1239?text=Antique+Map' },
];

/**
 * The Explore page.
 * Displays a grid of trending or new posts for content discovery.
 */
const ExplorePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Explore Collections
        </h1>

        {/* Search Bar - Future Implementation */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search for tags, collections, or users..."
              type="search"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockExplorePosts.map(post => (
            <div key={post.id} className="relative group aspect-square">
              <img src={post.imageUrl} alt={`Explore post ${post.id}`} className="w-full h-full object-cover rounded-md" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;

