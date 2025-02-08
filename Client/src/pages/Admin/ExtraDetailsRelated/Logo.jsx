import React, { useState } from 'react'
import AdminCommomNav from '../../../components/AdminCommomNav'
import AdminCommonPanel from '../../../components/AdminCommonPanel'
import { useDispatch } from 'react-redux'
import { saveLogo } from '../../../Redux/Slices/ExtraSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
};
const handleUpload = async () => {
  if (!file) return alert("Please select an image");

  const formData = new FormData();
  formData.append("logo", file);

  try {
      const res = await dispatch(saveLogo(formData));
      if(res?.payload?.success){
        toast.success("Upload Successful")
        navigate('/Admin/Home');
      }
  } catch (err) {
      toast.error("Upload failed");
  }
};
  return (
    <>
      <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
        <AdminCommomNav />
        <div className="flex">
            <AdminCommonPanel/>
            <div className='w-full'>
            <br /><br /><br /><br /><br />
                <div className='flex flex-col gap-2 w-1/2 justify-center m-auto min-h-72 border-2 bg-gray-200 border-2 border-blue-600 items-center shadow-[0_0_6px_gray]'>
                    <div className='text-xl font-semibold'>Logo<span className='text-red-500'>*</span>:</div>
                    <div className='w-full'><input type="file" placeholder='Choose Logo' accept='image/*' name='logo' className='w-3/4 flex justify-center mx-auto h-12 p-2 border-2 rounded bg-white border-blue-600 font-semibold outline-0' onChange={handleFileChange} />

                    </div>
                    {preview && <img src={preview} alt="Preview" width="200px" />}
                    <div className='mb-5'><button className='px-4 py-1 bg-indigo-700 hover:bg-indigo-900 text-white rounded-md mt-3' onClick={handleUpload}>Submit</button></div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Logo