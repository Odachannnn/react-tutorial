import { execute } from "graphql";
import { useState } from "react";

// どのタイプのエラーなのかを管理するための型
// main: 認証全体での、ネットワークエラ〜やサーバー側のエラーを格納
// name: Name入力フォームに関するエラー
// email, password：name同様
export type ErrorState = "main" | "name" | "email" | "password";

export type SetErrorFn = (name: ErrorState, message: string) => void;


/**
 * useAuthHelper()をするときに、呼び出し元からそれぞれの処理の実態を注入する
 * 
 * @param executeProcess 実際に認証処理の実態を外部から追加する
 * @param formValidation バリデーションチェックの実態を外部から追加する
 * @returns 
 */
export const useAuthHelper = (
  executeProcess: () => Promise<void>,
  formValidation: (setError: SetErrorFn) => boolean
) => {
  // 複数のエラーを同時に管理できるようにするためのstate
  // Mapは{ key: value }の形でオブジェクトを管理できるJavaScriptのデータ構造(便利なメソッドがたくさん)
  const [error, setError] = useState<Map<ErrorState, string>>(new Map());
  
  // ローディング処理も合わせて共通化
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorHander: SetErrorFn = (name, message) => {
    // エラ〜セット
    setError((prev) => new Map(prev.set(name, message)));
  }

  const authExecute = async () => {
    // 認証したら、一度エラー分をリセット
    setError(new Map());

    // バリデーションの確認
    const invalidValidation = formValidation(setErrorHander);

    // バリデーションに問題あれば処理を中断
    if (invalidValidation) return;

    // 処理が開始したらローディング中
    setLoading(true);

    try {
      // 認証ロジックを実行 成功すればリダイレクト処理
      await executeProcess();
    } catch(error) {
      setErrorHander("main", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    authExecute,
    loading,
    error,
    setErrorHander
  };
}
