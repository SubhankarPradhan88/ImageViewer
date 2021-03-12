import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';

import './Profile.css';
import Header from '../../common/header/Header';

// Custom styles - Material Card component
const customStyles = (theme) => ({ 
    avatarStyle: {
        float: 'right',
        width: '42%',
        height: '98%'
    },
    root: {
        margin: '15px auto',
        width: '80%'
    },
    editIcon: {
        fontSize: 17
    },
    button: {
        height: 35,
        minWidth: 35,
        padding: 0,
        margin: '-7px 0 0 10px',
        borderRadius: '100%'
    }
})

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: sessionStorage.getItem('profile-picture'),
            instagram_posts: JSON.parse(sessionStorage.getItem('instagram-posts')),
            fullName: 'Subhankar Pradhan'
        }
    }

    render() {
        const { classes } = this.props;
        let { fullName, profile_picture, instagram_posts } = this.state;
        console.log('instagram_posts', instagram_posts);
        
        return(
            <React.Fragment>
                <Header 
                    displayItems = {{
                        displaySearchBar: false,
                        displayProfilePic: true,
                        userPicture: profile_picture
                    }}
                />
                <div className="account-info-container">
                    <div>
                        <Avatar src={profile_picture} alt="Profile picture" className={classes.avatarStyle} />
                    </div>
                    <div>
                        <h2>{instagram_posts[0].username}</h2>
                        <div className="profile-info-wrapper">
                            <div>Posts: 11</div>
                            <div>Follows: 12</div>
                            <div>Followed By: 22</div>
                        </div>
                        <div className="flex font-weight-600">
                            {fullName}
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                <EditIcon className={classes.editIcon} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.root}>
                    <GridList cellWidth={200} cellHeight={300} className={classes.gridList} cols={3}>
                        {instagram_posts.map((post) => (
                        <GridListTile key={post.media_url}>
                            <img src={post.media_url} alt="Picture post" width="200" height="300" />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Profile);