import {A, useNavigate} from "@solidjs/router";
import {useUserContext} from "../../context/UserContext";
import {LoginModal} from "../modals/LoginModal";
import {createSignal} from "solid-js";
import {TopCenterPopup} from "../components/general-components/TopCenterPopup";

export default function Home() {
    const navigate = useNavigate();
    const [user] = useUserContext();
    const [isLoginOpen, setIsLoginOpen] = createSignal<true | undefined>(undefined);
    const [popupState, setPopupState] = createSignal<{ text: string; error?: boolean } | null>(null);

    return (
        <div class="w-full bg-[#F8FAF8] text-gray-800">
            <TopCenterPopup state={popupState()} onClose={() => setPopupState(null)} />
            <LoginModal
                state={isLoginOpen()}
                onSuccess={() => {
                    setIsLoginOpen(undefined);
                    setPopupState({ text: "You logged in successfully!" });
                    navigate("/");
                }}
                onClose={() => setIsLoginOpen(undefined)}
            />
            {/* Hero Section */}
            <section class="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
                <img
                    class="w-full h-[90vh] object-cover absolute top-0 left-0"
                    src="/home.jpg"
                    alt="Finance background"
                />
                <div class="absolute inset-0 bg-black/70"></div>

                <div class="relative z-10 text-center px-6 max-w-3xl">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                        Take Control of Your Finances with{" "}
                        <span class="text-[#C9DABD]">Flow</span>
                    </h1>
                    <p class="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed">
                        Track your expenses, monitor your income, and visualize your spending with a
                        clear and intuitive dashboard. Flow empowers you to make confident,
                        smarter financial decisions.
                    </p>
                    <div
                        onClick={() => {
                            if(user()) {
                                navigate("/finance-manager");
                            }
                            else {
                                setIsLoginOpen(true);
                            }
                        }}
                        class="inline-block bg-[#C9DABD] hover:bg-[#b7cba9] text-gray-900 cursor-pointer font-semibold py-3 px-8 rounded-lg text-base sm:text-lg shadow-md transition-all duration-200"
                    >
                        Get Started
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section class="py-20 px-6 bg-white">
                <div class="max-w-6xl mx-auto text-center space-y-10">
                    <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">
                        A Smarter Way to Manage Your Money
                    </h2>
                    <p class="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Flow isn’t just another finance tracker — it’s your personal budgeting
                        assistant. With effortless tools to track expenses, manage income, and
                        stay aligned with your goals, you’ll always know where your money stands.
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
                        <div class="bg-[#F8FAF8] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                            <div class="bg-[#C9DABD]/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-7 w-7 text-[#708B75]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 10h11m0 0V3m0 7l8 8"
                                    />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-[#708B75]">
                                Track Expenses
                            </h3>
                            <p class="text-gray-600">
                                Easily log your daily expenses and gain insights into your spending
                                habits with beautiful visual summaries.
                            </p>
                        </div>

                        <div class="bg-[#F8FAF8] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                            <div class="bg-[#C9DABD]/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-7 w-7 text-[#708B75]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 8c-3.313 0-6 1.79-6 4s2.687 4 6 4 6-1.79 6-4-2.687-4-6-4Zm0 0v8"
                                    />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-[#708B75]">
                                Monitor Income
                            </h3>
                            <p class="text-gray-600">
                                Keep your income sources organized and stay aware of how each
                                contributes to your overall balance.
                            </p>
                        </div>

                        <div class="bg-[#F8FAF8] rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                            <div class="bg-[#C9DABD]/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-7 w-7 text-[#708B75]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 12h16M4 16h10M4 8h16"
                                    />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-[#708B75]">
                                Stay on Budget
                            </h3>
                            <p class="text-gray-600">
                                Set smart spending limits and let Flow guide you toward a stable,
                                well-balanced financial plan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section class="py-20 px-6 bg-[#F8FAF8]">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                    Our Certifications
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-5/6 mx-auto">
                    {/* Data Security */}
                    <div class="bg-white border border-[#E2E8E2] rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                        <div class="bg-[#C9DABD]/30 rounded-full p-4 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-[#708B75]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 11c.943 0 1.714-.771 1.714-1.714v-.572C13.714 7.01 12 6 12 6s-1.714 1.01-1.714 2.714v.572C10.286 10.229 11.057 11 12 11Zm0 0v1.714m0 0h.009M12 12.714h-.009M5.25 9A8.25 8.25 0 1 1 18.75 9c0 3.404-2.12 6.372-4.92 8.444a2.252 2.252 0 0 1-2.66 0C7.37 15.372 5.25 12.404 5.25 9Z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2 text-gray-800">
                            Financial Data Security
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Certified protection for your financial and personal information.
                        </p>
                    </div>

                    {/* ISO 27001 */}
                    <div class="bg-white border border-[#E2E8E2] rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                        <div class="bg-[#C9DABD]/30 rounded-full p-4 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-[#708B75]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 3v18m9-9H3"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2 text-gray-800">
                            ISO 27001 Certified
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Trusted global standard for secure information management systems.
                        </p>
                    </div>

                    {/* GDPR */}
                    <div class="bg-white border border-[#E2E8E2] rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                        <div class="bg-[#C9DABD]/30 rounded-full p-4 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-[#708B75]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6 9.5 7.12 9.5 8.5 10.62 11 12 11zm0 0v2m0 0h.009M12 13h-.009M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2 text-gray-800">
                            GDPR Compliant
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Fully compliant with EU data protection and privacy standards.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
