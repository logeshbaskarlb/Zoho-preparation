import axios from "axios";
import { useFormik } from "formik";
import { config } from "../config/config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Name is required.";
      }
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
        const res = await axios.post(`${config.userApi}/signup`, values);
        toast.success(res.data.message, {
          position: "top-right",
        });
        navigate("/");
        formik.resetForm();
        console.log(values);
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
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
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
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="*********"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>

        <p className="flex justify-center mt-2 text-white">
          <Link
            className="no-underline text-gray-800 hover:text-red-600"
            to="/"
          >
            Already have an account? Login!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
