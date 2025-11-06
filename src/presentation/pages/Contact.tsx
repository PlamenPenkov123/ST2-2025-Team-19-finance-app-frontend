// @ts-ignore
import { Motion } from "@motionone/solid";

export default function Contact() {
    return (
        <div class="min-h-[80vh] bg-white text-gray-800 flex flex-col items-center px-6 py-16">
            <Motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                class="max-w-3xl w-full text-center"
            >
                {/* Header */}
                <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#C9DABD]">
                    Contact Us
                </h1>
                <p class="text-lg text-gray-600 mb-12">
                    Have a question or need assistance with{" "}
                    <span class="font-semibold text-[#C9DABD]">Flow</span>?
                    We're always happy to hear from you.
                </p>

                {/* Contact Info Section */}
                <Motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    class="grid md:grid-cols-2 gap-8 mb-16"
                >
                    <div class="bg-[#C9DABD]/10 rounded-2xl p-6 text-left shadow-sm">
                        <h2 class="text-xl font-semibold text-[#C9DABD] mb-2">
                            Customer Support
                        </h2>
                        <p class="text-gray-700 mb-1">
                            For questions about tracking your expenses or budget setup:
                        </p>
                        <a
                            href="mailto:support@flowapp.com"
                            class="text-[#C9DABD] font-medium hover:underline"
                        >
                            support@flowapp.com
                        </a>
                    </div>

                    <div class="bg-[#C9DABD]/10 rounded-2xl p-6 text-left shadow-sm">
                        <h2 class="text-xl font-semibold text-[#C9DABD] mb-2">
                            Business Inquiries
                        </h2>
                        <p class="text-gray-700 mb-1">
                            For collaborations, media, or partnership opportunities:
                        </p>
                        <a
                            href="mailto:business@flowapp.com"
                            class="text-[#C9DABD] font-medium hover:underline"
                        >
                            business@flowapp.com
                        </a>
                    </div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    class="bg-[#C9DABD]/10 rounded-2xl p-6 shadow-sm max-w-xl mx-auto text-left"
                >
                    <h2 class="text-xl font-semibold text-[#C9DABD] mb-2">
                        Our Office
                    </h2>
                    <p class="text-gray-700 leading-relaxed">
                        Flow Finance Ltd.
                        123 Freedom Street,
                        Sofia, Bulgaria
                        <span class="block mt-1">Phone: +359 88 123 4567</span>
                    </p>
                </Motion.div>

                {/* Footer Note */}
                <Motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    class="text-gray-500 text-sm mt-12"
                >
                    Our team is available Monday to Friday, 9:00 AM – 6:00 PM (EET).
                </Motion.p>
            </Motion.div>
        </div>
    );
}
