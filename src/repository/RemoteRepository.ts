export interface RemoteRepository {
    // Auth api functions
    login(email: string, password: string): Promise<any>;
    register(username: string, email: string, password: string, passwordConfirm: string, firstName: string, lastName: string, phoneNumber: string): Promise<any>;
    me(bearer: string): Promise<any>;

    // Categories
    getIncomeCategories(): Promise<any>;
    getExpenseCategories(token: string): Promise<any>;
    getPaymentMethods(token: string): Promise<any>;

    // Budget
    getBudget(token: string): Promise<any>;
    storeBudget(token: string, amount: number, month: string): Promise<any>;
    deleteBudget(token: string): Promise<any>;
    updateBudget(token: string, amount: number, month: string): Promise<any>;

    // Incomes
    getAllIncomes(token: string): Promise<any>;
    storeIncome(token: string, amount: number, description: string, source: string, date: string, income_category: number): Promise<any>;
    updateIncome(token: string, amount: number, description: string, source: string, date: string, income_category: number, incomeId: number): Promise<any>;
    getIncomeById(token: string, incomeId: number): Promise<any>;
    deleteIncome(token: string, incomeId: number): Promise<any>;

    // Expenses
    getAllExpenses(token: string): Promise<any>;
    storeExpense(token: string, amount: number, description: string, date: string, expense_category: number, payment_method: number): Promise<any>;
    updateExpense(token: string, amount: number, description: string, date: string, expense_category: number, expenseId: number, payment_method: number): Promise<any>;
    getExpenseById(token: string, expenseId: number): Promise<any>;
    deleteExpense(token: string, expenseId: number): Promise<any>;
}