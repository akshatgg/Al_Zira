import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import avatar from '../../assets/avatar.svg';
import {handleLogout } from '../../Redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
// import { Translate } from '@mui/icons-material';


const UserMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
React.useEffect(
  () => {
  console.log(user);
  
  }
)


const handleLogoutClick = () => {
  console.log('logout');
  dispatch(handleLogout());
};


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src={avatar} sx={{ width:{lg:40, md:40, sm:30, xs:30}, height:{lg:40, md:40, sm:30, xs:30}, borderRadius: '50%' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          position: 'absolute',
          top: -20,
          right: 0,
          zIndex: 1,
          mt: '10px',
          '& .MuiPaper-root': {
            backgroundColor: '#6C6C6C',
            borderRadius: '10%',
            minWidth: '0%',
            padding: "5px,0px"
            
          }
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu} sx={{
          backgroundColor: '#6C6C6C',
          '&:hover': { backgroundColor: '#555555' },
          padding:{lg:'8px 24px',
            md: '6px 24px',
            sm: '0px 12px',
            xs: '0px 6px'
          },
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography 
            sx={{
              color: '#FFFFFF',
              fontSize: {lg:'25px',
                md:'25px',
                sm:'20px'
              },
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #BE82CB,#70BCBE, #6D99D3 )',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
             {user?.name ? user.name.split(' ')[0] : "Guest"}

          </Typography>
          <Avatar 
            alt="User Avatar" 
            src={avatar} 
            sx={{ width:{lg:40, md:40, sm:35, xs:30}, height:{lg:40, md:40, sm:35, xs:30}, borderRadius: '50%', marginLeft: '10%', marginRight: '2%' }} 
          />
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} sx={{
          backgroundColor: '#6C6C6C',
          '&:hover': { backgroundColor: '#555555' },
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px' }}>Setting</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} sx={{
          backgroundColor: '#6C6C6C',
          '&:hover': { backgroundColor: '#555555' },
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px' }}>Upgrade Plan</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick  } sx={{
          backgroundColor: '#6C6C6C',
          '&:hover': { backgroundColor: '#555555' },
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography sx={{ color: '#FFFFFF', fontSize: '14px' }}>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
