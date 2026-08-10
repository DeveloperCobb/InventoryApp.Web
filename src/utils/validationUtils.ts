export class ValidationUtils{ 

    public static isValidUsername(username: string): boolean {
        const alphanumericRegex = /^[A-Za-z0-9]{8,15}$/;
        return alphanumericRegex.test(username);
    }

    public static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public static isValidPassword(password: string) : boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;
        return passwordRegex.test(password);
    }
}