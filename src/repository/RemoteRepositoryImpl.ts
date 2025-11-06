import type {RemoteRepository} from "./RemoteRepository.ts";

export class RemoteRepositoryImpl implements RemoteRepository {
    private apiUrl: string = 'http://localhost:8000/api';

    // Auth methods

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(
        username: string,
        email: string,
        password: string,
        passwordConfirm: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    ): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    password_confirm: passwordConfirm,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async me(bearer: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${bearer}`,
                },
            });

            if (!response.ok) throw new Error(`Fetching user info failed: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('profile() error:', error);
            throw error;
        }
    }

    // Category methods

    async getIncomeCategories(): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/income-categories`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching income categories failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('income categories() error:', error);
            throw error;
        }
    }

    async getExpenseCategories(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expense-categories`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching expense categories failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('expense categories() error:', error);
            throw error;
        }
    }

    async getPaymentMethods(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/payment-methods`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching payment methods failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('payment methods() error:', error);
            throw error;
        }
    }

    // Budget methods

    async getBudget(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/budgets`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching user info failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('budget() error:', error);
            throw error;
        }
    }

    async storeBudget(token: string, amount: number, month: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/budgets`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    month: month
                }),
            });

            if (!response.ok) {
                throw new Error(`Storing budget failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('budget() error:', error);
            throw error;
        }
    }

    async deleteBudget(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/budgets`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Deleting budget failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('budget() error:', error);
            throw error;
        }
    }

    async updateBudget(token: string, amount: number, month: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/budgets`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    month: month
                }),
            });

            if (!response.ok) {
                throw new Error(`Updating budget failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('budget() error:', error);
            throw error;
        }
    }

    // Income methods
    async getAllIncomes(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/incomes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching incomes failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('income() error:', error);
            throw error;
        }
    }

    async storeIncome(token: string, amount: number, description: string, source: string, date: string, income_category: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/incomes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    description: description,
                    source: source,
                    date: date,
                    income_category: income_category
                }),
            });

            if (!response.ok) {
                throw new Error(`Storing income failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('income() error:', error);
            throw error;
        }
    }

    async updateIncome(token: string, amount: number, description: string, source: string, date: string, income_category: number, incomeId: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/incomes/${incomeId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    description: description,
                    source: source,
                    date: date,
                    income_category: income_category
                }),
            });

            if (!response.ok) {
                throw new Error(`Updating income failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('income() error:', error);
            throw error;
        }
    }

    async getIncomeById(token: string, incomeId: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/incomes/${incomeId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching income by id failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('income() error:', error);
            throw error;
        }
    }

    async deleteIncome(token: string, incomeId: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/incomes/${incomeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Deleting income failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('income() error:', error);
            throw error;
        }
    }

    async getAllExpenses(token: string): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expenses`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching expenses failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('expense() error:', error);
            throw error;
        }
    }

    async storeExpense(token: string, amount: number, description: string, date: string, expense_category: number, payment_method: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expenses`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    description: description,
                    date: date,
                    expense_category: expense_category,
                    payment_method: payment_method
                }),
            });

            if (!response.ok) {
                throw new Error(`Storing expense failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('expense() error:', error);
            throw error;
        }
    }

    async updateExpense(token: string, amount: number, description: string, date: string, expense_category: number, expenseId: number, payment_method: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expenses/${expenseId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    description: description,
                    date: date,
                    expense_category: expense_category,
                    payment_method: payment_method
                }),
            });

            if (!response.ok) {
                throw new Error(`Updating expense failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('expense() error:', error);
            throw error;
        }
    }

    async getExpenseById(token: string, expenseId: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expenses/${expenseId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`Fetching expense by id failed: ${response.statusText}`);
            return await response.json();
        }catch (error) {
            console.error('expense() error:', error);
            throw error;
        }
    }

    async deleteExpense(token: string, expenseId: number): Promise<any>{
        try{
            const response = await fetch(`${this.apiUrl}/expenses/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Deleting expense failed: ${response.statusText}`);
            }

            return await response.json();
        }catch (error) {
            console.error('expense() error:', error);
            throw error;
        }
    }
}