import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-700 to-slate-900">
      <h1 className="text-[180px] font-extrabold text-white tracking-widest animate-bounce">
        404
      </h1>

      {/* Page Not Found Badge */}
      <div className="bg-blue-700 text-white px-4 py-2 text-2xl rounded-md rotate-12 absolute transform -translate-y-20 shadow-lg ">
        Page Not Found
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

export default Error;