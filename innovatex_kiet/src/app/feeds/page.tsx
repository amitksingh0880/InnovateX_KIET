"use client";
import { useEffect, useState } from 'react';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import CreatePost from '@/components/create-post';

interface FeedItem {
  id: string;
  content: string;
  createdAt: string;
  images: string[];
  title: string;
  updatedAt: string;
  upvotes: string[];
  isUpvoted?: boolean;
  isSaved?: boolean;
}

const DashboardPage = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch feed data');
        const data: { data: FeedItem[] } = await res.json(); // Ensure the response is typed
        setFeed(data.data); // Assuming your API response has a "data" field
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load feed. Please try again later.');
      }
    };

    fetchFeed();
  }, []);

  const handleUpvote = (postId: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        const updatedUpvotes = post.isUpvoted ? post.upvotes.slice(0, -1) : [...post.upvotes, 'You'];
        return { ...post, upvotes: updatedUpvotes, isUpvoted: !post.isUpvoted };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: FeedItem) => {
    setFeed([newPost, ...feed]);
  };

  const handleSave = (postId: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:text-white dark:bg-gray-900">
      <div className="h-1/4 p-6">
        <CreatePost onCreate={handleCreatePost} />
      </div>

      <div className="h-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Feed</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
          {feed
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(post => (
              <div key={post.id} className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all dark:text-white dark:bg-gray-900 dark:border border-white">
                <div className="flex items-center mb-3 dark:text-white dark:bg-gray-900">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${post.title}&background=random`} alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h2 className="font-semibold text-lg">{post.title}</h2>
                    <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font">{post.content}</h2>
                </div>
                {post.images.length > 0 && (
                  <div className="mb-4">
                    <img src={post.images[0]} alt="Post Image" className="w-full h-64 object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className={`flex items-center ${post.isUpvoted ? 'text-red-500' : 'text-gray-500'} mr-4`}
                      aria-label={post.isUpvoted ? 'Remove upvote' : 'Upvote'}
                    >
                      <FiHeart className="mr-1" /> {post.isUpvoted ? 'Upvoted' : 'Upvote'}
                    </button>

                    <div className="flex -space-x-2">
                      {post.upvotes.slice(0, 3).map((upvoter) => (
                        <img
                          key={upvoter}
                          src={`https://ui-avatars.com/api/?name=${upvoter}&background=random`}
                          alt={upvoter}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          title={upvoter}
                        />
                      ))}
                      {post.upvotes.length > 3 && (
                        <span className="text-sm text-gray-500 pl-3">+{post.upvotes.length - 3} others</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSave(post.id)}
                      className={`flex items-center ${post.isSaved ? 'text-blue-500' : 'text-gray-500'}`}
                      aria-label={post.isSaved ? 'Unsave post' : 'Save post'}
                    >
                      <FiBookmark className="mr-1" /> {post.isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
