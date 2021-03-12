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
import FormDialog from '../../common/formDialog/FormDialog';

// Custom styles - Material Card component
const customStyles = (theme) => ({ 
    avatarStyle: {
        float: 'right',
        width: '42%',
        height: '98%'
    },
    root: {
        margin: '15px auto',
        width: '80%',
        cursor: 'pointer'
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
            fullName: 'Subhankar Pradhan',
            updatedFullName: '',
            selectedPostDetails: {},
            openModal: false,
            postModal: false,
            editModal: false,
            nameFieldEmpty: 'dispNone'
        }
    }

    openEditModalhandler = () => {
        this.setState({ 
            editModal: true,
            postModal: false,
            openModal: true 
        });
    }
    openPostModalhandler = (selectedPost) => {
        this.setState({ 
            postModal: true,
            editModal: false,
            openModal: true,
            selectedPostDetails: selectedPost
        });
    }
    updateUserNameHandler = (updatedName) => {
        let updatedFullName = updatedName.trim();
        if(updatedFullName) {
            this.setState({ 
                fullName: updatedFullName,
                nameFieldEmpty: 'dispNone',
                updatedFullName
            });
        }
    }
    userNameSubmitHandler = () => {
        if(!this.state.updatedFullName) {
            this.setState({ nameFieldEmpty: 'dispBlock' });
            return;
        }else {
            this.setState({ 
                postModal: false,
                editModal: false,
                openModal: false,
                updatedFullName: '',
                nameFieldEmpty: 'dispNone'
            });
        }
    }
    closeFormDialogHandler = () => {
        this.setState({ 
            postModal: false,
            editModal: false,
            openModal: false,
            updatedFullName: '',
            nameFieldEmpty: 'dispNone'
        });
    }

    render() {
        const { classes } = this.props;
        let { openModal, postModal, editModal, fullName, profile_picture, instagram_posts, selectedPostDetails, nameFieldEmpty } = this.state;
        
        return(
            <React.Fragment>
                <FormDialog 
                    showModal={openModal} 
                    selectedAction={{
                        postModal,
                        editModal,
                        nameFieldEmpty
                    }}
                    selectedpostDetails={selectedPostDetails}
                    updateUserNameHandler={this.updateUserNameHandler}
                    userNameSubmitHandler={this.userNameSubmitHandler}
                    closeFormDialogHandler={this.closeFormDialogHandler}
                />
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
                        <h2>{(instagram_posts && instagram_posts.length > 0) && instagram_posts[0].username}</h2>
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
                                onClick={(e) => this.openEditModalhandler()}
                            >
                                <EditIcon className={classes.editIcon} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.root}>
                    <GridList cellHeight={300} cols={3}>
                        {(instagram_posts && instagram_posts.length > 0) && instagram_posts.map((post) => (
                        <GridListTile key={post.media_url} onClick={(e) => this.openPostModalhandler(post)}>
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