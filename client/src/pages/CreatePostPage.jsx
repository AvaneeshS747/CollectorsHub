import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

/**
 * The Create Post page.
 * Allows authenticated users to upload an image and create a new post.
 */
const CreatePostPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for the image preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !caption) {
      alert('Please select an image and write a caption.');
      return;
    }
    // In a real application, you would handle the file upload
    // and API call to the backend here.
    console.log('Submitting post:', {
      image: imageFile.name,
      caption: caption,
    });
    alert('Post created successfully! (Check console for details)');
    // Reset form after submission
    setImageFile(null);
    setImagePreview('');
    setCaption('');
  };
  
  // SVG Icon for image upload
  const UploadIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create a New Post
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Collection Item Image
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Image preview" className="mx-auto h-48 w-auto object-contain rounded-md" />
                    ) : (
                      <UploadIcon />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Caption Area */}
              <div>
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                  Caption
                </label>
                <div className="mt-1">
                  <textarea
                    id="caption"
                    name="caption"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Tell everyone about your collection item..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
               <Button type="submit" variant="primary" fullWidth>
                Share Post
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePostPage;

