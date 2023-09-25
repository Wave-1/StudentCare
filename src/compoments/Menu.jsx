import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate,useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppStore } from '../appStore';


const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Menu() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  // Lấy RoleID từ sessionStorage
  const roleID = sessionStorage.getItem('RoleID');

    
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  navigate(item.path); // Chuyển hướng đến đường dẫn tương ứng
};

    // Define your menu items
    const menuItemsAdmin = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Student Information', icon: <PersonIcon />, path: '/Admin/Student' },
      { text: 'Teacher Information', icon: <PersonIcon />, path: '/Admin/Teacher' },
      { text: 'Work Schedule', icon: <CalendarMonthIcon />, path: '/Admin/Workschedule' },
      { text: 'About', icon: <InfoIcon />, path: '/about' },
    ];
    const menuItemsStudent = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Student Information', icon: <PersonIcon />, path: '/Student/Student' },
      { text: 'Work Schedule', icon: <CalendarMonthIcon />, path: '/Student/Workschedule' },
      { text: 'Thắc Mắc', icon: <HomeIcon />, path: '/Student/Inquiries' },
      { text: 'Giấy Chứng Nhận', icon: <HomeIcon />, path: '/Student/Certificates' },
      { text: 'About', icon: <InfoIcon />, path: '/about' },
    ];
  
  const renderAdminMenu = () => {
    return (
      <List>
      {menuItemsAdmin.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => handleItemClick(item)} // Handle item click
          selected={location.pathname === item.path} // Highlight the selected item
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    );
  };

  const renderTeacherMenu = () => {
    return (
                <List>
                {/* Student */}
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/Teacher/Student') }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Student Information" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* Teacher */}
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/Teacher/Teacher') }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teacher Information" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {/* Workschedule */}
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/Teacher/Workschedule') }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary="Work Schedule" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </List>
    );
  };

  const renderStudentMenu = () => {
    return (
      <List>
      {menuItemsStudent.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => handleItemClick(item)} // Handle item click
          selected={location.pathname === item.path} // Highlight the selected item
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        {/* Hiển thị menu dựa trên RoleID */}
        {roleID === '1' && renderAdminMenu()}
        {roleID === '2' && renderTeacherMenu()}
        {roleID === '3' && renderStudentMenu()}
      </Drawer>
    </Box>
  );
}