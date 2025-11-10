import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { RegisterModal } from "../../modals/RegisterModal";
import { LoginModal } from "../../modals/LoginModal";
import { TopCenterPopup } from "./TopCenterPopup";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

export default function Header() {
    const [isMobileOpen, setIsMobileOpen] = createSignal(false);
    const [isRegisterOpen, setIsRegisterOpen] = createSignal<true | undefined>(undefined);
    const [isLoginOpen, setIsLoginOpen] = createSignal<true | undefined>(undefined);
    const [popupState, setPopupState] = createSignal<{ text: string; error?: boolean } | null>(null);

    const [user, setUser] = useUserContext();
    const [, setToken] = useAuthContext();
    const navigate = useNavigate();

    function handleLogout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("flow_token");
        localStorage.removeItem("flow_user");
        setIsMobileOpen(false);
        setPopupState({ text: "You logged out successfully!" });
        navigate("/");
    }

    return (
        <header class="bg-white/90 backdrop-blur-md border-b border-[#C9DABD]/40 sticky top-0 z-50 shadow-sm">
            <TopCenterPopup state={popupState()} onClose={() => setPopupState(null)} />
            <RegisterModal
                state={isRegisterOpen()}
                onSuccess={() => {
                    setIsRegisterOpen(undefined);
                    setIsLoginOpen(true);
                    setPopupState({ text: "You registered successfully!" });
                }}
                onClose={() => setIsRegisterOpen(undefined)}
            />
            <LoginModal
                state={isLoginOpen()}
                onSuccess={() => {
                    setIsLoginOpen(undefined);
                    setPopupState({ text: "You logged in successfully!" });
                    navigate("/");
                }}
                onClose={() => setIsLoginOpen(undefined)}
            />

            <div class="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
                {/* Logo */}
                <A
                    href="/"
                    class="text-3xl font-bold tracking-tight text-[#C9DABD] hover:opacity-80 transition-all"
                >
                    Flow
                </A>

                {/* Desktop Nav */}
                <nav class="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
                    {["Home", "About", "Contact"].map((item) => (
                        <A
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            class="relative hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                        >
                            {item}
                        </A>
                    ))}

                    <Show
                        when={user()}
                        fallback={
                            <div class="flex items-center space-x-6">
                                <button
                                    onClick={() => setIsRegisterOpen(true)}
                                    class="relative cursor-pointer hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    class="relative cursor-pointer hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        }
                    >
                        <A
                            href="/profile"
                            class="relative hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                        >
                            Profile
                        </A>
                        <A
                            href="/finance-manager"
                            class="relative hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                        >
                            Finance manager
                        </A>
                        <button
                            onClick={handleLogout}
                            class="relative cursor-pointer hover:text-[#C9DABD] transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C9DABD] after:transition-all"
                        >
                            Logout
                        </button>
                    </Show>
                </nav>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen())}
                    class="md:hidden text-[#C9DABD] focus:outline-none"
                >
                    <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={
                                isMobileOpen()
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <Show when={isMobileOpen()}>
                <nav class="md:hidden bg-white border-t border-[#C9DABD]/40 flex flex-col space-y-3 py-4 px-5 text-gray-700 font-medium">
                    <A href="/" onClick={() => setIsMobileOpen(false)} class="hover:text-[#C9DABD]">
                        Home
                    </A>
                    <A href="/about" onClick={() => setIsMobileOpen(false)} class="hover:text-[#C9DABD]">
                        About
                    </A>
                    <A href="/contact" onClick={() => setIsMobileOpen(false)} class="hover:text-[#C9DABD]">
                        Contact
                    </A>

                    <Show
                        when={user()}
                        fallback={
                            <>
                                <button
                                    onClick={() => {
                                        setIsRegisterOpen(true);
                                        setIsMobileOpen(false);
                                    }}
                                    class="hover:text-[#C9DABD] text-left"
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => {
                                        setIsLoginOpen(true);
                                        setIsMobileOpen(false);
                                    }}
                                    class="hover:text-[#C9DABD] text-left"
                                >
                                    Login
                                </button>
                            </>
                        }
                    >
                        <div class="flex flex-col space-y-2">
                            <A href="/profile" class="hover:text-[#C9DABD]">
                                Profile
                            </A>
                            <A href="/finance-manager" class="hover:text-[#C9DABD]">
                                Finance Manager
                            </A>
                            <button
                                onClick={handleLogout}
                                class="hover:text-[#C9DABD] text-left cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </Show>
                </nav>
            </Show>
        </header>
    );
}
