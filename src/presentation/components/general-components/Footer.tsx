import {A} from "@solidjs/router";
import {useUserContext} from "../../../context/UserContext";
import {Show} from "solid-js";

export default function Footer() {

    const [user] = useUserContext();

    return (
        <footer class="bg-white border-t border-[#C9DABD]/40 text-gray-700 mt-16">
            <div class="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                {/* Brand */}
                <div>
                    <h2 class="text-3xl font-bold text-[#C9DABD] mb-3">Flow</h2>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        Track your expenses, manage your income, and stay on top of your
                        budget with clarity and confidence.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 class="text-lg font-semibold text-[#C9DABD] mb-3">Navigation</h3>
                    <ul class="space-y-2">
                        <li>
                            <A href="/" class="hover:text-[#C9DABD] transition-colors">
                                Home
                            </A>
                        </li>
                        <li>
                            <A href="/about" class="hover:text-[#C9DABD] transition-colors">
                                About
                            </A>
                        </li>
                        <li>
                            <A href="/contact" class="hover:text-[#C9DABD] transition-colors">
                                Contact
                            </A>
                        </li>
                        <Show when={user()}>
                            <>
                                <li>
                                    <A href="/profile" class="hover:text-[#C9DABD] transition-colors">
                                        Profile
                                    </A>
                                </li>
                                <li>
                                    <A href="/finance-manager" class="hover:text-[#C9DABD] transition-colors">
                                        Finance Manager
                                    </A>
                                </li>
                            </>
                        </Show>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 class="text-lg font-semibold text-[#C9DABD] mb-3">Contact</h3>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li>Email: <span class="text-gray-800">support@flowapp.com</span></li>
                        <li>Phone: <span class="text-gray-800">+359 888 123 456</span></li>
                        <li>Location: <span class="text-gray-800">Sofia, Bulgaria</span></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-[#C9DABD]/30 mt-6 py-4">
                <p class="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Flow. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
