import { createSignal, onMount, For, Show } from "solid-js";
import { RemoteRepositoryImpl } from "../../../repository/RemoteRepositoryImpl";
import { useAuthContext } from "../../../context/AuthContext";

const repo = new RemoteRepositoryImpl();

export default function FinanceManagerExpenses() {
    const [expenses, setExpenses] = createSignal<any[]>([]);
    const [token] = useAuthContext();

    const getExpenses = async () => {
        const fToken = token();
        if (!fToken) return;

        try {
            const fExpenses = await repo.getAllExpenses(fToken);
            setExpenses(fExpenses);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    onMount(async () => {
        await getExpenses();
    });

    return (
        <div class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-xl shadow-sm p-6">
            <h3 class="text-xl font-semibold text-[#708B75] mb-6">Your Records</h3>

            <Show
                when={expenses().length > 0}
                fallback={
                    <div class="text-gray-500 text-center py-10 border-2 border-dashed border-[#D1DAD1] rounded-lg">
                        <p>No expenses recorded yet.</p>
                    </div>
                }
            >
                <div class="overflow-x-auto">
                    <table class="min-w-full border border-[#E2E8E2] rounded-lg overflow-hidden shadow-sm">
                        <thead class="bg-[#E6EFE6] text-[#4B6043]">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold">Description</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold">Source</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold">Category</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                            <th class="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white text-gray-700">
                        <For each={expenses()}>
                            {(expense) => (
                                <tr class="border-t border-[#E2E8E2] hover:bg-[#F3F8F3] transition">
                                    <td class="px-4 py-3">{expense.date}</td>
                                    <td class="px-4 py-3">{expense.description}</td>
                                    <td class="px-4 py-3">{expense.source}</td>
                                    <td class="px-4 py-3">{expense.expense_category}</td>
                                    <td class="px-4 py-3 font-semibold text-red-600">
                                        -{expense.amount} lv.
                                    </td>
                                    <td class="px-4 py-3 flex justify-center gap-3">
                                        <button
                                            class="text-sm bg-[#C9DABD] hover:bg-[#b7cba9] text-gray-800 px-3 py-1 rounded-md font-medium transition"
                                            onClick={() => console.log("Edit", expense.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium transition"
                                            onClick={() => console.log("Delete", expense.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </For>
                        </tbody>
                    </table>
                </div>
            </Show>
        </div>
    );
}
