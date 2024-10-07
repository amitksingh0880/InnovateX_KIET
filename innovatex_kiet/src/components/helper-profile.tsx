import React, { useState } from 'react';

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
}

interface ProfileProps {
  name: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: number;
  college: string;
  profileImage: string;
  level: number;
  experiences: Experience[];
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  registerNumber,
  degree,
  batch,
  college,
  profileImage,
  level,
  experiences,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: experiences.length + 1,
    company: '',
    role: '',
    duration: '',
  });

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleAddExperience = () => {
    experiences.push(newExperience);
    setNewExperience({
      id: experiences.length + 1,
      company: '',
      role: '',
      duration: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8 overflow-hidden transform transition-transform duration-500 hover:scale-105">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Profile Dashboard</h2>
          <p className="text-sm text-gray-500">Last Updated on 22/09/2024 | 04:18 PM</p>
        </div>
        
        {/* Banner & Profile Image */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg"></div>
          <div className="absolute -bottom-16 left-8 w-32 h-32">
            <img
              src={profileImage}
              alt={name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="mt-20 text-center">
          <h3 className="text-4xl font-extrabold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{email}</p>
          
          {/* Profile Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">Register Number:</p>
              <p className="mt-1 text-lg">{registerNumber}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">Degree:</p>
              <p className="mt-1 text-lg">{degree}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">Batch:</p>
              <p className="mt-1 text-lg">{batch}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">College:</p>
              <p className="mt-1 text-lg">{college}</p>
            </div>
          </div>
          
          {/* Level and Skill Progress */}
          <div className="mt-10 flex justify-center items-center space-x-8">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">Beginner</span>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-800">Level {level}</span>
              <p className="text-xs text-gray-500">of 5</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-12 text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience</h3>
            <ul>
              {experiences.map((exp) => (
                <li key={exp.id} className="mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="text-lg font-semibold">{exp.role}</p>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.duration}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            {isEditing ? (
              <div className="mt-6">
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  value={newExperience.role}
                  onChange={handleExperienceChange}
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration"
                  className="mb-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  value={newExperience.duration}
                  onChange={handleExperienceChange}
                />
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700"
                  onClick={handleAddExperience}
                >
                  Add Experience
                </button>
              </div>
            ) : (
              <button
                className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-lg shadow hover:bg-indigo-600"
                onClick={() => setIsEditing(true)}
              >
                Add New Experience
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
