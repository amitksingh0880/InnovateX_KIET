"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Profile from '@/components/helper-profile';
import PrivateRoute from '@/components/privateRoute';

interface Helper {
    _id: string;
    name: string;
    email: string;
    requestsReceived: any[];
}

const ProfilePage = () => {
    return (
        <PrivateRoute>
        <div className="flex flex-col bg-gray-100 dark:text-white dark:bg-gray-900">
                <Profile
                    name="profile"
                    email="email"
                    registerNumber="123456" 
                    degree="B.Sc" 
                    batch={2024}
                    college="XYZ University"
                    profileImage="/images/profile.jpg" 
                    level={1}
                    experiences={[]} // Add an empty array or appropriate experiences data
                />
        </div>
        </PrivateRoute>
    );
};

export default ProfilePage;