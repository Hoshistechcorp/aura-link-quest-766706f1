import { Outlet } from "react-router-dom";
import TourismHeader from "./TourismHeader";
import TourismFooter from "./TourismFooter";

const TourismLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TourismHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <TourismFooter />
    </div>
  );
};

export default TourismLayout;
