import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/config";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${config.userApi}/login`, values);
        toast.success(res.data.message, {
          position: "top-right",
        });
        navigate("/profile");
        formik.resetForm();
      } catch (error) {
        toast.error(
          error.response
            ? error.response.data.message || "Server error"
            : "Network error. Please check your connection.",
          { position: "top-center" }
        );
      }
    },
  });

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} 
      className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="johndoe@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="*********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="text-center mt-3 flex justify-between text-red-500 ">
  <div className="flex justify-center  text-white">
    <Link className="no-underline text-gray-800 hover:text-red-600" to="/signup">
      Create an Account!
    </Link>
  </div>
</div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
