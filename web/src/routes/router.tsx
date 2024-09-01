import App from "@/App";
import { SignInPage } from "@/modules/auth/pages/SignIn";
import { SignUpPage } from "@/modules/auth/pages/SignUp";
import { HomePage } from "@/modules/dashboard/pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/entrar",
				element: <SignInPage />,
			},
			{
				path: "/registro",
				element: <SignUpPage />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
