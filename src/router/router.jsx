import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainLayouts from "../layouts/MainLayouts";
import TodoListPage from "../pages/TodoListPage";
import RegisterPage from "../pages/RegisterPage";
import LoadingPage from "../pages/LoadingPage";
import useUserInfo from "../stores/userInfo";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayouts/>,
            children: [
                {
                    index:true,
                    element:<LoginPage/>
                },
                {
                    path:'todolist',
                    element:<TodoListPage/>
                },
                {
                    path:'register',
                    element:<RegisterPage/>
                },
                {
                    path:'loadingpage',
                    element:<LoadingPage/>
                }

            ]
        }
    ]
)

export default router