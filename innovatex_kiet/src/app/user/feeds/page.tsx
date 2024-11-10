// "use client";
// import { useEffect, useState } from 'react';
// import { FiHeart, FiBookmark } from 'react-icons/fi';
// import CreatePost from '@/components/create-post';
// import PrivateRoute from '@/components/privateRoute';
// import { useSelector } from 'react-redux'; // Import useSelector
// import { RootState } from '@/lib/Redux/store';

// interface FeedItem {
//   _id: string;
//   username: string;
//   content: string;
//   createdAt: string;
//   images: string[];
//   title: string;
//   updatedAt: string;
//   upvotes: (string | null)[];
//   isUpvoted?: boolean;
//   isSaved?: boolean;
// }

// const DashboardPage = () => {
//   const [feed, setFeed] = useState<FeedItem[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   // Get username from Redux
//   const username = useSelector((state: RootState) => state.user.username);
//   const userId = useSelector((state: RootState) => state.user.userId);
//   // console.log("user=="+username);


//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const res = await fetch('/api/posts');
//         if (!res.ok) throw new Error('Failed to fetch feed data');
//         const data = await res.json();
//         console.log("front" + data.data.toString())
//         const formattedData = data.data.map((item: any) => ({
//           ...item,
//           createdAt: new Date(item.createdAt).toLocaleString(),
//           updatedAt: new Date(item.updatedAt).toLocaleString(),
//         }));
//         console.log("Formatted Data:", formattedData);
//         setFeed(data.data);
//       } catch (error) {
//         console.error('Error:', error);
//         setError('Failed to load feed. Please try again later.');
//       }
//     };

//     fetchFeed();
//   }, []);

//   interface UpvoteResponse {
//     upvotes: (string | null)[];
//   }

//   const handleUpvote = async (postId: string, userId: string) => {
//     const response = await fetch('/api/posts/upvote', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ postId, userId }),
//     });

//     if (response.ok) {
//         const { upvotes }: UpvoteResponse = await response.json();

//         // Check if the upvotes array is empty and set isUpvote accordingly
//         const isUpvote = upvotes.length === 0; // Set to true if upvotes are empty

//         // Update your UI state with the new upvotes
//         setFeed(feed.map(post =>
//             post._id === postId ? { ...post, upvotes, isUpvote } : post
//         ));
//     } else {
//         console.error('Failed to upvote', await response.json());
//     }
// };




//   const handleCreatePost = (newPost: FeedItem) => {
//     setFeed([newPost, ...feed]);
//   };

//   const handleSave = (postId: string) => {
//     setFeed(feed.map(post => {
//       if (post._id === postId) {
//         return { ...post, isSaved: !post.isSaved };
//       }
//       return post;
//     }));
//   };

//   return (
//     <PrivateRoute>
//       <div className="flex flex-col bg-gray-100 dark:text-white dark:bg-gray-900">
//         <div className="h-1/4 p-6">
//           <CreatePost onCreate={handleCreatePost} />
//         </div>

//         <div className="h-3/4 p-6">
//           <h1 className="text-2xl font-bold mb-4">Feed</h1>
//           {error && <p className="text-red-500">{error}</p>}
//           <div className="space-y-6">
//             {feed
//               .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//               .map(post => (
//                 <div key={post._id} className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all dark:text-white dark:bg-gray-900 dark:border border-white">
//                   <div className="flex items-center mb-3 dark:text-white dark:bg-gray-900">
//                     <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
//                       <img src={`https://ui-avatars.com/api/?name=${post.username}&background=random`} alt="User Avatar" className="w-full h-full object-cover" />
//                     </div>
//                     <div className="ml-4">
//                       <h2 className="font-semibold text-lg">{post.username}</h2> {/* Display username here */}
//                       <h3 className="font-medium text-md">{post.title}</h3> {/* Display post title here */}
//                       <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleTimeString()}</span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mb-3">
//                     <h2 className="font">{post.content}</h2>
//                   </div>
//                   {post.images.length > 0 && (
//                     <div className="mb-4">
//                       <img src={post.images[0]} alt="Post Image" className="w-full h-64 object-cover rounded-lg" />
//                     </div>
//                   )}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => userId && handleUpvote(post._id, userId)}
//                         className={`flex items-center ${post.isUpvoted ? 'text-red-500' : 'text-gray-500'} mr-4`}
//                         aria-label={post.isUpvoted ? 'Remove upvote' : 'Upvote'}
//                       >
//                         <FiHeart className="mr-1" /> {post.isUpvoted ? 'Upvoted' : 'Upvote'}
//                       </button>

