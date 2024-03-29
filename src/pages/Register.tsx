import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/reducers/usersSlice";

export default function RegisterForm() {
	const formRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		dispatch(
			registerUser({
				username: data.get("username"),
				email: data.get("email"),
				password: data.get("password"),
			})
		);
		formRef.current.reset();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<form noValidate onSubmit={onSubmit} ref={formRef}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoComplete="username"
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="new-password"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					Register
				</Button>
			</form>
		</Container>
	);
}
