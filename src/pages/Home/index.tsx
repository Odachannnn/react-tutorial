import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { VideoCard } from "../../components/VideoCard";

// GraphQLのコア
// QueryやSchemaを書くことで、GraphQLにどのようなデータを取得させるのか、更新させるのかを指示する

const query = `
    query User {
        users {
            id
            name
            profile_photo_url
            created_at
            updated_at
        }
    }
`;

let called = false;
const apiKEY : string = process.env.REACT_APP_X_HASURA_ADMIN_SECRET!; 

export const Home = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        // ステートが更新されると、コンポーネントも更新されるためuseEffect内の関数も呼び出される。
        // 無限ループを防ぐために、一度関数を呼んだら複数呼ばないようにする

        if (!called) {
            // Hasuraのコンソールに記載されているGraphQLエンドポイント
            fetch("https://dominant-garfish-81.hasura.app/v1/graphql", {
                method: "post",

                // 認証のためのリクエストヘッダー
                // Hasuraはheadersに記載されている認証情報で、リクエストが許可されているかを判断する
                // 今回はAdminのsecret keyを記載しているのでHasura内の全てのリソースにアクセスできる
                headers: {
                    "Content-Type": "application/json",
                    // "x-hasura-admin-secret": apiKEY,
                    "x-hasura-admin-secret": apiKEY,
                },

                // GraphQLのリクエスト内容の本体
                // bodyに`query`や値を格納して、GraphQLにどのような処理をして欲しいか指示を出す
                body: JSON.stringify({ query }),
            }).then(async(res) => {
                called = true;

                // `fetch`関数の定型文
                // レスポンスをjson形式にフォーマットするtことでJSで扱えるオブジェクトにする
                const json = await res.json(); 

                // GraphQLは、Responseに`errors`を含んだ状態でエラーを返す
                // ＝＞通常のpromiseでエラーハンドリングでcatchしようとすると、GraphQLではerrorを特定できない
                if (json?.errors) {
                    console.log(json.errors);
                }

                // GraphQLは必ずdataという名前のメソッド中にデータを格納してくる
                if (json?.data?.users.length) {
                    const user = json.data.users[0];
                    setUser(user);
                }

            })
        } 
    })

    return (
        <Container>
            {user?.name}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
                <Grid item xs={3}>
                    <VideoCard />
                </Grid>
            </Grid>
        </Container>
    );
};
