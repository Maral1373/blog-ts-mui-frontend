import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import {
	Box,
	Button,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	window?: () => Window;
	children: React.ReactNode;
}

const drawerWidth = 240;

export default function Layout(props: Props) {
	const loggedInUser = useSelector((state) => state.users.loggedInUser);
	const logoutUser = useSelector((state) => state.users.logoutUser);
	const { window, children } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const dispatch = useDispatch();

	const navBarItems = [
		{ text: "Home", icon: <HomeIcon />, link: "/" },
		{ text: "Register", icon: <InfoIcon />, link: "/Register" },
		{
			text: loggedInUser ? "Logout" : "Login",
			icon: <InfoIcon />,
			link: loggedInUser ? "/Login" : "/Login",
		},
		{ text: "Write Post", icon: <InfoIcon />, link: "/Write" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Blog
			</Typography>
			<Divider />
			<List>
				{navBarItems.map((item) => (
					<ListItem key={item.text}>
						<ListItemButton component={Link} to={item.link}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const handleLogoutuser = () => {
		dispatch(logoutUser());
	};
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}
					>
						Blog
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navBarItems.map((item) => (
							<Button
								key={item.text}
								sx={{ color: "#fff" }}
								component={Link}
								to={item.link}
							>
								{item.text}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
			<Box component="main" sx={{ p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}
