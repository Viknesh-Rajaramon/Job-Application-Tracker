import { Routes, Route } from "react-router-dom";

import routesData from "../constants/routes";
import PrivateRoute from "./PrivateRoute";
import { AuthLayout, DefaultLayout } from "../layout";

const AppRouter = () => {
	const { defaultRoutes, authRoutes } = routesData;

	return (
		<Routes>
			<Route element={<AuthLayout />}>
				{authRoutes.map(({ path, component: Component}) => (
					<Route
						path={path}
						element={<Component />}
					/>
				))}
			</Route>

			<Route element={<PrivateRoute />}>
				<Route element={<DefaultLayout />}>
					{defaultRoutes.map(({ path, component: Component}) => (
						<Route
							path={path}
							element={<Component />}
						/>
					))}
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRouter;
