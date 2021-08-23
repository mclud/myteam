
import React, { useRef, useState } from "react";
import { createTheme } from '@material-ui/core/styles';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "./HomeSlider.css";
import JoinUs from '../../images/join.jpg';
import MakeATeam from '../../images/team.jpg';
import Fields from '../../images/terrains.jpg';
// import Swiper core and required modules
import SwiperCore, {Pagination,Navigation,Autoplay} from 'swiper/core';
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { useHistory } from "react-router";

// install Swiper modules
SwiperCore.use([Pagination,Navigation,Autoplay]);


export default function HomeSlider() {
const history = useHistory();
const useStyles = makeStyles({
    joinus: {
        background: `url(${JoinUs}) no-repeat center`,
        backgroundSize: 'cover',
    },
    team: {
        background: `url(${MakeATeam}) no-repeat center`,
        backgroundSize: 'cover',
    },
    fields: {
        background: `url(${Fields}) no-repeat center`,
        backgroundSize: 'cover',
    },
});

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #86c232 30%, #61892f 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 1px 5px 1px rgba(255, 105, 135, .3)',
        marginTop: '20px',
        fontFamily: 'coolvetica',
        letterSpacing : '2px',
        fontSize: '2rem',
    },
    label: {
        textTransform: 'uppercase',
    },
})(Button);

const classes = useStyles();

  return (
    <>
        <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{"clickable": true}} navigation={false} autoplay={{"delay": 4000,"disableOnInteraction": false}} className="mySwiper">
            <SwiperSlide className={classes.joinus}>
                <div>
                    <p>Are you ready to step your game up?</p>
                    <StyledButton>Join Us</StyledButton>
                </div>
            </SwiperSlide>
            <SwiperSlide className={classes.team}><p>Create a team, and invite your friends to play!</p></SwiperSlide>
            <SwiperSlide className={classes.fields}><p>Find a field, and see who's gonna play on it</p></SwiperSlide>
            <SwiperSlide><p>Schedule a game with your friends, and play against the world!</p></SwiperSlide>
            <SwiperSlide className={classes.chat}>
                <div>
                    <p>Just chill and meet new people</p>
                    <StyledButton onClick={() => history.push('/live')}>join the chat</StyledButton>
                </div>
            </SwiperSlide>
        </Swiper>
    </>
  )
}