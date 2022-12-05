import MainFunctionality from "./component/functionality/MainFunctionality"
import AuthForm from "./component/login/Auth"
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <MainFunctionality/>
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <AuthForm/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <AuthForm/>
    }
]