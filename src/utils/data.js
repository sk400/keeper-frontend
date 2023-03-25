import {
  LightbulbOutlined,
  CreateOutlined,
  ArchiveOutlined,
  DeleteOutline,
  FiberManualRecord,
} from "@mui/icons-material";

export const sidebarItems = [
  {
    name: "Notes",
    icon: <LightbulbOutlined />,
    path: "/",
  },

  {
    name: "Archive",
    icon: <ArchiveOutlined />,
    path: "/archive",
  },
  {
    name: "Bin",
    icon: <DeleteOutline />,
    path: "/bin",
  },
];

export const sidebarLevel = {
  name: "Lebel",
  icon: <FiberManualRecord />,
};

export const sidebarEdit = {
  name: "Edit lebel",
  icon: <CreateOutlined />,
};
