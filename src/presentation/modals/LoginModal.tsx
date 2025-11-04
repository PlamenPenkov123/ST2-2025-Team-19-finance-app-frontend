import { createSignal } from "solid-js";
import Modal from "./Modal";
import { RemoteRepositoryImpl } from "../../repository/RemoteRepositoryImpl";
import LoadingIndicator from "../components/general-components/LoadingIndicator";
import { useAuthContext } from "../../context/AuthContext";

const repo = new RemoteRepositoryImpl();

export const LoginModal = (props: {
    state: boolean | undefined;
    onSuccess: () => void;
    onClose: () => void;
}) => {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal<string | null>(null);
    const [, setToken] = useAuthContext();
    const [isLoading, setIsLoading] = createSignal<boolean>(false);

    const onSubmit = async () => {
        setError(null);
        try {
            setIsLoading(true);
            const result = await repo.login(email().trim(), password());
            localStorage.setItem("flow_token", result.token);
            setToken(result.token);
            setIsLoading(false);
            props.onSuccess();
        } catch (err) {
            console.error(err);
            setError("Wrong credentials. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal state={props.state} onClose={props.onClose}>
            {() => (
                <div class="max-h-[90vh] overflow-y-auto w-[90%] sm:w-[25rem] bg-white rounded-2xl shadow-lg border border-[#E2E8E2] p-6 sm:p-8 relative text-gray-800">
                    <LoadingIndicator isLoading={isLoading()} loadingText="Signing in..." />

                    {/* Close button */}
                    <button
                        type="button"
                        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl leading-none"
                        onClick={props.onClose}
                    >
                        &times;
                    </button>

                    <form
                        class="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <h2 class="text-2xl font-bold text-center text-[#708B75] mb-2">
                            Welcome Back
                        </h2>
                        <p class="text-sm text-gray-500 text-center mb-4">
                            Log in to continue managing your finances with{" "}
                            <span class="text-[#C9DABD] font-semibold">Flow</span>.
                        </p>

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            required
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9DABD]"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password()}
                            onInput={(e) => setPassword(e.currentTarget.value)}
                            required
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9DABD]"
                        />

                        {/* Error */}
                        {error() && (
                            <p class="text-red-500 text-sm text-center">{error()}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            class="w-full bg-[#C9DABD] text-gray-800 font-semibold rounded-lg py-2 sm:py-3 text-sm sm:text-base hover:bg-[#b7cba9] transition-colors cursor-pointer shadow-md"
                        >
                            Login
                        </button>
                    </form>
                </div>
            )}
        </Modal>
    );
};
