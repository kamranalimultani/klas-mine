'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    if (!formData.currentPassword || !formData.newPassword) {
      setError('Please fill all the fields.');
      return;
    }

    setLoading(true);

    try {
      // API call example - change this according to your backend
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      } else {
        setSuccess('Password changed successfully!');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div
  className="h-full flex items-center justify-center w-full"
>
  <form
    onSubmit={handleSubmit}
    className="w-[540px] mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
  >
    <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>

    {error && <p className="mb-4 text-red-600">{error}</p>}
    {success && <p className="mb-4 text-green-600">{success}</p>}

    {/* Current Password */}
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">Current Password</label>
      <div className="relative">
        <input
          type={showPassword.current ? 'text' : 'password'}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          onClick={() => toggleVisibility('current')}
        >
          {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>

    {/* New Password */}
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">New Password</label>
      <div className="relative">
        <input
          type={showPassword.new ? 'text' : 'password'}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          onClick={() => toggleVisibility('new')}
        >
          {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>

    {/* Confirm New Password */}
    <div className="mb-6">
      <label className="block text-gray-700 mb-1">Re-Enter New Password</label>
      <div className="relative">
        <input
          type={showPassword.confirm ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter new password"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          onClick={() => toggleVisibility('confirm')}
        >
          {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[18px] font-medium py-2 rounded-md hover:opacity-90 transition ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Changing...' : 'Change Password'}
    </button>
  </form>
</div>

  );
}
