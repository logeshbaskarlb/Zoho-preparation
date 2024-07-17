import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId'); // Assuming you store the userId in localStorage

  useEffect(() => {
    if (!userId) {
      navigate('/');
    } else {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/profile/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      age: user?.age || '',
      gender: user?.gender || '',
      dob: user?.dob || '',
      mobile: user?.mobile || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:5000/profile/${userId}`, values);
        alert('Profile updated successfully');
      } catch (error) {
        console.log('Error updating profile:', error);
        alert('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            className="mt-1 p-2 border rounded w-full"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            className="mt-1 p-2 border rounded w-full"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="mt-1 p-2 border rounded w-full"
            value={formik.values.dob}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="mt-1 p-2 border rounded w-full"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
