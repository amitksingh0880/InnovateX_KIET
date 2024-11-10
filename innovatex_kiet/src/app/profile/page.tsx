// app/profile/[id]/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HelperProfile from '@/components/helper-profile';

interface Helper {
    _id: string;
    name: string;
    email: string;
    requestsReceived: any[]; // Adjust this type according to your Request schema
}

const ProfilePage = () => {
    const { id } = useParams(); // Use `id` from the URL parameters
    const [helper, setHelper] = useState<Helper | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHelper = async () => {
            if (!id) return; // Ensure id is available

            try {
                const response = await fetch(`/api/users/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch helper');
                }

                const data = await response.json();
                setHelper(data);
            } catch (error: any) {
                console.error('Error fetching helper:', error);
                setError(error.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchHelper();
    }, [id]);

    if (loading) {
        return <div className="p-4">Loading helper profile...</div>; // Improved loading message
    }

    return (
        <div className="p-4">
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : helper ? (
                <HelperProfile helper={helper} />
            ) : (
                <div>User not found</div>
            )}
        </div>
    );
};

export default ProfilePage;
