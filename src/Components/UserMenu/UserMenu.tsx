import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import avatar from '../../assets/avatar.svg';
import { Translate } from '@mui/icons-material';

const UserMenu: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
          <Avatar alt="User Avatar" src={avatar} sx={{ width: 40, height: 40, borderRadius: '50%' }} />
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
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography 
            sx={{
              color: '#FFFFFF',
              fontSize: '25px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #BE82CB,#70BCBE, #6D99D3 )',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mukesh
          </Typography>
          <Avatar 
            alt="User Avatar" 
            src={avatar} 
            sx={{ width: 40, height: 40, borderRadius: '50%', marginLeft: '10%', marginRight: '2%' }} 
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
        <MenuItem onClick={handleCloseUserMenu} sx={{
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
