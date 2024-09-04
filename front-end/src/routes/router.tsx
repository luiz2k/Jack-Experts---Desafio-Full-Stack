import App from "@/App";
import { SignInPage } from "@/modules/auth/pages/SignIn";
import { SignUpPage } from "@/modules/auth/pages/SignUp";
import { HomePage } from "@/modules/dashboard/pages/Home";
import { NotFound } from "@/modules/shared/components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <NotFound />,
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
