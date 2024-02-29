import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { createPost } from "../redux/reducers/postsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
	const formRef = useRef(null);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		dispatch(
			createPost({
				title: data.get("title"),
				text: data.get("text"),
				author: loggedInUser.username,
				token: loggedInUser.token,
			})
		);
		formRef.current.reset();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Typography component="h1" variant="h5">
				Say something
			</Typography>
			<form onSubmit={onSubmit} ref={formRef} noValidate>
				<TextField
					// variant="outlined"
					margin="normal"
					required
					fullWidth
					id="title"
					label="Title"
					name="title"
					autoFocus
				/>
				<TextField
					// variant="outlined"
					margin="normal"
					required
					fullWidth
					multiline
					name="text"
					label="Text"
					type="text"
					id="text"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
