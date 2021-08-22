import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import store from '../../app/store';
import { toggle } from '../NavLayer/NavLayerSlice';
import { connect, useDispatch } from 'react-redux';
import { logOut } from '../Security/Cookie';
import { defaultUser } from '../AppWraper/AppWraperSlice';
import { invalid, origin, valid } from '../AlertMsg/AlertMsgSlice';

export function NavBar(props) {

    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: "black!important",
          justifyContent: 'center',
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
          textAlign: 'center',
          fontFamily: 'Duck',
          fontSize: '2.5rem',
        },
        appBar : {
          backgroundColor: "#222629",
        }
      }));

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const toggleMenu = () => {
      dispatch(toggle());
    }

    const handleLogOut = async () => {
      let resLogOut = await logOut().then(res => res);
      if (resLogOut.logged === false) {
        dispatch(valid({msg: "Déconnecté."}))
        dispatch(defaultUser());
        handleClose();
        setTimeout(() => {
          dispatch(origin());
        }, 2500);
      }
    }
    
    return(
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              myTEAM
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                {store.getState().appwrap.logged === false ?
                <div>
                <MenuItem disabled>Visiteur</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}><Link to="/join">Create an account</Link></MenuItem>
                  <MenuItem onClick={handleClose}><Link to="/login">Sign In</Link></MenuItem>
                  <MenuItem disabled onClick={handleClose}>My team</MenuItem>
                  <MenuItem disabled onClick={handleClose}>My friends</MenuItem>
                  <MenuItem disabled onClick={handleClose}>Last activitys</MenuItem>
                  <Divider />
                </div>
                :
                <div>
                <MenuItem disabled>{store.getState().appwrap.user.userName}</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}><Link to="">My account</Link></MenuItem>
                  <MenuItem onClick={handleClose}>My team</MenuItem>
                  <MenuItem onClick={handleClose}>My friends</MenuItem>
                  <MenuItem onClick={handleClose}>Last activitys</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </div>
                }
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
}
export default connect()(NavBar);