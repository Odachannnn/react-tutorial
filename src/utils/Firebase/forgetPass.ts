import { fireAuth } from "./config";

/**
 * パスワードリセット用のメールを送信する関数
 * @param email
 * @returns
 */
export const forgetPass = (email: string) =>
    fireAuth.sendPasswordResetEmail(email);
    