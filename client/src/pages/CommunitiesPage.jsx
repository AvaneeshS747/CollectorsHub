import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

/**
 * Communities Page where collectors can discover and join interest-based communities
 */
const CommunitiesPage = () => {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' or 'my-communities'

  // Mock community data
  const communities = [
    {
      id: 1,
      name: 'Ancient Coins Collectors',
      description: 'A community for enthusiasts of ancient Roman, Greek, and Byzantine coins.',
      members: 1245,
      posts: 8932,
      image: 'https://placehold.co/400x200/fecaca/991b1b?text=Ancient+Coins',
      joined: true,
    },
    {
      id: 2,
      name: 'Trading Card Masters',
      description: 'Pokemon, Yu-Gi-Oh, Magic: The Gathering, and more! Share your rare finds.',
      members: 3421,
      posts: 15672,
      image: 'https://placehold.co/400x200/a5b4fc/1e3a8a?text=Trading+Cards',
      joined: false,
    },
    {
      id: 3,
      name: 'Classic Motorcycles',
      description: 'Vintage bikes, restoration projects, and motorcycle memorabilia.',
      members: 892,
      posts: 4521,
      image: 'https://placehold.co/400x200/fde68a/b45309?text=Motorcycles',
      joined: true,
    },
    {
      id: 4,
      name: 'Rare Stamps Worldwide',
      description: 'Connect with philatelists from around the globe.',
      members: 654,
      posts: 3201,
      image: 'https://placehold.co/400x200/d4fc79/4d7c0f?text=Stamps',
      joined: false,
    },
    {
      id: 5,
      name: 'Vintage Toys & Figures',
      description: 'Action figures, die-cast cars, and nostalgic toys from the past.',
      members: 2103,
      posts: 9834,
      image: 'https://placehold.co/400x200/fbbf24/92400e?text=Vintage+Toys',
      joined: false,
    },
    {
      id: 6,
      name: 'Art & Antiques',
      description: 'Fine art, sculptures, and antique furniture collectors.',
      members: 1567,
      posts: 7234,
      image: 'https://placehold.co/400x200/c4b5fd/5b21b6?text=Art+%26+Antiques',
      joined: false,
    },
  ];

  const myCommunities = communities.filter((c) => c.joined);
  const discoverCommunities = communities.filter((c) => !c.joined);

  const handleJoinCommunity = (communityId) => {
    console.log('Joining community:', communityId);
    // TODO: Implement join functionality
  };

  const CommunityCard = ({ community, showJoinButton = false }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={community.image}
        alt={community.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{community.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{community.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {community.members.toLocaleString()} members
          </span>
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {community.posts.toLocaleString()} posts
          </span>
        </div>
        {showJoinButton ? (
          <Button
            variant="primary"
            fullWidth
            onClick={() => handleJoinCommunity(community.id)}
          >
            Join Community
          </Button>
        ) : (
          <Button variant="secondary" fullWidth>
            View Community
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Communities</h1>
          <p className="text-gray-600">
            Connect with collectors who share your interests
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('discover')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'discover'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discover Communities
            </button>
            <button
              onClick={() => setActiveTab('my-communities')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'my-communities'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Communities ({myCommunities.length})
            </button>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'discover'
            ? discoverCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  showJoinButton={true}
                />
              ))
            : myCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
        </div>

        {/* Empty State */}
        {activeTab === 'my-communities' && myCommunities.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No communities yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Join your first community to get started!
            </p>
            <div className="mt-6">
              <Button variant="primary" onClick={() => setActiveTab('discover')}>
                Discover Communities
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CommunitiesPage;
