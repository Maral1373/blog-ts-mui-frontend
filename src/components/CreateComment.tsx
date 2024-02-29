import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useRef } from "react";

export default function CreateComment() {
	const formRef = useRef(null);
	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		console.log(data.get("text"));
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
