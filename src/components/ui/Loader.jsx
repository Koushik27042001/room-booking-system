import { Hotel } from "@mui/icons-material";

function Loader(){

  return (

    <div className="flex items-center justify-center h-screen bg-gray-50">

      <div className="relative flex items-center justify-center">

        {/* rotating circle */}
        <div className="w-20 h-20 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></div>

        {/* icon inside */}
        <div className="absolute flex items-center justify-center">

          <Hotel className="text-3xl text-blue-600 animate-pulse"/>

        </div>

      </div>

    </div>

  );

}

export default Loader;