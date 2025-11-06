import { createContext, createSignal, useContext, type JSX } from "solid-js";

// Define the type of the context value
type BudgetContextType = [
    () => boolean,              // getter
    (value: boolean) => void    // setter
];

// Create the context
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// Provider component
export function BudgetProvider(props: { children: JSX.Element }) {
    const [needsRefresh, setNeedsRefresh] = createSignal(false);

    return (
        <BudgetContext.Provider value={[needsRefresh, setNeedsRefresh]}>
            {props.children}
        </BudgetContext.Provider>
    );
}

// Hook for easy access
export function useBudgetContext(): BudgetContextType {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error("useBudgetContext must be used within a <BudgetProvider>");
    }
    return context;
}
