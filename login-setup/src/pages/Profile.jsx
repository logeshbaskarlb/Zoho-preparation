import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUserDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      age: user.age || '',
      gender: user.gender || '',
      dob: user.dob || '',
      mobile: user.mobile || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.put('/profile', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Profile updated successfully")
      } catch (error) {
        console.error("Error updating profile", error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-5">Profile</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            className="w-full px-3 py-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            className="w-full px-3 py-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.gender}
          />
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="w-full px-3 py-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
        </div>
        <div>
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="w-full px-3 py-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.mobile}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
