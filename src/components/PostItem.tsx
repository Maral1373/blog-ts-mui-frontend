import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import CreateComment from "./CreateComment";

export default function PostItem({ post, deletePost, likePost }) {
	// const theme = useTheme();

	return (
		<Card
			key={post.id}
			sx={{ width: 800, background: "#D8B188", margin: 2 }}
		>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{post.title}
				</Typography>
				<Typography variant="body1">{post.text}</Typography>
			</CardContent>
			<CardActions>
				{/* <IconButton style={{ color: theme.palette.primary.main }}> */}
				<IconButton onClick={() => likePost(post.id, "like")}>
					<ThumbUpIcon />
				</IconButton>
				<Typography variant="subtitle1">{post.likes}</Typography>
				<IconButton onClick={() => likePost(post.id, "dislike")}>
					<ThumbDownIcon />
				</IconButton>
				<Typography variant="subtitle1">{post.dislikes}</Typography>
				<IconButton>
					<CommentIcon />
				</IconButton>
				<IconButton
					// color="error"
					onClick={() => deletePost(post.id)}
					size="large"
				>
					<Delete />
				</IconButton>
				<Typography
					sx={{
						position: "absolute",
						right: "65rem",
						margin: 26,
						fontSize: 16,
					}}
					variant="subtitle1"
				>
					Author: {post.author}
				</Typography>
				<CreateComment />
			</CardActions>
		</Card>
	);
}
