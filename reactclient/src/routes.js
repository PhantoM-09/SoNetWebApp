import AuthForm from "./component/login/Auth"
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [

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