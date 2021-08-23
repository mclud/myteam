import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import NoteIcon from '@material-ui/icons/Note';
import StoreIcon from '@material-ui/icons/Store';
import ChatIcon from '@material-ui/icons/Chat';
import store from '../../app/store';
import { connect, useDispatch } from 'react-redux';
import NavLayerSlice, { selectNavLayer, toggle } from './NavLayerSlice';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export function NavLayer(props) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

          <ListItem button key="Home">
            <ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>
            <Link to="/"><ListItemText primary={"Home"} /></Link>
          </ListItem>
          <ListItem button key="News">
            <ListItemIcon><NoteIcon></NoteIcon></ListItemIcon>
            <ListItemText primary={"News"} />
          </ListItem>
          <ListItem button key="Chat">
            <ListItemIcon><ChatIcon></ChatIcon></ListItemIcon>
            <Link to="/live"><ListItemText primary={"Chat"}></ListItemText></Link>
          </ListItem>
          <ListItem button key="Events">
            <ListItemIcon><EventIcon></EventIcon></ListItemIcon>
            <ListItemText primary={"Events"} />
          </ListItem>
          <ListItem button key="Fields">
            <ListItemIcon><GpsFixedIcon></GpsFixedIcon></ListItemIcon>
            <ListItemText primary={"Fields"} />
          </ListItem>
          <Divider/>
          <ListItem button key="Shop" disabled>
            <ListItemIcon><StoreIcon></StoreIcon></ListItemIcon>
            <Link to="/shop"><ListItemText primary="Shop"></ListItemText></Link>
          </ListItem>
          <Divider></Divider>
          <ListItem button key="About us">
            <ListItemIcon><NoteIcon></NoteIcon></ListItemIcon>
            <ListItemText primary={"About us"} />
          </ListItem>
      </List>
    </div>
  );

  useEffect(() => {
    if (store.getState().navlayer.open && !state.left) {
      setState({ ...state, left: true });
    }
    else if (store.getState().navlayer.open && state.left) {
      dispatch(toggle());
    }
  })

  return (
    <div>

        <React.Fragment key="left">
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>

    </div>
  );
}
const mapStateToProps = (state) => ({
  navlayer: selectNavLayer(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(NavLayerSlice, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavLayer);
