import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../redux/reducers/commentsSlice";

export default function CreateComment({ postId }) {
	const loggedInUser = useSelector((state) => state.users.loggedInUser);

	const dispatch = useDispatch();
	const formRef = useRef(null);
	const onSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		console.log(data.get("text"));
		await dispatch(
			createComment({
				text: data.get("text"),
				postId,
				token: loggedInUser.token,
			})
		);
		await dispatch(getComments({ postId }));
		formRef.current.reset();
	};
	return (
		<Container component="main" maxWidth="sm">
			<form onSubmit={onSubmit} ref={formRef} noValidate>
				<TextField
					label="comment"
					multiline
					variant="filled"
					name="text"
					sx={{ marginRight: "5px" }}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ marginTop: "18px" }}
				>
					Publish
				</Button>
			</form>
		</Container>
	);
}
