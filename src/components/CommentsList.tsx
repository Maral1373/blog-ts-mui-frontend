import Delete from "@mui/icons-material/Delete";
import ThumbDown from "@mui/icons-material/ThumbDown";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { IconButton, Container, Typography, useTheme } from "@mui/material";

export default function CommentList({ comments, deleteComment, likeComment }) {
	const theme = useTheme();
	console.log(comments);
	return (
		<>
			{comments.map((comment) => (
				<Container
					key={comment.id}
					style={{
						margin: theme.spacing(1),
						padding: theme.spacing(1),
						backgroundColor: theme.palette.background.main,
						borderRadius: theme.spacing(1),
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					<Typography variant="body1">{comment.text}</Typography>
					<IconButton onClick={() => likeComment(comment.id, "like")}>
						<ThumbUp />
					</IconButton>
					<Typography variant="subtitle1">{comment.likes}</Typography>
					<IconButton
						onClick={() => likeComment(comment.id, "dislike")}
					>
						<ThumbDown />
					</IconButton>
					<Typography variant="subtitle1">
						{comment.dislikes}
					</Typography>
					<IconButton onClick={() => deleteComment(comment.id)}>
						<Delete />
					</IconButton>
				</Container>
			))}
		</>
	);
}
