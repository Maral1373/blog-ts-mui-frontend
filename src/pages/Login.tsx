import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../redux/reducers/usersSlice";

export default function LoginForm() {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		dispatch(
			loginUser({
				email: data.get("email"),
				password: data.get("password"),
			})
		);
		formRef.current.reset();
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<CssBaseline />
			<div>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form noValidate onSubmit={onSubmit} ref={formRef}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
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
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}
