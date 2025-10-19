import React, { useState } from 'react';
import Navbar from 'components/layout/Navbar.jsx';
import Footer from 'components/layout/Footer.jsx';
import Button from 'components/common/Button.jsx';

// Mock data for a user profile
const mockUser = {
  username: 'CoinCollector22',
  avatarUrl: 'https://placehold.co/150x150/a3e635/ffffff?text=C',
  bio: 'Numismatist specializing in Roman currency. Sharing my passion for history, one coin at a time.',
  postsCount: 18,
  followersCount: 482,
  followingCount: 120,
  isOwnProfile: false, // Change to true to see "Edit Profile" button
  posts: Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://placehold.co/500x500/fecaca/991b1b?text=Coin+${i+1}`,
    likes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 50),
  })),
};

/**
 * The user profile page.
 * Displays user information, stats, and their posts.
 */
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // SVG Icon Components for grid and collection
  const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );

  const CollectionIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left p-4">
            <img
              src={mockUser.avatarUrl}
              alt={`${mockUser.username}'s avatar`}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="md:ml-10 mt-4 md:mt-0 flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <h1 className="text-3xl font-light text-gray-800">{mockUser.username}</h1>
                {mockUser.isOwnProfile ? (
                  <Button variant="secondary">Edit Profile</Button>
                ) : (
                  <Button variant="primary">Follow</Button>
                )}
              </div>
              <div className="flex justify-center md:justify-start gap-8 my-4 text-gray-700">
                <span><span className="font-semibold">{mockUser.postsCount}</span> posts</span>
                <span><span className="font-semibold">{mockUser.followersCount}</span> followers</span>
                <span><span className="font-semibold">{mockUser.followingCount}</span> following</span>
              </div>
              <p className="text-gray-600">{mockUser.bio}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-300 mt-8">
            <div className="flex justify-center gap-12 -mt-px">
              <button onClick={() => setActiveTab('posts')} className={`flex items-center gap-2 py-3 border-t-2 ${activeTab === 'posts' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>
                <GridIcon /> POSTS
              </button>
              <button onClick={() => setActiveTab('collection')} className={`flex items-center gap-2 py-3 border-t-2 ${activeTab === 'collection' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}>
                <CollectionIcon /> COLLECTION
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
                {mockUser.posts.map(post => (
                  <div key={post.id} className="relative group aspect-square">
                    <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100">
                      <span>❤️ {post.likes}</span>
                      <span className="ml-4">💬 {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'collection' && (
              <div className="text-center py-16">
                 <h2 className="text-2xl text-gray-700">Collection Showcase</h2>
                 <p className="text-gray-500 mt-2">This is where the user's curated collection will be displayed.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

