import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  author: mongoose.Schema.Types.ObjectId;
  userId: string;  // Assuming this is a string for now
  content: string;
  title: string;
  likes: number;
  images: string[]; // Change to string array for URLs
  upvotes: mongoose.Schema.Types.ObjectId[];  // List of user ObjectIds who upvoted
  createdAt: Date;
  updatedAt: Date;
  department: string; // Consider if this is needed for your use case
}

const postSchema: Schema<IPost> = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Uncommented to ensure every post has an author
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId, // Assuming upvotes are ObjectIds
      ref: 'User', // Uncomment if you want to reference a User model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: [String], // Changed to an array of strings for image URLs
  },
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
export default Post;