//                       <div className="flex -space-x-2">
//                         {post.upvotes.slice(0, 3).map((upvoter) => (
//                           <img
//                             key={upvoter}
//                             src={`https://ui-avatars.com/api/?name=${upvoter}&background=random`}
//                             alt={upvoter ?? 'Unknown'}
//                             className="w-8 h-8 rounded-full border-2 border-white"
//                             title={upvoter ?? 'Unknown'}
//                           />
//                         ))}
//                         {post.upvotes.length > 3 && (
//                           <span className="text-sm text-gray-500 pl-3">+{post.upvotes.length - 3} others</span>
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <button
//                         onClick={() => handleSave(post._id)}
//                         className={`flex items-center ${post.isSaved ? 'text-blue-500' : 'text-gray-500'}`}
//                         aria-label={post.isSaved ? 'Unsave post' : 'Save post'}
//                       >
//                         <FiBookmark className="mr-1" /> {post.isSaved ? 'Saved' : 'Save'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// };

// export default DashboardPage;

"use client";
import { useEffect, useState } from 'react';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import CreatePost from '@/components/create-post';
import PrivateRoute from '@/components/privateRoute';
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '@/lib/Redux/store';
import { useRouter } from 'next/navigation';


interface FeedItem {
  _id: string;
  author: string;
  username: string;
  content: string;
  createdAt: string;
  images: string[];
  title: string;
  updatedAt: string;
  upvotes: (string | null)[]; 
  isUpvoted?: boolean;
  isSaved?: boolean;
}

const DashboardPage = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [author, setAuthor] = useState<string | null>(null);

  // Get username and userId from Redux
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.userId);
  
  const router = useRouter();  // Use the useRouter hook for navigation

  // Fetch feed data
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch feed data');
        const data = await res.json();
        console.log(data);
        const formattedData = data.data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleString(),
          updatedAt: new Date(item.updatedAt).toLocaleString(),
        }));
        setFeed(formattedData);
        // const authorId = data.data.author;
        // setAuthor(authorId);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load feed. Please try again later.');
      }
    };

    fetchFeed();
  }, []);

  interface UpvoteResponse {
    upvotes: (string | null)[];
  }

  const handleUpvote = async (postId: string, userId: string) => {
    const response = await fetch('/api/posts/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, userId }),
    });

    if (response.ok) {
      const { upvotes }: UpvoteResponse = await response.json();
      const isUpvote = upvotes.length === 0; // Set to true if upvotes are empty
      setFeed(feed.map(post =>
        post._id === postId ? { ...post, upvotes, isUpvote } : post
      ));
    } else {
      console.error('Failed to upvote', await response.json());
    }
  };

  const handleCreatePost = (newPost: FeedItem) => {
    setFeed([newPost, ...feed]);
  };

  const handleSave = (postId: string) => {
    setFeed(feed.map(post => {
      if (post._id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
  };

  // Handle profile click (save userId in sessionStorage and navigate)
  const handleProfileClick = (UserId: string) => {
    sessionStorage.setItem('profileUserId', UserId);  // Store the profile userId in sessionStorage
    router.push(`/user/${UserId}/profile`);  // Navigate to the user's profile page
  };

  return (
    <PrivateRoute>
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
                <div key={post._id} className="p-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-all dark:text-white dark:bg-gray-900 dark:border border-white">
                  <div className="flex items-center mb-3 dark:text-white dark:bg-gray-900">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${post.username}&background=random`} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover" 
                        onClick={() => handleProfileClick(post.author)} // Handle profile click
                      />
                    </div>
                    <div className="ml-4">
                      <h2 
                        className="font-semibold text-lg cursor-pointer"
                        onClick={() => handleProfileClick(post.author)} // Handle profile click
                      >
                        {post.username}
                      </h2> 
                      <h3 className="font-medium text-md">{post.title}</h3> 
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
                        onClick={() => userId && handleUpvote(post._id, userId)}
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
                            alt={upvoter ?? 'Unknown'}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={upvoter ?? 'Unknown'}
                          />
                        ))}
                        {post.upvotes.length > 3 && (
                          <span className="text-sm text-gray-500 pl-3">+{post.upvotes.length - 3} others</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleSave(post._id)}
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
    </PrivateRoute>
  );
};

export default DashboardPage;
