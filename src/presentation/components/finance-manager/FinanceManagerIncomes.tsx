import { createSignal, onMount, For, Show } from "solid-js";
import { RemoteRepositoryImpl } from "../../../repository/RemoteRepositoryImpl";
import { useAuthContext } from "../../../context/AuthContext";
import {AddIncomeModal} from "../../modals/AddIncomeModal";

const repo = new RemoteRepositoryImpl();

export default function FinanceManagerIncomes() {
    const [incomes, setIncomes] = createSignal<any[]>([]);
    const [token] = useAuthContext();

    const [isAddOpen, setIsAddOpen] = createSignal<true | undefined>(undefined);

    const getIncomes = async () => {
        const fToken = token();
        if (!fToken) return;

        try {
            const fIncomes = await repo.getAllIncomes(fToken);
            setIncomes(fIncomes);
        } catch (err) {
            console.error("Error fetching incomes:", err);
        }
    };

    onMount(async () => {
        await getIncomes();
    });

    return (
        <div class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-xl shadow-sm p-6">
            {/* Header with add button */}
            <AddIncomeModal
                state={isAddOpen()}
                onSuccess={async () => {
                    setIsAddOpen(undefined);
                    await getIncomes();
                }}
                onClose={() => {
                    setIsAddOpen(undefined);
                }}
            />
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 class="text-xl font-semibold text-[#708B75]">Your Records</h3>
                <button
                    onClick={() => {setIsAddOpen(true)}}
                    class="bg-[#C9DABD] text-gray-800 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#b7cba9] transition-all duration-200"
                >
                    + Add Income
                </button>
            </div>

            <Show
                when={incomes().length > 0}
                fallback={
                    <div class="text-gray-500 text-center py-10 border-2 border-dashed border-[#D1DAD1] rounded-lg">
                        <p>No incomes recorded yet.</p>
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
                        <For each={incomes()}>
                            {(income) => (
                                <tr class="border-t border-[#E2E8E2] hover:bg-[#F3F8F3] transition">
                                    <td class="px-4 py-3">{income.date}</td>
                                    <td class="px-4 py-3">{income.description}</td>
                                    <td class="px-4 py-3">{income.source}</td>
                                    <td class="px-4 py-3">{income.income_category}</td>
                                    <td class="px-4 py-3 font-semibold text-green-600">
                                        +{income.amount} lv.
                                    </td>
                                    <td class="px-4 py-3 flex justify-center gap-3">
                                        <button
                                            class="text-sm bg-[#C9DABD] hover:bg-[#b7cba9] text-gray-800 px-3 py-1 rounded-md font-medium transition"
                                            onClick={() => console.log("Edit", income.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium transition"
                                            onClick={() => console.log("Delete", income.id)}
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
