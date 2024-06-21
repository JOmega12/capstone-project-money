export const isPasswordValid = (passwordInput: string) => {
    const regex = /^(?=.*[A-Z]).{5,}$/;
    return regex.test(passwordInput);
 }