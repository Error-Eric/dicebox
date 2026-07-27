import { ToastContainer } from "react-toastify";
import { checkEnv } from "utils";
import AdaptiveLayout from "./adaptiveLayout";

console.log(checkEnv());

/** This component is responsible for common elements of the app */
export function Layout() {
  return (
    <div className="h-screen overflow-hidden">
      <ToastContainer />
      <AdaptiveLayout />
    </div>
  );
}
