import { CircularProgress } from "@mui/material";

function Loader(){
  return (
    <div className="flex items-center justify-center h-full">
      <CircularProgress />
    </div>
  );
}

export default Loader;
