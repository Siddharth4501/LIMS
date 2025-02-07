// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Denied = () => {
//   const navigate = useNavigate();
//   return (
//     <main className="h-screen w-full flex flex-col justify-center items-center bg-slate-600">
//       <h1 className="text-9xl font-extrabold text-white tracking-widest">
//         403
//       </h1>
//       <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
//         Access Denied
//       </div>
//       <button className="mt-5">
//         <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
//           <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

//           <span
//             onClick={() => navigate(-1)}
//             className="relative block px-8 py-3 bg-blue-900 border border border-current"
//           >
//             Go Back
//           </span>
//         </a>
//       </button>
//     </main>
//   );
// };

// export default Denied;



import React from "react";
import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-700 to-slate-900">
      {/* 403 Text */}
      <h1 className="text-[180px] font-extrabold text-white tracking-widest animate-bounce">
        403
      </h1>

      {/* Access Denied Badge */}
      <div className="bg-red-700 text-white px-4 py-2 text-2xl rounded-md rotate-12 absolute transform -translate-y-20 shadow-lg">
        Access Denied
      </div>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 relative inline-block text-lg font-semibold text-[#FF6A3D] group focus:outline-none"
      >
        <span className="absolute inset-0 bg-[#FF6A3D] rounded-lg transform transition-transform group-hover:scale-105 group-active:scale-95 opacity-20" />
        <span className="relative block px-8 py-3 bg-blue-900 border border-[#FF6A3D] rounded-lg hover:bg-blue-800 transition-colors">
          Go Back
        </span>
      </button>
    </main>
  );
};

export default Denied;