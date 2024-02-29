import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WritePost from "./pages/WritePost";

const AppRoutes = () => {

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Register" element={<Register />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Write" element={<WritePost />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default AppRoutes;
