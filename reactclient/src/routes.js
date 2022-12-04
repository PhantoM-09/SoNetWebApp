import Profile from "./component/functionality/Profile"
import AuthForm from "./component/login/Auth"
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <Profile/>
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