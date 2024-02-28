import * as React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	Button,
	Divider,
	ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

interface Props {
	window?: () => Window;
	children: React.ReactNode;
}

const drawerWidth = 240;
const navBarItems = [
	{ text: "Home", icon: <HomeIcon />, link: "/" },
	{ text: "Register", icon: <InfoIcon />, link: "/Register" },
];

export default function DrawerAppBar(props: Props) {
	const { window, children } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				MUI
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
						MUI
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
