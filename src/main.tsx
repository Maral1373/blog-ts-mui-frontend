import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<AppRoutes />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
