// @ts-ignore
import { Motion } from "@motionone/solid";

export default function About() {
    return (
        <div class="min-h-screen bg-white text-gray-800 flex flex-col items-center px-6 py-16">
            <Motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                class="max-w-3xl text-center"
            >
                {/* Header Section */}
                <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#C9DABD]">
                    About Flow
                </h1>
                <p class="text-lg text-gray-600 mb-12">
                    Track your <span class="font-semibold text-[#C9DABD]">expenses</span>,
                    manage your <span class="font-semibold text-[#C9DABD]">income</span>, and
                    take control of your <span class="font-semibold text-[#C9DABD]">budget</span> —
                    all in one smooth flow.
                </p>

                {/* Mission Section */}
                <div class="bg-[#C9DABD]/20 rounded-2xl p-6 shadow-sm mb-10">
                    <h2 class="text-2xl font-semibold mb-2 text-[#C9DABD]">Our Mission</h2>
                    <p class="text-gray-700 leading-relaxed">
                        Flow helps you build better financial habits by showing you where your money goes
                        and how it aligns with your goals. We believe budgeting shouldn’t feel restrictive —
                        it should feel empowering.
                    </p>
                </div>

                {/* Features Section */}
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <div class="bg-[#C9DABD]/10 p-5 rounded-2xl shadow-sm">
                        <h3 class="font-semibold text-[#C9DABD] mb-2">Smart Tracking</h3>
                        <p class="text-sm text-gray-700">
                            Keep tabs on every expense and income with simple, clear visuals.
                        </p>
                    </div>
                    <div class="bg-[#C9DABD]/10 p-5 rounded-2xl shadow-sm">
                        <h3 class="font-semibold text-[#C9DABD] mb-2">Budget Insights</h3>
                        <p class="text-sm text-gray-700">
                            Compare spending patterns and see how they stack up to your monthly goals.
                        </p>
                    </div>
                    <div class="bg-[#C9DABD]/10 p-5 rounded-2xl shadow-sm">
                        <h3 class="font-semibold text-[#C9DABD] mb-2">Simple Design</h3>
                        <p class="text-sm text-gray-700">
                            Minimal, distraction-free interface that keeps you focused on what matters.
                        </p>
                    </div>
                </div>

                {/* Closing Section */}
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                    Flow is more than an app — it’s your partner in financial growth.
                    Let’s make budgeting effortless and meaningful, together.
                </p>
            </Motion.div>
        </div>
    );
}
