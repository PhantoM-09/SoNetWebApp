import MainFunctionality from "./component/functionality/MainFunctionality"
import AuthForm from "./component/login/Auth"
import { CONTROL_ROUTE, FRIEND_ROUTE, LOGIN_ROUTE, MESSAGE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, STRANGE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <MainFunctionality/>
    },
    {
        path: FRIEND_ROUTE,
        Component: <MainFunctionality/>
    },
    {
        path: MESSAGE_ROUTE,
        Component: <MainFunctionality/>
    },
    {
        path: STRANGE_ROUTE,
        Component: <MainFunctionality/>
    },
    {
        path: CONTROL_ROUTE,
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