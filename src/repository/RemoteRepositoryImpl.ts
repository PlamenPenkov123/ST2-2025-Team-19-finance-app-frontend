import type {RemoteRepository} from "./RemoteRepository.ts";

export class RemoteRepositoryImpl implements RemoteRepository {
    private apiUrl: string = 'http://localhost:8000/api';

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

            const data = await response.json();
            return data; // Token or user info
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
            console.log({
                username,
                email,
                password,
                password_confirm: passwordConfirm,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
            });

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

            const data = await response.json();
            return data;
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
}