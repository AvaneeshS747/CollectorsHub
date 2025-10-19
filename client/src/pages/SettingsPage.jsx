import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Button from '../components/common/Button.jsx';
import InputField from '../components/common/InputField.jsx';

// Mock data for current user settings
const mockUserSettings = {
  username: 'CoinCollector22',
  email: 'c.collector@example.com',
  bio: 'Numismatist specializing in Roman currency. Sharing my passion for history, one coin at a time.',
  avatarUrl: 'https://placehold.co/150x150/a3e635/ffffff?text=C',
  notifications: {
    likes: true,
    comments: true,
    newFollowers: true,
    mentions: false,
  },
};

/**
 * The Settings page.
 * Allows users to update their profile, account, and notification settings.
 */
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(mockUserSettings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving settings:', formData);
    alert('Settings saved successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <div className="flex items-center space-x-4 mb-6">
              <img src={formData.avatarUrl} alt="User Avatar" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <Button variant="secondary">Change Avatar</Button>
                <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <div className="mt-4">
               <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
               <textarea
                id="bio"
                name="bio"
                rows={3}
                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 'account':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
              <InputField
                label="Current Password"
                type="password"
                name="currentPassword"
                placeholder="••••••••"
              />
              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                 placeholder="••••••••"
              />
               <InputField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                 placeholder="••••••••"
              />
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <div className="space-y-4">
              {Object.keys(formData.notifications).map(key => (
                <div key={key} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <label htmlFor={key} className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id={key} name={key} className="sr-only" checked={formData.notifications[key]} onChange={handleNotificationChange} />
                      <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
             <style>{`
                input:checked ~ .dot {
                  transform: translateX(150%);
                  background-color: #4f46e5;
                }
                 input:checked ~ .block {
                  background-color: #a5b4fc;
                }
              `}</style>
          </div>
        );
      default:
        return null;
    }
  };

  const TabButton = ({ name, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === name ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Settings</h1>
        <div className="w-full max-w-4xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left-side Navigation */}
          <aside className="lg:col-span-3 mb-6 lg:mb-0">
            <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
              <TabButton name="profile" label="Profile" />
              <TabButton name="account" label="Account" />
              <TabButton name="notifications" label="Notifications" />
            </nav>
          </aside>

          {/* Right-side Content */}
          <div className="lg:col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                {renderContent()}
                <div className="mt-8 border-t pt-6 flex justify-end">
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;

