export interface RemoteRepository {
    // Auth api functions
    login(email: string, password: string): Promise<any>;
    register(username: string, email: string, password: string, passwordConfirm: string, firstName: string, lastName: string, phoneNumber: string): Promise<any>;
    me(bearer: string): Promise<any>;
}