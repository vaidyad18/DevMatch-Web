import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-[hsl(234_12%_12%)] hover:text-[hsl(20_95%_60%)] transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
