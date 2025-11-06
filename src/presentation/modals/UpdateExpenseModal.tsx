import { createSignal, onMount, For, Show, createEffect } from "solid-js";
import Modal from "./Modal";
import LoadingIndicator from "../components/general-components/LoadingIndicator";
import { RemoteRepositoryImpl } from "../../repository/RemoteRepositoryImpl";
import { useAuthContext } from "../../context/AuthContext";

const repo = new RemoteRepositoryImpl();

export const UpdateExpenseModal = (props: {
    state: {
        expense: {
            id: number;
            amount: number;
            date: string;
            description: string;
            expenseCategory: number;
            paymentMethod: number;
        };
    } | undefined;
    onSuccess: () => void;
    onClose: () => void;
}) => {
    const [amount, setAmount] = createSignal<number>(props.state?.expense.amount ?? 0);
    const [date, setDate] = createSignal<string>(props.state?.expense.date ?? "");
    const [description, setDescription] = createSignal<string>(props.state?.expense.description ?? "");
    const [expenseCategory, setExpenseCategory] = createSignal<number>(props.state?.expense.expenseCategory ?? 0);
    const [paymentMethod, setPaymentMethod] = createSignal<number>(props.state?.expense.paymentMethod ?? 0);

    const [expenseCategories, setExpenseCategories] = createSignal<{ id: number; name: string; slug: string }[]>([]);
    const [paymentMethods, setPaymentMethods] = createSignal<{ id: number; name: string; slug: string }[]>([]);

    createEffect(() => {
        const expense = props.state?.expense;
        if (expense) {
            setAmount(expense.amount);
            setDate(expense.date);
            setDescription(expense.description);
            setExpenseCategory(expense.expenseCategory);
            setPaymentMethod(expense.paymentMethod);
        }
    });

    const [error, setError] = createSignal<string | null>(null);
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const [token] = useAuthContext();

    // ✅ Fetch categories and payment methods
    onMount(async () => {
        const fToken = token();
        if(!fToken) return;

        try {
            setIsLoading(true);
            const fCategories = await repo.getExpenseCategories(fToken);
            const fPaymentMethods = await repo.getPaymentMethods(fToken);
            setExpenseCategories(fCategories);
            setPaymentMethods(fPaymentMethods);
        } catch (err) {
            console.error("Error loading dropdown data:", err);
            setError("Error loading categories or payment methods.");
        } finally {
            setIsLoading(false);
        }
    });

    // ✅ Update expense API call
    const onSubmit = async () => {
        setError(null);
        const authToken = token();
        if (!authToken) {
            setError("User not authenticated.");
            return;
        }

        const fAmount = amount();
        const fDescription = description();
        const fDate = date();
        const fExpenseCategory = expenseCategory();
        const fPaymentMethod = paymentMethod();

        if (!fAmount || !fDescription || !fDate || !fExpenseCategory || !fPaymentMethod) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setIsLoading(true);
            const formattedDate = new Date(fDate).toISOString().split("T")[0];

            await repo.updateExpense(
                authToken,
                Number(fAmount),
                fDescription,
                formattedDate,
                fExpenseCategory,
                props.state!.expense.id,
                fPaymentMethod
            );

            props.onSuccess();
            props.onClose();
        } catch (err) {
            console.error("Error updating expense:", err);
            setError("Error updating expense. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal state={props.state} onClose={props.onClose}>
            {() => (
                <div class="max-h-[90vh] overflow-y-auto w-[90%] sm:w-[28rem] bg-white border border-[#E2E8E2] rounded-2xl shadow-lg p-6 sm:p-8 relative text-gray-800">
                    <LoadingIndicator isLoading={isLoading()} loadingText="Updating expense..." />

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
                        <h2 class="text-2xl font-bold text-center text-[#708B75] mb-1">Edit Expense</h2>
                        <p class="text-sm text-gray-500 text-center mb-3">
                            Update your expense details below.
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

                        {/* Payment Method */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                            <select
                                value={paymentMethod() ?? ""}
                                onInput={(e) => setPaymentMethod(Number(e.currentTarget.value))}
                                required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            >
                                <option value="">Select payment method...</option>
                                <For each={paymentMethods()}>
                                    {(method) => (
                                        <option value={method.id}>
                                            {method.name.charAt(0).toUpperCase() + method.name.slice(1)}
                                        </option>
                                    )}
                                </For>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={expenseCategory() ?? ""}
                                onInput={(e) => setExpenseCategory(Number(e.currentTarget.value))}
                                required
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#C9DABD] transition"
                            >
                                <option value="">Select category...</option>
                                <For each={expenseCategories()}>
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
                            Update Expense
                        </button>
                    </form>
                </div>
            )}
        </Modal>
    );
};
