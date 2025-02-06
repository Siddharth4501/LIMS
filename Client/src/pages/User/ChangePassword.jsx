import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData=JSON.parse(localStorage.getItem('userData') || '{}');
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // function to handle input box change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    // validating the password using regex
    if (
      !userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      toast.error(
        "Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(changePassword(userPassword));

    // clearing the input fields
    setUserPassword({
      oldPassword: "",
      newPassword: "",
    });

    // redirecting to profile page if password changed
    if (res.payload.success) navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
    {/* forget password card */}
    <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center gap-6 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_5px_black] border border-blue-600 border-2 bg-gray-300"
    >
        <h1 className="text-center text-2xl font-bold">Change Password</h1>

        <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold" htmlFor="oldPassword">
            Old Password
        </label>
        <input
            required
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter your old password"
            className="bg-gray-100 px-2 py-1 border-2 border-blue-600"
            value={userPassword.oldPassword}
            onChange={handlePasswordChange}
        />
        </div>

        <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold" htmlFor="newPassword">
            New Password
        </label>
        <input
            required
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter your new password"
            className="bg-gray-100 px-2 py-1 border-blue-600 border-2 outline-0"
            value={userPassword.newPassword}
            onChange={handlePasswordChange}
        />
        </div>
        {
          UserData?.roles.some((role)=>role.designation==='Admin')?(
            <Link to={"/Admin/Home"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                <AiOutlineArrowLeft /> <span className="font-semibold underline">Back to Profile</span>
            </p>
            </Link>
          ):
          (
            <Link to={"/"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                <AiOutlineArrowLeft /> <span className="font-semibold underline">Back to Profile</span>
            </p>
            </Link>
          )
        }

        <button
        className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-lg cursor-pointer"
        type="submit"
        >
        Change Password
        </button>
    </form>
    </div>

  );
};

export default ChangePassword;