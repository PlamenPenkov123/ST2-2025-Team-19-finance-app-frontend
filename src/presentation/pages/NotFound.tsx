import { useNavigate } from "@solidjs/router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div class="w-full min-h-screen bg-white flex items-center justify-center p-4">
            <div class="bg-[#f8faf8] w-full max-w-2xl rounded-2xl shadow-md p-10 text-center space-y-6 border border-[#E2E8E2]">
                <svg
                    class="mx-auto h-20 w-20 text-[#C9DABD]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                    />
                </svg>

                <h2 class="text-3xl font-bold text-gray-800">Page Not Found</h2>
                <p class="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                    Oops! The page you’re looking for doesn’t exist or may have been moved.
                    Let’s get you back on track.
                </p>

                <button
                    class="bg-[#C9DABD] text-gray-800 cursor-pointer px-8 py-3 rounded-lg hover:bg-[#b7cba9] transition font-semibold shadow-sm"
                    onClick={() => navigate("/")}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}
