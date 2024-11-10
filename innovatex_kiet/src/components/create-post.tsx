import { RootState } from '@/lib/Redux/store';
import { FeedItem } from '@/types';
import { useState } from 'react';
import { FaRegImage, FaFileAlt, FaHandsHelping } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface CreatePostProps {
  onCreate: (post: FeedItem) => void;
}

const CreatePost = ({ onCreate }: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userId = useSelector((state: RootState) => state.user.userId);
  const username = useSelector((state: RootState) => state.user.username);
  console.log("User ID:", userId);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: FeedItem = {
      _id: new Date().toISOString(), // Temporary ID; consider using a UUID or letting MongoDB generate it
      author: userId || '',
      userId: userId || '',
      username: username || '', // Add a default username or fetch it from the state
      content,
      createdAt: new Date().toISOString(),
      images: [],
      title,
      updatedAt: new Date().toISOString(),
      upvotes: [],
      isUpvoted: false,
      isSaved: false,
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }
      onCreate(newPost);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-sm rounded-lg dark:text-white dark:bg-gray-900 dark:border border-white">
      <img
        src="/path/to/profile.jpg"
        alt="User"
        className="w-10 h-10 rounded-full border border-black object-cover dark:border-white"
      />
      <form onSubmit={handleSubmit} className="flex-grow ml-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 mb-2 border border-gray-300 rounded-full focus:outline-none"
        />
        <input
          type="text"
          placeholder="Start a post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
        />
      </form>
      <div className="flex items-center space-x-4 ml-4">
        <button type="button" className="flex items-center space-x-2 border border-black text-blue-500 hover:bg-blue-100 p-2 rounded-lg dark:border-white">
          <FaRegImage className="w-6 h-6" />
          <span>Media</span>
        </button>
        <button type="button" className="flex items-center space-x-2 text-purple-500 border border-black hover:bg-purple-100 p-2 rounded-lg dark:border-white">
          <FaHandsHelping className="w-6 h-6" />
          <span>Appeal</span>
        </button>
        <button type="button" className="flex items-center space-x-2 text-red-500 border border-black hover:bg-red-100 p-2 rounded-lg dark:border-white">
          <FaFileAlt className="w-6 h-6" />
          <span>Write article</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
