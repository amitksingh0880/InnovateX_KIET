import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Post from '@/models/post';
import User from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// Database connection
const connectDB = async () => {
    const uri = process.env.MONGODB_URI || '';
    if (mongoose.connections[0].readyState) return;
    if (!uri) {
        throw new Error('MONGODB_URI environment variable not defined');
    }
    await mongoose.connect(uri);
};

// Define types for request body
interface PostBody {
    userId: string;
    title: string;
    content: string;
    images?: string[];
}

// Function to fetch username by userId
async function fetchUsernameById(author: string) {
    const user = await User.findById(author).select('name');
    console.log(user.name);
    if (!user) {
        throw new Error('User not found');
    }
    return user.name;
}

// GET handler: Fetch all posts
export async function GET() {
    try {
        await connectDB();
        const posts = await Post.find().populate('author', 'name').exec();

        // Optionally fetch usernames if not using populate
        const postsWithUsernames = await Promise.all(posts.map(async post => {
            const username = await fetchUsernameById(post.userId);  // Access userId directly
            console.log("us" + username);
            return { ...post.toObject(), username };  // Add username to the post object
        }));

        return NextResponse.json({ success: true, data: postsWithUsernames });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}


// POST handler: Create a new post
export async function POST(req: Request) {
    try {
        await connectDB();
        const body: PostBody = await req.json();
        const { userId, title, content, images } = body;

        // Check for missing fields
        if (!userId || !title || !content) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const newPost = new Post({
            userId,
            author: userId, 
            title,
            content,
            images,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newPost.save();
        return NextResponse.json({ success: true, data: newPost }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

// PUT handler: Update an existing post
export async function PUT(req: Request) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
        }
        const body: PostBody = await req.json();
        const { title, content, images } = body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, images, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedPost });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

