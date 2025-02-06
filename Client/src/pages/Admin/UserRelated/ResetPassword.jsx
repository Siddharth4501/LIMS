import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../Redux/Slices/AuthSlice";

const ResetPassword = () => {
  const {state}=useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    cnfPassword: "",
    userId:state._id,
  });

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check the empty field
    if (!data.password || !data.cnfPassword || !data.userId ){
      toast.error("All fields are mandatory");
      return;
    }

    // password validation using regex
    if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // matching the password
    if (data.password !== data.cnfPassword) {
      toast.error("Both password should be same");
      return;
    }

    // calling the api to reset password
    const res = await dispatch(resetPassword(data));

    // redirecting to the login page
    if (res.payload.success) {
      navigate("/Admin/User/UserList");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">

        {/* forget password container */}
        <div
          onSubmit={handleFormSubmit}
          className="flex items-center justify-center h-screen"
        >
          {/* forget password card */}
          <form className="flex flex-col justify-center gap-6 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_7px_black] bg-gray-200 border-2 border-blue-600">
            <h1 className="text-center text-2xl font-bold">Reset Password</h1>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="email">
                New Password
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                className="px-2 py-1 border-2 border-blue-600 outline-0"
                value={data.password}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg font-semibold" htmlFor="cnfPassword">
                Confirm New Password
              </label>
              <input
                required
                type="password"
                name="cnfPassword"
                id="cnfPassword"
                placeholder="Confirm your new password"
                className="px-2 py-1 border-2 border-blue-600 outline-0"
                value={data.cnfPassword}
                onChange={handleUserInput}
              />
            </div>

            <button
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
    </div>
  
  );
};

export default ResetPassword;
