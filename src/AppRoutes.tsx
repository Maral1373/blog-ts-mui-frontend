import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Register from "./pages/Register";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/theme";

const AppRoutes = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Register" element={<Register />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default AppRoutes;
