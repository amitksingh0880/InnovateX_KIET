"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrivateRoute from '@/components/privateRoute';
import Image from 'next/image';
import profileImage from '@/public/assests/authImage/school-supplies-with-laptop-tablet.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/Redux/store';

interface Experience {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface ProfileData {
    username: string;
    email: string;
    registerNumber: string;
    degree: string;
    batch: number;
    college: string;
    level: number;
    experiences: Experience[];
    userId: string;
}

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [newExperience, setNewExperience] = useState<Experience>({
        id: 0,
        company: '',
        role: '',
        duration: '',
        description: '',
    });

    const [profileData, setProfileData] = useState<ProfileData>({
        username: '',
        email: '',
        registerNumber: '',
        degree: '',
        batch: 0,
        college: '',
        level: 0,
        experiences: [],
        userId: '',
    });

    const [validationError, setValidationError] = useState<string | null>(null);
    const loggedInUserId = useSelector((state: RootState) => state.user.userId);
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID not found in URL');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile?userId=${userId}`);
                if (!res.ok) throw new Error('Failed to fetch profile data');
                const data = await res.json();
                setProfile(data);
                setProfileData(data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load profile. Please try again later.');
            }
        };

        fetchProfile();
    }, [userId]);

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExperience({ ...newExperience, [name]: value });
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleAddExperience = async () => {
        if (!profile) {
            setError('Profile data is not loaded yet. Please wait and try again.');
            return;
        }

        if (!newExperience.company || !newExperience.role || !newExperience.duration || !newExperience.description) {
            setValidationError('Please fill out all fields before submitting.');
            return;
        }

        setValidationError(null);

        try {
            const updatedProfile = {
                ...profile,
                experiences: [...profile.experiences, newExperience],
            };
            setProfile(updatedProfile);

            // Update backend
            const res = await fetch(`/api/profile?userId=${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ experiences: updatedProfile.experiences }),
            });
            if (!res.ok) throw new Error('Failed to update profile');

            setIsEditing(false);
            setNewExperience({ id: 0, company: '', role: '', duration: '', description: '' });
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update profile. Please try again later.');
        }
    };

    const handleSaveProfile = async () => {
        try {
            const res = await fetch(`/api/profile?userId=${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });

            if (!res.ok) {
                throw new Error('Failed to update profile');
            }

            setIsEditingProfile(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update profile. Please try again later.');
        }
    };

    const isOwner = profile?.userId === loggedInUserId;

    return (
        <PrivateRoute>
            <div className="flex flex-col lg:w-[1280px] w-auto bg-gray-100 dark:text-white dark:bg-gray-900">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
                        <p className="text-sm text-gray-500">Last Updated on 22/09/2024 | 04:18 PM</p>
                    </div>

                    <div className="relative">
                        <div className="h-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg"></div>
                        <div className="absolute -bottom-16 left-8 w-32 h-32">
                            <Image
                                src={profileImage}
                                alt="Profile Image"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-20">
                        {isEditingProfile ? (
                            <>
                                <div className="mb-6">
                                    <label htmlFor="username" className="block text-sm font-semibold">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={profileData.username}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="registerNumber" className="block text-sm font-semibold">Register Number</label>
                                    <input
                                        type="text"
                                        id="registerNumber"
                                        name="registerNumber"
                                        value={profileData.registerNumber}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="degree" className="block text-sm font-semibold">Degree</label>
                                    <input
                                        type="text"
                                        id="degree"
                                        name="degree"
                                        value={profileData.degree}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="batch" className="block text-sm font-semibold">Batch</label>
                                    <input
                                        type="number"
                                        id="batch"
                                        name="batch"
                                        value={profileData.batch}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="college" className="block text-sm font-semibold">College</label>
                                    <input
                                        type="text"
                                        id="college"
                                        name="college"
                                        value={profileData.college}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="level" className="block text-sm font-semibold">Level</label>
                                    <input
                                        type="number"
                                        id="level"
                                        name="level"
                                        value={profileData.level}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                <div className="mb-6">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="w-full p-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <p className="text-xl font-semibold">{profile?.username}</p>
                                <p className="text-sm">{profile?.email}</p>
                                <p className="mt-4 text-sm">{profile?.registerNumber}</p>
                                <p className="text-sm">{profile?.degree}</p>
                                <p className="text-sm">{profile?.batch}</p>
                                <p className="text-sm">{profile?.college}</p>
                                <p className="text-sm">{profile?.level}</p>

                                {!isOwner && (
                                    <button
                                        onClick={() => setIsEditingProfile(true)}
                                        className="mt-6 p-2 bg-green-500 text-white rounded-lg"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default ProfilePage;
