import { Metadata } from "next";
import { UserCircleIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import WatchlistSection from "./components/watchlist-section";

export const metadata: Metadata = {
  title: "Profile | Film Findr",
  description: "Your profile and watchlist",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#00050d] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/10 flex items-center justify-center">
              <UserCircleIcon className="h-12 w-12 text-gray-200" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Your Profile
              </h1>
              <p className="text-gray-400">
                Manage your preferences and watchlist
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white/5 backdrop-blur-md rounded-xl p-1 ring-1 ring-white/10 w-fit">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium transition-all duration-200">
              <BookmarkIcon className="h-4 w-4" />
              Watchlist
            </button>
            {/* Future tabs will be added here */}
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-200 opacity-50 cursor-not-allowed"
              disabled>
              Settings
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-gray-400 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-200 opacity-50 cursor-not-allowed"
              disabled>
              Reviews
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <WatchlistSection />
        </div>
      </div>
    </div>
  );
}
