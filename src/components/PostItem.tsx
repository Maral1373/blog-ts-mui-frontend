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
import CommentsList from "./CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	deleteComment,
	getComments,
	likeComment,
	dislikeComment,
} from "../redux/reducers/commentsSlice";

export default function PostItem({ post, deletePost, likePost }) {
	const comments = useSelector((state) => state.comments.comments);
	console.log("comments", comments);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const dispatch = useDispatch();
	// const theme = useTheme();

	const handleDeleteComment = async (commentId) => {
		await dispatch(deleteComment({ commentId, token: loggedInUser.token }));
		dispatch(getComments({ postId: post.id }));
	};

	const handleLikeComment = async (commentId, type) => {
		if (type === "like") {
			await dispatch(likeComment({ commentId }));
		} else {
			await dispatch(dislikeComment({ commentId }));
		}
		dispatch(getComments({ postId: post.id }));
	};

	useEffect(() => {
		dispatch(getComments({ postId: post.id }));
	}, []);
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
				<IconButton onClick={() => deletePost(post.id)} size="large">
					<Delete />
				</IconButton>
				<Typography
					// sx={{
					// 	position: "absolute",
					// 	right: "65rem",
					// 	margin: 26,
					// 	fontSize: 16,
					// }}
					variant="subtitle1"
				>
					Author: {post.author}
				</Typography>
				<CreateComment postId={post.id} />
				<CommentsList
					comments={comments[post.id] || []}
					deleteComment={handleDeleteComment}
					likeComment={handleLikeComment}
				/>
			</CardActions>
		</Card>
	);
}
