import { Container } from "@mui/material";
import PostItem from "./PostItem";

export default function PostList({
	posts,
	deletePost,
	likePost,
	onSearch,
	selectedUser,
}) {
	const filteredPosts = selectedUser
		? posts.filter((post) => post.author === selectedUser)
		: posts;
	const searchPost = onSearch
		? filteredPosts.filter(
				(post) =>
					post.text.toLowerCase().includes(onSearch.toLowerCase()) ||
					post.title.toLowerCase().includes(onSearch.toLowerCase())
		  )
		: filteredPosts;
	return (
		<Container>
			{searchPost.map((post) => {
				return (
					<PostItem
						key={post.id}
						post={post}
						deletePost={deletePost}
						likePost={likePost}
						selectedUser={selectedUser}
					/>
				);
			})}
		</Container>
	);
}
