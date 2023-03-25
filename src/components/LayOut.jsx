import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Stack } from "@mui/material";
import { sidebarEdit, sidebarItems, sidebarLevel } from "../utils/data";
import { Link, Route, Routes } from "react-router-dom";
import { Archive, Bin, HomePage, LabelNotes } from "../pages";
import { useSelector } from "react-redux";
import { userInfo } from "../features/user/userSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: "100%",

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LayOut({ children }) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector(userInfo);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "0.5px solid",
          borderColor: "#D8D8D8",
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <img
                alt=""
                src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                style={{
                  width: "40px",
                }}
              />
              <Typography fontSize="24px" color="gray" fontWeight="">
                Keeper
              </Typography>
            </Stack>
            <Avatar alt={user?.name} src={user?.image} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />

        <Divider />
        <List>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    backgroundColor: "#F0EB8D",
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.name}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

          <ListItem
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: "#F0EB8D",
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {sidebarEdit?.icon}
              </ListItemIcon>
              <ListItemText
                primary={sidebarEdit?.name}
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>

          <Link
            to={`/lebel/1`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "#F0EB8D",
                },
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {sidebarLevel?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={sidebarLevel?.name}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="archive" element={<Archive />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/lebel/:labelId" element={<LabelNotes />} />
        </Routes>
      </Box>
    </Box>
  );
}
