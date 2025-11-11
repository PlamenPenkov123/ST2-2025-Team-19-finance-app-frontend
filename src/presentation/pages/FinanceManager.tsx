import { useUserContext } from "../../context/UserContext";
import { LoginModal } from "../modals/LoginModal";
import {createEffect, createMemo, createSignal, onMount, Show} from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router"; // ✅ add useLocation
import { TopCenterPopup } from "../components/general-components/TopCenterPopup";
import { RegisterModal } from "../modals/RegisterModal";
import { RemoteRepositoryImpl } from "../../repository/RemoteRepositoryImpl";
import LoadingIndicator from "../components/general-components/LoadingIndicator";
import { useAuthContext } from "../../context/AuthContext";
import { AddBudgetModal } from "../modals/AddBudgetModal";
import {useBudgetContext} from "../../context/BudgetContext";

const repo = new RemoteRepositoryImpl();

export default function FinanceManager(props: any) {
    const [user] = useUserContext();
    const [token] = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [popupState, setPopupState] = createSignal<{ text: string; error?: boolean } | null>(null);
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const [isAddBudgetOpen, setIsAddBudgetOpen] = createSignal<true | undefined>(undefined);
    const [budget, setBudget] = createSignal<number>(0);
    const [needsRefresh, setNeedsRefresh] = useBudgetContext();

    createEffect(async () => {
        if (needsRefresh()) {
            await getBudget();
            setNeedsRefresh(false);
        }
    });

    onMount(() => {
        if (!user()){
            navigate("/*");
        }
    });

    const getBudget = async () => {
        const fToken = token();
        if (!fToken) return;

        try {
            setIsLoading(true);
            const fBudget = await repo.getBudget(fToken);
            setBudget(fBudget.current_amount);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    onMount(async () => await getBudget());

    return (
        <div class="min-h-[80vh] bg-white text-gray-800 flex flex-col items-center px-6 py-16">
            <TopCenterPopup state={popupState()} onClose={() => setPopupState(null)} />
            <LoadingIndicator isLoading={isLoading()} loadingText="Loading..." />

            <AddBudgetModal
                state={isAddBudgetOpen()}
                onSuccess={async () => {
                    await getBudget();
                    setPopupState({ text: "Budget added successfully!" });
                    setIsAddBudgetOpen(undefined);
                }}
                onClose={() => setIsAddBudgetOpen(undefined)}
            />

            <div class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-2xl shadow-sm p-8 sm:p-10 my-6 flex flex-col sm:flex-row items-center justify-between transition">
                <div class="flex flex-col text-center sm:text-left mb-6 sm:mb-0">
                    <h2 class="text-2xl sm:text-3xl font-semibold text-[#708B75] mb-2">
                        Current Budget
                    </h2>
                    <p class="text-4xl sm:text-5xl font-bold text-gray-800">
                        <Show when={budget()} fallback={<div>0 lv.</div>}>
                            {budget().toLocaleString()} lv.
                        </Show>
                    </p>
                </div>

                <div class="hidden sm:block w-px h-16 bg-gray-300 mx-6"></div>
                <div class="block sm:hidden w-24 h-px bg-gray-300 my-4"></div>

                <div class="flex flex-col items-center sm:items-end">
                    <Show when={!budget()}>
                        <button
                            onClick={() => setIsAddBudgetOpen(true)}
                            class="bg-[#C9DABD] text-gray-800 font-semibold px-8 py-3 rounded-lg cursor-pointer shadow-md hover:bg-[#b7cba9] transition-all duration-200"
                        >
                            + Add Budget
                        </button>
                    </Show>
                    <p class="text-sm text-gray-500 mt-2">
                        Track your spending easily
                    </p>
                </div>
            </div>

            <Show when={budget()} fallback={
                <div class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-lg shadow-sm p-10 text-center text-gray-700">
                    <h3 class="text-2xl font-semibold mb-4 text-[#708B75]">No budget set yet</h3>
                    <p class="mb-6">
                        Start by adding your first budget to unlock income and expense tracking.
                    </p>
                    <button
                        onClick={() => setIsAddBudgetOpen(true)}
                        class="bg-[#C9DABD] text-gray-800 font-semibold px-8 py-3 rounded-lg cursor-pointer shadow-md hover:bg-[#b7cba9] transition-all duration-200"
                    >
                        + Add Budget
                    </button>
                </div>
            }>
                <nav class="w-11/12 sm:w-5/6 bg-[#F8FAF8] border border-[#E2E8E2] rounded-lg shadow-sm mb-8 flex justify-center sm:justify-start overflow-hidden">
                    <button
                        onClick={() => navigate("/finance-manager/incomes")}
                        class={`px-6 py-3 font-semibold cursor-pointer transition duration-150 ${
                            location.pathname === "/finance-manager" ||
                            location.pathname.includes("/incomes")
                                ? "bg-[#C9DABD] text-gray-900"
                                : "text-[#708B75] hover:bg-[#E6EFE6]"
                        }`}
                    >
                        Incomes
                    </button>
                    <button
                        onClick={() => navigate("/finance-manager/expenses")}
                        class={`px-6 py-3 font-semibold cursor-pointer transition duration-150 ${
                            location.pathname.includes("/expenses")
                                ? "bg-[#C9DABD] text-gray-900"
                                : "text-[#708B75] hover:bg-[#E6EFE6]"
                        }`}
                    >
                        Expenses
                    </button>
                </nav>
                <div class="flex justify-center w-full">
                    {props.children}
                </div>
            </Show>
        </div>
    );
}
