import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { JSX } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./router/AppRouter";
import theme from "./styles/theme";
import store from "./redux/store";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		},
	});

function App(): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<BrowserRouter>
							<AppRouter />
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default App;
