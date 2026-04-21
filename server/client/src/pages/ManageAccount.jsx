import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Form states
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfileData({
                name: parsedUser.name || '',
                email: parsedUser.email || '',
                phoneNumber: parsedUser.phoneNumber || ''
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError('File size too large (max 2MB)');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Photo = reader.result;
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/profile/photo', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ profilePhoto: base64Photo })
                });

                const data = await response.json();
                if (response.ok) {
                    const updatedUser = { ...user, profilePhoto: data.profilePhoto };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setMessage('Photo updated successfully');
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to upload photo');
            } finally {
                setLoading(false);
            }
        };
    };

    const updatePersonalInfo = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage('');
            setError('');
            const response = await fetch('http://localhost:8080/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setMessage('Profile updated successfully');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const changeUserPassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setMessage('');
            setError('');
            const response = await fetch('http://localhost:8080/api/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password changed successfully');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:8080/api/profile/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ password: deletePassword })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                window.location.reload();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete account');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold border-b border-gray-700 pb-4">Manage Account</h1>

                {message && <div className="bg-green-600/20 text-green-400 p-4 rounded-lg border border-green-600/30">{message}</div>}
                {error && <div className="bg-red-600/20 text-red-400 p-4 rounded-lg border border-red-600/30">{error}</div>}

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Photo Section */}
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-4 flex flex-col items-center">
                        <h2 className="text-xl font-semibold w-full">Profile Photo</h2>
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 border-4 border-primary/20 flex items-center justify-center text-4xl font-bold">
                            {user.profilePhoto ? (
                                <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                (user.name?.[0]?.toUpperCase() || 'U')
                            )}
                        </div>
                        <label className="cursor-pointer bg-primary hover:bg-primary-dull px-4 py-2 rounded-lg text-sm transition">
                            Change Photo
                            <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                        </label>
                        <p className="text-gray-400 text-xs text-center">Max 2MB. JPG, PNG formats supported.</p>
                    </div>

                    {/* Personal Info Section */}
                    <div className="md:col-span-2 bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-6">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <form onSubmit={updatePersonalInfo} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Add phone number"
                                    value={profileData.phoneNumber}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary hover:bg-primary-dull px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>

                    {/* Password Section */}
                    <div className="md:col-span-2 md:col-start-2 bg-gray-800 p-6 rounded-2xl border border-gray-700 space-y-6">
                        <h2 className="text-xl font-semibold">Security & Password</h2>
                        <form onSubmit={changeUserPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
                            >
                                {loading ? 'Changing...' : 'Change Password'}
                            </button>
                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="md:col-span-2 md:col-start-2 bg-red-900/10 p-6 rounded-2xl border border-red-900/30 space-y-6">
                        <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
                        <p className="text-sm text-gray-400">Permanently delete your account and all associated data. This action cannot be undone.</p>

                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
                            >
                                Delete Account
                            </button>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Please enter your password to confirm:</label>
                                    <input
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-600 outline-none"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={loading || !deletePassword}
                                        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
                                    >
                                        Permanently Delete
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAccount;
