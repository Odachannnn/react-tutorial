import { fireAuth } from "./config";

export type FireLoginType = {
    email: string;
    password: string;
};

/**
 * ログイン処理
 * @param { email, password}
 * @returns Promise<firebase.auth.UserCredential>
 */
export const login = ({ email, password }: FireLoginType) =>
    fireAuth.signInWithEmailAndPassword(email, password);
