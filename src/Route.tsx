import { Navigate, useRoutes } from "react-router-dom";

import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";

import { Home } from "./pages/Home";
import { Watch } from "./pages/Watch";
import { Upload } from "./pages/Upload";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";


export const RootRouter = () => {
    return useRoutes([
        {
            element : <HomeLayout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/upload", element: <Upload />}
            ]
        },
        {
            element: <SideLessHomeLayout />,
            children: [
                { path: "watch", element: <Navigate to="/" />},
                { path: "watch/:videoId", element: <Watch /> }
            ],
        },
        {
            element: <SimpleLayout />,
            children: [
                { path: "login", element: <Login /> },
                { path: "signup", element: <Signup /> },
                { path: "forget", element: <div>パスワードリセット</div> },
                { path: "404", element: <div>Not Found</div> },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        { path: "*", element: <Navigate to="/" /> },
    ]);  
};
