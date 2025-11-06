import { createSignal, onMount, For, Show, createEffect } from "solid-js";
import Modal from "./Modal";
import LoadingIndicator from "../components/general-components/LoadingIndicator";
import { RemoteRepositoryImpl } from "../../repository/RemoteRepositoryImpl";
import { useAuthContext } from "../../context/AuthContext";

const repo = new RemoteRepositoryImpl();

export const UpdateIncomeModal = (props: {
    state: {income: {
            id: number;
            amount: number;
            date: string;
            description: string;
            source: string;
            incomeCategory: number;
        }} | undefined;
    onSuccess: () => void;
    onClose: () => void;
}) => {
    const [amount, setAmount] = createSignal<number>(props.state?.income.amount ?? 0);
    const [date, setDate] = createSignal<string>(props.state?.income.date ?? "");
    const [description, setDescription] = createSignal<string>(props.state?.income.description ?? "");
    const [source, setSource] = createSignal<string>(props.state?.income.source ?? "");
    const [incomeCategory, setIncomeCategory] = createSignal<number>(props.state?.income.incomeCategory ?? 0);

    const [incomeCategories, setIncomeCategories] = createSignal<
        { id: number; name: string; slug: string }[]
    >([]);

    createEffect(() => {
        const income = props.state?.income;
        if (income) {
            setAmount(income.amount);
            setDate(income.date);
            setDescription(income.description);
            setSource(income.source);
            setIncomeCategory(income.incomeCategory);
        }
    });

    const [error, setError] = createSignal<string | null>(null);
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const [token] = useAuthContext();

    // ✅ Fetch only categories
    onMount(async () => {
        try {
            setIsLoading(true);
            const fCategories = await repo.getIncomeCategories();
            setIncomeCategories(fCategories);
        } catch (err) {
            console.error("Error loading categories:", err);
            setError("Error loading income categories. Please try again.");
        } finally {
            setIsLoading(false);
        }
    });

    // ✅ Update income using API
    const onSubmit = async () => {
        setError(null);
        const authToken = token();
        if (!authToken) {
            setError("User not authenticated.");
            return;
        }

        const fAmount = amount();
        const fSource = source();
        const fDescription = description();
        const fIncomeCategory = incomeCategory();
        const fDate = date();

        if (!fAmount || !fSource || !fDescription || !fIncomeCategory || !fDate) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setIsLoading(true);
            const formattedDate = new Date(fDate).toISOString().split("T")[0];

            await repo.updateIncome(
                authToken,
                Number(fAmount),
                fDescription,
                fSource,
                formattedDate,
                fIncomeCategory,
                props.state!.income.id
            );

            props.onSuccess();
            props.onClose();
        } catch (err) {
            console.error("Error updating income:", err);
            setError("Error updating income. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal state={props.state} onClose={props.onClose}>
            {() => (
                <div class="max-h-[90vh] overflow-y-auto w-[90%] sm:w-[28rem] bg-white border border-[#E2E8E2] rounded-2xl shadow-lg p-6 sm:p-8 relative text-gray-800">
                    <LoadingIndicator isLoading={isLoading()} loadingText="Updating income..." />

                    {/* Close button */}
                    <button
                        type="button"
                        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl leading-none"
                        onClick={props.onClose}
                    >
                        &times;
                    </button>

                    <form
                        class="flex flex-col gap-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <h2 class="text-2xl font-bold text-center text-[#708B75] mb-1">
                            Edit Income
                        </h2>
                        <p class="text-sm text-gray-500 text-center mb-3">
                            Update your income details below.
                        </p>

                        {/* Amount */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input
                                type="number"
                                placeholder="Enter amount..."
                                value={amount() ?? ""}
                                onInput={(e) => setAmount(Number(e.currentTarget.value))}
                                required
                                min="0"
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            />
                        </div>

                        {/* Source */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
                            <input
                                type="text"
                                placeholder="e.g. Job, Bonus, Investment..."
                                value={source() ?? ""}
                                onInput={(e) => setSource(e.currentTarget.value)}
                                required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                placeholder="Short description..."
                                value={description() ?? ""}
                                onInput={(e) => setDescription(e.currentTarget.value)}
                                required
                                rows={2}
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={date() ?? ""}
                                onInput={(e) => setDate(e.currentTarget.value)}
                                required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={incomeCategory() ?? ""}
                                onInput={(e) => setIncomeCategory(Number(e.currentTarget.value))}
                                required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            >
                                <option value="">Select category...</option>
                                <For each={incomeCategories()}>
                                    {(cat) => (
                                        <option value={cat.id}>
                                            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                                        </option>
                                    )}
                                </For>
                            </select>
                        </div>

                        {/* Error Message */}
                        <Show when={error()}>
                            <p class="text-red-500 text-sm text-center">{error()}</p>
                        </Show>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            class="w-full bg-[#C9DABD] text-gray-800 font-semibold rounded-lg py-2 sm:py-3 text-sm sm:text-base hover:bg-[#b7cba9] transition-colors cursor-pointer shadow-md"
                        >
                            Update Income
                        </button>
                    </form>
                </div>
            )}
        </Modal>
    );
};
