import React, { useState } from "react";
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
import {
  Avatar,
  Button,
  Input,
  Modal,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { sidebarEdit, sidebarItems, sidebarLevel } from "../utils/data";
import { Link, Route, Routes } from "react-router-dom";
import { ArchiveNotes, Bin, HomePage, LabelNotes } from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../features/user/userSlice";
import {
  Add,
  CloseOutlined,
  Delete,
  LabelOutlined,
  LabelRounded,
} from "@mui/icons-material";
import { createLabel } from "../utils/labels/createLabel";
import { labelsInfo, setLabels } from "../features/labels/labelSlice";
import { fetchAllLabels } from "../utils/labels/fetchAllLabels";
import { updateLabel } from "../utils/labels/updateLabel";
import { deleteLabel } from "../utils/labels/deleteLabel";

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

export default function LayOut() {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const user = useSelector(userInfo);
  const [openModal, setOpenModal] = useState(false);
  const [labelName, setLabelName] = useState("");
  const [newLabelName, setNewLabelName] = useState("");
  const [labelId, setLabelId] = useState(null);
  const labels = useSelector(labelsInfo);
  const dispatch = useDispatch();
  // console.log(labels);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const getLabels = async (id) => {
    const data = await fetchAllLabels(id);
    const labels = await data?.labels;
    dispatch(setLabels(labels));
  };

  const handleClick = async () => {
    setLabelName("");

    let labelData = {
      name: labelName,
    };

    let userId = user?.id;

    let data = await createLabel(labelData, userId);
    getLabels(userId);
  };

  const editLabel = async () => {
    let labelData = {
      name: newLabelName,
    };

    let userId = user?.id;

    console.log(newLabelName);
    console.log(userId);
    console.log(labelId);

    let data = await updateLabel(labelData, userId, labelId);
    // console.log(data);
    getLabels(userId);
  };

  const handleDeleteLabel = async () => {
    let userId = user?.id;
    const data = await deleteLabel(userId, labelId);

    getLabels(userId);
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
          {/* edit label */}
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
              onClick={() => setOpenModal(!openModal)}
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

          {labels?.length !== 0 &&
            labels?.map((label) => (
              <Link
                to={`/label/${label?._id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={label?._id}
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
                      <LabelOutlined />
                    </ListItemIcon>
                    <ListItemText
                      primary={label?.name}
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="archive" element={<ArchiveNotes />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/label/:labelId" element={<LabelNotes />} />
        </Routes>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Paper
            sx={{
              maxWidth: "250px",
              height: "250px",
              p: 2,
              position: "relative",
            }}
            square
          >
            <Typography variant="subtitle2" gutterBottom>
              Edit labels
            </Typography>

            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                top: 1,
                right: 1,
                zIndex: 5,
              }}
            >
              <CloseOutlined />
            </IconButton>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Input
                placeholder="Create a new label"
                type="text"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  handleClick();
                  setOpenModal(false);
                }}
              >
                <Add />
              </IconButton>
            </Stack>
            <List
              sx={{
                height: "150px",
                overflowY: "auto",
              }}
            >
              {labels?.map((label) => (
                <ListItem disablePadding key={label?._id}>
                  <ListItemButton
                    onClick={() => {
                      setLabelId(label?._id);
                      setOpenEditModal(true);
                    }}
                  >
                    <ListItemIcon>
                      <LabelRounded />
                    </ListItemIcon>
                    <ListItemText primary={label?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Modal
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  position: "relative",
                }}
              >
                <Paper
                  sx={{
                    maxWidth: "250px",
                    height: "250px",
                    p: 2,
                    position: "relative",
                  }}
                  square
                >
                  <Typography variant="subtitle2" gutterBottom>
                    New name for label
                  </Typography>

                  <IconButton
                    onClick={() => setOpenEditModal(false)}
                    sx={{
                      position: "absolute",
                      top: 1,
                      right: 1,
                      zIndex: 5,
                    }}
                  >
                    <CloseOutlined />
                  </IconButton>

                  <Stack direction="row" alignItems="center" spacing={1} my={2}>
                    <Input
                      placeholder="New name"
                      type="text"
                      value={newLabelName}
                      onChange={(e) => setNewLabelName(e.target.value)}
                    />
                    <IconButton
                      onClick={() => {
                        editLabel();
                        setOpenEditModal(false);
                        setOpenModal(false);
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                  <Tooltip
                    title="Delete label"
                    placement="bottom"
                    sx={{
                      position: "absolute",
                      bottom: 3,
                      right: 3,

                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleDeleteLabel();
                        setOpenEditModal(false);
                        setOpenModal(false);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Box>
            </Modal>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
}
