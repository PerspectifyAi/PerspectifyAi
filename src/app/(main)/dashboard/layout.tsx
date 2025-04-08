import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

const Layout: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 -mt-[90px] pb-10 animate-fadeIn">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-sm pl-6 sm:pl-8 md:pl-10 cursor-pointer">
          Dashboard
        </h1>
      </header>

      {/* Suspense Loading Fallback */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center mt-6">
            <BarLoader width="100%" color="#9333ea" />
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default Layout;
