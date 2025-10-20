import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import PostCard from '../components/post/PostCard.jsx';
import Spinner from '../components/common/Spinner.jsx';

// Mock data to simulate fetching posts from an API
const mockPosts = [
  {
    id: 1,
    user: {
      username: 'CoinCollector22',
      avatarUrl: 'https://placehold.co/100x100/a3e635/ffffff?text=C',
    },
    imageUrl: 'https://placehold.co/600x600/fecaca/991b1b?text=Ancient+Coin',
    caption: 'Just added this beautiful Roman Denarius to my collection! Minted during the reign of Emperor Augustus.',
    likes: 124,
    comments: 5,
    createdAt: '2 hours ago',
  },
  {
    id: 2,
    user: {
      username: 'CardShark',
      avatarUrl: 'https://placehold.co/100x100/93c5fd/ffffff?text=C',
    },
    imageUrl: 'https://placehold.co/600x600/a5b4fc/1e3a8a?text=Holographic+Card',
    caption: 'Finally got my hands on a mint condition holographic Charizard. The centerpiece of my collection!',
    likes: 589,
    comments: 45,
    createdAt: '1 day ago',
  },
    {
    id: 3,
    user: {
      username: 'BikeLife',
      avatarUrl: 'https://placehold.co/100x100/fcd34d/ffffff?text=B',
    },
    imageUrl: 'https://placehold.co/600x600/fde68a/b45309?text=Vintage+Motorcycle',
    caption: 'Took the old Triumph Bonneville for a spin today. Nothing beats the classics.',
    likes: 312,
    comments: 22,
    createdAt: '3 days ago',
  },
];

/**
 * The home page of the application.
 * It displays the main feed of posts from all users.
 */
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1500); // Simulate a 1.5-second network delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Latest Collections
        </h1>
        {loading ? (
          <div className="flex justify-center mt-16">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

