import { fireAuth } from "./config";

export type FireSignupType = {
    email: string;
    password: string;
};

/**
 * サインアップ処理
 * @param {email, password}
 * @returns Promise<firebase.auth.UserCredential>
 */
export const signup = ({ email, password }: FireSignupType) =>
    fireAuth.createUserWithEmailAndPassword(email, password);
