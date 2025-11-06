import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
// @ts-ignore
import { Motion } from "@motionone/solid";

export default function Profile() {
    const [user] = useUserContext();
    const navigate = useNavigate();

    onMount(() => {
        if (!user()) {
            navigate("/*");
        }
    });

    return (
        <div class="w-full min-h-[70vh] bg-white px-4 py-10 flex flex-col items-center">
            <Motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                class="w-full max-w-md md:max-w-lg bg-[#C9DABD]/10 rounded-2xl shadow-md p-8 mt-10"
            >
                {/* Header */}
                <h1 class="text-3xl font-bold text-center mb-8 text-[#C9DABD]">
                    Your Profile
                </h1>

                {/* Avatar + Basic Info */}
                <div class="flex items-center space-x-4 mb-8">
                    <div class="h-16 w-16 bg-[#C9DABD] text-white flex items-center justify-center rounded-full text-2xl font-semibold uppercase">
                        {user()?.first_name?.[0]}
                        {user()?.last_name?.[0]}
                    </div>

                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-800">
                            {user()?.first_name} {user()?.last_name}
                        </h2>
                        <p class="text-sm text-gray-600">{user()?.email}</p>
                    </div>
                </div>

                {/* User Details Grid */}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-white rounded-lg p-4 border border-[#C9DABD]/30">
                        <p class="text-gray-500 text-sm mb-1">Username</p>
                        <p class="font-medium text-gray-800 break-words">
                            {user()?.username}
                        </p>
                    </div>

                    <div class="bg-white rounded-lg p-4 border border-[#C9DABD]/30">
                        <p class="text-gray-500 text-sm mb-1">Phone Number</p>
                        <p class="font-mono text-xs text-gray-700 break-all">
                            {user()?.phone_number || "—"}
                        </p>
                    </div>

                    <div class="bg-white rounded-lg p-4 sm:col-span-2 border border-[#C9DABD]/30">
                        <p class="text-gray-500 text-sm mb-1">Account Type</p>
                        <div class="inline-block bg-[#C9DABD]/20 text-[#C9DABD] text-xs px-3 py-1 rounded-full font-medium">
                            Regular User
                        </div>
                    </div>
                </div>
            </Motion.div>
        </div>
    );
}
