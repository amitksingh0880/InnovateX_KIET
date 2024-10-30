import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/post';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { postId, userId } = await req.json(); // Parse the request body

    try {
        const post = await Post.findById(postId);

        if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const hasUpvoted = post.upvotes.includes(userObjectId);

        let updatedUpvotes;

        if (hasUpvoted) {
            // Remove userObjectId from upvotes if already upvoted
            updatedUpvotes = post.upvotes.filter((id: mongoose.Types.ObjectId) => !id.equals(userObjectId));
        } else {
            // Add userObjectId to upvotes if not already present
            updatedUpvotes = [...post.upvotes, userObjectId];
        }

        post.upvotes = updatedUpvotes;
        await post.save(); // Save updated post

        return NextResponse.json({ success: true, upvotes: post.upvotes });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating upvotes', error }, { status: 500 });
    }
}
