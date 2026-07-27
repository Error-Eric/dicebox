import Honeycomb from "components/Layout/loader";
import ChatIcon from "assets/chat.png";

export const SplashPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col space-y-6">
      <h1 className="text-3xl font-bold">dicebox</h1>
      <img src={ChatIcon} alt="chat icon" className="w-36 h-auto" />
      <h1 className="text-3xl font-bold">Social</h1>
      <Honeycomb className="m-5" color="#326fa8" />
    </div>
  );
};
