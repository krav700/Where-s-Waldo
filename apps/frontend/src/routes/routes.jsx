import App from "../App";
import CustomErrorBoundary from "../errors/CustomErrorBoundary";

const sharedChildren = {
    errorElement: <CustomErrorBoundary />,
    children: [
        {
            path: "*",
            element: <CustomErrorBoundary isPageNotFound={true} />,
        },
    ],
};

const routes = [
    {
        path: "/",
        element: <App />,
        children: [sharedChildren],
    },
    {
        path: "/maps/:mapsId",
        element: <App />,
        children: [sharedChildren],
    },
];

export default routes;
