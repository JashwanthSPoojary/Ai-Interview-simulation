import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const QuitModal = ({toggle,setToggle}:{toggle:boolean,setToggle:Dispatch<SetStateAction<boolean>>}) => {
  if (!toggle) return null;
  const router = useRouter(); 
  const [loading,setLoading] = useState<boolean>(false);
  const handleQuit = () => {
    setLoading(true);
    try {
      router.push('/');
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#040606ee] bg-opacity-10 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <LogOut className="w-10 h-10 text-black mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">
          Are you sure you want to quit the Interview session ?
        </h2>
        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={()=>setToggle(false)} 
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
            Cancel
          </button>
          <button 
            onClick={handleQuit} 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black transition cursor-pointer">
            {loading?<Loader className="animate-spin"/>:"Quit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuitModal;
