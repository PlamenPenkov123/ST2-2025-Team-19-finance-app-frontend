import {useAuthContext} from "./context/AuthContext";
import {useUserContext} from "./context/UserContext";
import {createEffect, createSignal, For, onCleanup, Show} from "solid-js";
import Header from "./presentation/components/general-components/Header";
import {RemoteRepositoryImpl} from "./repository/RemoteRepositoryImpl";
import Footer from "./presentation/components/general-components/Footer";

const repo = new RemoteRepositoryImpl();

function App(props: any) {
    const [token, setToken] = useAuthContext();
    const [user, setUser] = useUserContext();

    createEffect(() => {
        if (!user() || !token()) {
            setUser(null);
            setToken(null);
        }
    })

    createEffect(() => {
        const currentToken = token();
        if (currentToken && !user()) {
            (async () => {
                try {
                    const fetchedUser = await repo.me(currentToken);
                    setUser(fetchedUser);
                    localStorage.setItem("flow_user", JSON.stringify(fetchedUser));
                } catch (error) {
                    console.error(error);
                    setUser(null);
                }
            })();
        }
    });

    const [isOpen, setIsOpen] = createSignal(false);
    const [messages, setMessages] = createSignal([
        { role: "assistant", text: "Hi there! 👋 How can I help you today?" },
    ]);
    const [input, setInput] = createSignal("");
    const [isLoading, setIsLoading] = createSignal(false);
    createEffect(() => {
        // Trigger every time messages() changes
        messages();
        queueMicrotask(() => {
            if (chatBodyRef) {
            chatBodyRef.scrollTop = chatBodyRef.scrollHeight;
            }
        });
    });

    const sendMessage = async (e?: Event) => {
        e?.preventDefault();
        const question = input().trim();
        if (!question) return;

        let botIndex = 0;
        setMessages((prev) => {
            const updated = [...prev, { role: "user", text: question }, { role: "assistant", text: "" }];
            botIndex = updated.length - 1;
            return updated;
        });

        setInput("");
        setIsLoading(true);

        let buffer = "";

        try {
            await repo.sendFAQ(question, (chunk) => {
            if (chunk === "[DONE]") {
                setIsLoading(false);
                return;
            }
            if (chunk === "[ERROR]") {
                setIsLoading(false);
                buffer = "Sorry, something went wrong.";
            } else {
                buffer += chunk;
            }

            setMessages((prev) => {
                const updated = [...prev];
                updated[botIndex] = { role: "assistant", text: buffer };
                return updated;
            });
            });
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    // Send message on Enter
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") sendMessage();
    };
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));

    let chatBodyRef: HTMLDivElement | undefined;

    return <div class="min-h-screen flex flex-col w-full">
        <Header/>
        <div class="flex-grow">
            {props.children}
        </div>
        <Footer/>
        <div>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen())}
                class="fixed bottom-6 right-6 cursor-pointer bg-[#708B75] text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:bg-[#5b7361] transition-all duration-200"
            >
                💬
            </button>

            {/* Chat Window */}
            <Show when={isOpen()}>
                <div class="fixed bottom-24 z-10 right-6 w-80 sm:w-96 bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
                    {/* Header */}
                    <div class="bg-[#708B75] text-white px-4 py-3 flex justify-between items-center">
                        <span class="font-semibold">AI FAQ Assistant</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            class="text-white hover:text-gray-200 transition cursor-pointer"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div ref={chatBodyRef} class="flex-1 p-4 overflow-y-auto space-y-3 max-h-80">
                        <For each={messages()}>
                            {(msg) => (
                                <div
                                    class={`flex ${
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        class={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                                            msg.role === "user"
                                                ? "bg-[#C9DABD] text-gray-800"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            )}
                        </For>

                        <Show when={isLoading()}>
                            <div class="text-gray-500 text-sm italic">Thinking...</div>
                        </Show>
                    </div>

                    {/* Input */}
                    <div class="border-t border-gray-200 p-3 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Ask a question..."
                            value={input()}
                            onInput={(e) => setInput(e.currentTarget.value)}
                            class="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9DABD]"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading()}
                            class="bg-[#708B75] cursor-pointer text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#5b7361] transition disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </Show>
        </div>
    </div>
}

export default App
