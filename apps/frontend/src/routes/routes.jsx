import App from "../App";
import Login from "../components/forms/Login";
import CustomErrorBoundary from "../errors/CustomErrorBoundary";
import Register from "../components/forms/Register";

const routes = [
    {
        path: '/auth/login',
        element: <Login />,
        errorElement: <CustomErrorBoundary />,
    },
    {
        path: '/auth/register',
        element: <Register />,
        errorElement: <CustomErrorBoundary />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                errorElement: <CustomErrorBoundary />,
                children: [
                    {
                      path: '*',
                      element: <CustomErrorBoundary isPageNotFound={true}/>
                    }
                ],
            },
        ],
    },
];

export default routes;
