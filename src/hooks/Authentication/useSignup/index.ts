import { useRef, useEffect } from "react";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { useNavigate } from "react-router-dom";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // リダイレクト用の関数
  const navigate = useNavigate();

  // userを追加するためのGraohQL Mutation Hooks
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    if (!nameRef.current?.value) {
      setError("name", "名前が入力されていません");
      invalidValidation = true;
    }

    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください");
      invalidValidation = true;
    }

    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください");
      invalidValidation = true;
    }

    return invalidValidation;
  }

  // 実際のサインアップのロジック
  const signup = async () => {
    // Firebaseのサインアップ処理を実行
    const { user } = await fireSignup({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ユーザーの登録に失敗しました。");
    }

    // Hasuraにuserを作成する
    const apolloResponse = await insertMutation({
      variables: {
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
      navigate("/");
    } else {
      throw new Error("ユーザーの登録に失敗しました。");
    }
  };


  const { authExecute, error, setErrorHander, loading } = useAuthHelper(
    signup,
    formValidation
  );

  useEffect(() => {
    if (apolloError?.message) {
      setErrorHander("main", apolloError.message);
    }
  }, [apolloError]);

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup,
    error,
    loading,
  };
};
