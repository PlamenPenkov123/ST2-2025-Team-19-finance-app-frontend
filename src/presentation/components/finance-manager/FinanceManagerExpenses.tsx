import {createSignal, onMount, For, Show} from "solid-js";
import {RemoteRepositoryImpl} from "../../../repository/RemoteRepositoryImpl";
import {useAuthContext} from "../../../context/AuthContext";
import {AddExpenseModal} from "../../modals/AddExpenseModal";
import {UpdateExpenseModal} from "../../modals/UpdateExpenseModal";
import {useBudgetContext} from "../../../context/BudgetContext";

const repo = new RemoteRepositoryImpl();

export default function FinanceManagerExpenses() {
    const [expenses, setExpenses] = createSignal<any[]>([]);
    const [token] = useAuthContext();

    const [isAddOpen, setIsAddOpen] = createSignal<true | undefined>(undefined);
    const [isUpdateOpen, setIsUpdateOpen] = createSignal<true | undefined>(undefined);

    const [expenseToUpdate, setExpenseToUpdate] = createSignal<any>(null);
    const [_, setNeedsRefresh] = useBudgetContext();

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

    const deleteExpense = async (expenseId: number) => {
        const fToken = token();
        if (!fToken) return;

        await repo.deleteExpense(fToken, expenseId);
        await getExpenses();
        setNeedsRefresh(true);
    }

    onMount(async () => {
        await getExpenses();
    });

    return (
        <div class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-xl shadow-sm p-6">
            <AddExpenseModal
                state={isAddOpen()}
                onSuccess={async () => {
                    setIsAddOpen(undefined);
                    await getExpenses();
                    setNeedsRefresh(true);
                }}
                onClose={() => {
                    setIsAddOpen(undefined);
                }}
            />
            <UpdateExpenseModal
                state={
                    isUpdateOpen()
                        ? {
                            expense: {
                                id: expenseToUpdate()?.id,
                                amount: expenseToUpdate()?.amount,
                                date: expenseToUpdate()?.date,
                                description: expenseToUpdate()?.description,
                                paymentMethod: expenseToUpdate()?.payment_method,
                                expenseCategory: expenseToUpdate()?.expense_category,
                            },
                        }
                        : undefined
                }
                onSuccess={async () => {
                    setIsUpdateOpen(undefined);
                    setExpenseToUpdate(null);
                    await getExpenses();
                    setNeedsRefresh(true);
                }}
                onClose={() => {
                    setIsUpdateOpen(undefined);
                    setExpenseToUpdate(null);
                }}
            />
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 class="text-xl font-semibold text-[#708B75]">Your Records</h3>
                <button
                    onClick={() => {
                        setIsAddOpen(true)
                    }}
                    class="bg-[#C9DABD] text-gray-800 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#b7cba9] transition-all duration-200"
                >
                    + Add Expense
                </button>
            </div>

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
                            <th class="px-4 py-3 text-left text-sm font-semibold">Payment Method</th>
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
                                    <td class="px-4 py-3">{expense.payment_method}</td>
                                    <td class="px-4 py-3">{expense.expense_category}</td>
                                    <td class="px-4 py-3 font-semibold text-red-600">
                                        -{expense.amount} lv.
                                    </td>
                                    <td class="px-4 py-3 flex justify-center gap-3">
                                        <button
                                            class="text-sm bg-[#C9DABD] hover:bg-[#b7cba9] text-gray-800 px-3 py-1 rounded-md font-medium transition"
                                            onClick={() => {
                                                setExpenseToUpdate(expense);
                                                setIsUpdateOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium transition"
                                            onClick={async () => await deleteExpense(expense.id)}
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
