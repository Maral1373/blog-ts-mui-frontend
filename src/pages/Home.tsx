import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/reducers/usersSlice";
import {
	getPosts,
	deletePost,
	likePost,
	dislikePost,
} from "../redux/reducers/postsSlice";
import { useEffect, useState } from "react";
import PostList from "../components/PostList";

export default function Home() {
	const users = useSelector((state) => state.users.users);
	const posts = useSelector((state) => state.posts.posts);
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const [selectedUser, setSelectedUser] = useState("");
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	const handleChange = (event) => {
		setSelectedUser(event.target.value);
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const handleDeletePost = async (postId) => {
		await dispatch(deletePost({ postId, token: loggedInUser.token }));
	};

	const handleLikePost = async (postId, type) => {
		if (type === "like") {
			await dispatch(likePost({ postId }));
		} else {
			await dispatch(dislikePost({ postId }));
		}
		dispatch(getPosts());
	};

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getPosts());
	}, []);

	console.log("users", users);

	return (
		<Box sx={{ display: "flex" }}>
			<FormControl sx={{ width: 200 }} fullWidth>
				<Select
					value={selectedUser}
					onChange={handleChange}
					displayEmpty
				>
					<MenuItem value="">All users</MenuItem>
					{users.map((user) => {
						return (
							<MenuItem key={user.id} value={user.username}>
								{user.username}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<TextField
				label="Search"
				variant="outlined"
				size="medium"
				value={search}
				onChange={handleSearch}
				sx={{ width: 600 }}
			/>
			<PostList
				posts={posts}
				deletePost={handleDeletePost}
				likePost={handleLikePost}
				onSearch={search}
				selectedUser={selectedUser}
			/>
		</Box>
	);
}
