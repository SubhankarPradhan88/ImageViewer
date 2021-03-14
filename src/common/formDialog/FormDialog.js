import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

import './FormDialog.css';

// Custom styles - Material Card component
const customStyles = (theme) => ({
    updateUserNameDialog: {
        marginTop: '-10%',
        marginLeft: '-25%'
    },
    updatePostsDialog: {
        margin: '0 auto'
    },
    postTitleWrapper: {
        width: 500,
        height: 'auto',
        alignItems: 'center'
    },
    postImageWrapper: {
        padding: 15,
        width: 'auto',
        height: 'auto'
    },
    postImage: {
        width: 350,
        height: 420
    },
    userNameContentStyle: {
        marginTop: -22
    },
    actionBtnAlignment: {
        paddingLeft: 22,
        paddingBottom: 20,
        justifyContent: 'flex-start'
    },
    editPostWrapper: {
        width: 750,
        height: 'auto',
        paddingBottom: 60,
        overflowY: 'visible',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userNameAlign: {
        paddingLeft: 20
    },
    postInfoWrapper: {
        display: 'flex',
        flexDirection: 'coloumn'
    },
    hashTags: {
        display: 'block',
        color: '#00376b'
    },
    commentContainer: {
        padding: '10px 10px 1px 0',
        width: 'auto'
    },
    commentSection: {
        width: 'auto',
        height: 'auto'
    },
    newCommentsWrapper: {
        marginTop: '35%',
        padding: '10px 10px 1px 10px',
        width: '45%',
        position: 'absolute'
    },
    textFieldWidth: {
        width: '80%'
    },
    likeAlignment: {
        margin: '55% 0 0 -5%',
        float: 'left',
        width: 'auto'
    },
    likeStyle: {
        color: '#000000'
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        color: red[500]
    }
});

class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.likedPostInfo = [];
        this.state = {
            selectedpostDetails: this.props.selectedpostDetails,
            allPostsDetails: JSON.parse(sessionStorage.getItem('instagram-posts'))
        };
    }
    // Common model / function to handle liked post for individual post
    addLikeHandler = (postId, likeCount) => {
        let { selectedpostDetails } = this.props;
        let likeDetails = {};
        likeDetails['id'] = postId;
        if(likeDetails['id']) {
            this.likedPostInfo.push(likeDetails);
        }
        for(let i = 0; i < this.likedPostInfo.length; i++) {
            if(postId === this.likedPostInfo[i].id) {
                selectedpostDetails['likeIcon'] = 'dispNone';
                selectedpostDetails['likedIcon'] = 'dispBlock';
                selectedpostDetails['likes'] = {
                    count: likeCount + 1
                }
            }
        }

        for(let i = 0; i < this.state.allPostsDetails.length; i++) {
            for(let j = 0; j < this.likedPostInfo.length; j++) {
                if(this.state.allPostsDetails[i]['id'] === selectedpostDetails['id']) {
                    this.state.allPostsDetails[i]['likes']['count'] = selectedpostDetails['likes']['count'];
                    this.state.allPostsDetails[i]['likeIcon'] = selectedpostDetails['likeIcon'];
                    this.state.allPostsDetails[i]['likedIcon'] = selectedpostDetails['likedIcon'];
                }
            }
        }
        this.setState({ selectedpostDetails });
        sessionStorage.setItem("instagram-posts", JSON.stringify(this.state.allPostsDetails));
    }
    // Common model / function to handle unliked post for individual post
    unlikeHandler = (postId, likeCount) => {
        let { selectedpostDetails } = this.props;
        let likeDetails = {};
        likeDetails['id'] = postId;
        if(likeDetails['id']) {
            this.likedPostInfo.push(likeDetails);
        }
        for(let i = 0; i < this.likedPostInfo.length; i++) {
            if(postId === this.likedPostInfo[i].id) {
                selectedpostDetails['likeIcon'] = 'dispBlock';
                selectedpostDetails['likedIcon'] = 'dispNone';
                selectedpostDetails['likes'] = {
                    count: likeCount - 1
                }
            }
        }
        
        for(let i = 0; i < this.state.allPostsDetails.length; i++) {
            for(let j = 0; j < this.likedPostInfo.length; j++) {
                if(this.state.allPostsDetails[i]['id'] === selectedpostDetails['id']) {
                    this.state.allPostsDetails[i]['likes']['count'] = selectedpostDetails['likes']['count'];
                    this.state.allPostsDetails[i]['likeIcon'] = selectedpostDetails['likeIcon'];
                    this.state.allPostsDetails[i]['likedIcon'] = selectedpostDetails['likedIcon'];
                }
            }
        }
        this.setState({ selectedpostDetails });
        sessionStorage.setItem("instagram-posts", JSON.stringify(this.state.allPostsDetails));
    }
    // Common model / function to handle all the newly added comment(s) for individual posts
    onSubmitComment = (e, id) => {
        e.stopPropagation();
        let addedCommentVal = document.getElementById(`addComment_${id}`).value.trim();
        let { selectedpostDetails } = this.props;
        let commentInfo = {};
        commentInfo['id'] = id;
        commentInfo['newComments'] = addedCommentVal;
        if((selectedpostDetails['id'] === commentInfo['id']) && commentInfo['newComments']) {
            selectedpostDetails['comments'] = [...selectedpostDetails['comments'], ...[commentInfo['newComments']]]
        }
        for(let i = 0; i < this.state.allPostsDetails.length; i++) {
            if((this.state.allPostsDetails[i]['id'] === commentInfo['id']) && commentInfo['newComments']) {
                this.state.allPostsDetails[i]['comments'] = [...this.state.allPostsDetails[i]['comments'], ...[commentInfo['newComments']]]
            }
        }
        this.setState({ selectedpostDetails });
        document.getElementById(`addComment_${id}`).value = '';
        sessionStorage.setItem("instagram-posts", JSON.stringify(this.state.allPostsDetails));
    }
    updateNameHandler = (e) => {
        let { value } = e.target;
        sessionStorage.setItem('updated-username', JSON.stringify(value));      // Store the updated user name
        this.props.updateUserNameHandler(value);                                // Call back to it's parent componenet to update the user name
    }

    render() {
        let { classes, showModal, selectedAction, selectedpostDetails, closeFormDialogHandler, userNameSubmitHandler } = this.props;
        let { editModal, nameFieldEmpty } = selectedAction;
        const profile_picture = sessionStorage.getItem('profile-picture');
        let likeCount = 0;
        for(let count in selectedpostDetails['likes']) {
            likeCount = selectedpostDetails['likes']['count'];
        }

        return (
            <React.Fragment>
                <Dialog className={editModal ? classes.updateUserNameDialog : classes.updatePostsDialog} open={showModal} onClose={closeFormDialogHandler} aria-labelledby="form-dialog-title">
                    {editModal ? 
                    <div>
                        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                        <DialogContent className={classes.userNameContentStyle}>
                        <FormControl required>
                            <TextField
                                margin="dense"
                                id="fullName"
                                label="Full Name *"
                                type="text"
                                fullWidth
                                onChange={(e) => this.updateNameHandler(e)}
                            />
                            <FormHelperText className={nameFieldEmpty}><span className="red">required</span></FormHelperText>
                        </FormControl>
                        </DialogContent>
                        <DialogActions className={classes.actionBtnAlignment}>
                            <Button onClick={userNameSubmitHandler} variant="contained" color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </div> : 
                    <div className={classes.editPostWrapper} id="user-profile-details">
                        <div className={classes.postImageWrapper}>
                            <img src={selectedpostDetails['media_url']} className={classes.postImage} />
                        </div>
                        <div className={classes.postTitleWrapper}>
                            <div className='avatarWrapper'>
                                <Avatar src={profile_picture} alt="Profile picture" />
                                <h4 className={classes.userNameAlign}>{selectedpostDetails['username']}</h4>
                            </div>
                            <Typography variant="body2" component="p">
                                {selectedpostDetails['caption']}
                                <span className={classes.hashTags}>{selectedpostDetails['hashTags']}</span>
                            </Typography>
                            <div className={classes.commentSection}>
                                {(selectedpostDetails['comments'] && selectedpostDetails['comments'].length > 0) && selectedpostDetails['comments'].map((comment, idx) => (
                                    <Typography variant="body2" component="p" key={'comment' + idx} className={classes.commentContainer}>
                                        <strong>{selectedpostDetails['username']}: </strong> {comment}
                                    </Typography>
                                ))}
                            </div>
                            <DialogActions className={classes.likeAlignment}>
                                <div className={selectedpostDetails['likeIcon']} onClick={(e) => this.addLikeHandler(selectedpostDetails['id'], likeCount)}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                </div>
                                <div className={selectedpostDetails['likedIcon']} onClick={(e) => this.unlikeHandler(selectedpostDetails['id'], likeCount)}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon className={classes.red} />
                                    </IconButton>
                                </div>
                                <Typography variant="body2" className={classes.likeStyle}>
                                    {(likeCount > 0) && likeCount} {(likeCount > 1) ? 'likes' : (likeCount > 0) && 'like'}
                                </Typography>
                            </DialogActions>
                            <DialogActions className={classes.newCommentsWrapper}>
                                <TextField id={`addComment_${selectedpostDetails['id']}`} placeholder="Add a comment" className={classes.textFieldWidth} />
                                <Button variant="contained" color="primary" onClick={(e) => this.onSubmitComment(e, selectedpostDetails['id'])}>
                                    ADD
                                </Button>
                            </DialogActions>
                        </div>
                    </div>}
                </Dialog>
            </React.Fragment>
        )
    }    
}

export default withStyles(customStyles)(FormDialog);