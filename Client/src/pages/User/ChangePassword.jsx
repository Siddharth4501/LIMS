import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase, lowercase, and a number."
      );
      return;
    }

    const res = await dispatch(changePassword(userPassword));
    setUserPassword({ oldPassword: "", newPassword: "" });

    if (res.payload.success) navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-6 rounded-lg p-6 w-96 h-[28rem] shadow-lg border border-blue-500 bg-white"
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">Change Password</h1>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="oldPassword">Old Password</label>
          <input
            required
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter your old password"
            className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={userPassword.oldPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="newPassword">New Password</label>
          <input
            required
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter your new password"
            className="bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={userPassword.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <Link to={UserData?.roles?.some((role) => role.designation === "Admin") ? "/Admin/Home" : "/"}>
          <p className="text-blue-600 cursor-pointer flex items-center justify-center gap-2 hover:underline">
            <AiOutlineArrowLeft /> <span className="font-medium">Back to Profile</span>
          </p>
        </Link>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md py-2 text-white font-semibold text-lg"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;