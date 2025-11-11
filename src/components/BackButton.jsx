import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute cursor-pointer top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[hsl(var(--brand-end))] transition-colors z-30"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
};

export default BackButton;
