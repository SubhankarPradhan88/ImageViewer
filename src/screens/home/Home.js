import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from "@material-ui/core/TextField";
import { red } from '@material-ui/core/colors';

import './Home.css';
import Header from '../../common/header/Header';

// Custom styles - Material Card component
const customStyles = (theme) => ({ 
    root: {
        margin: '2% 1% 2% 1%',
        width: 325,
        height: 'auto',
        float: 'left',
        padding: '0 55px 0 15px'
      },
      media: {
        height: 0,
        padding: '56.25%'
      },
      horizontalLine: {
        width: '112%'
      },
      content: {
        color: '#000000',
        margin: '-15px 0 0 -15px'
      },
      avatarAlignment: {
        paddingLeft: 0
      },
      likeAlignment: {
        margin: '-20px 0 0 -20px'
      },
      hashTags: {
        display: 'block',
        color: '#00376b'
      },
      textFieldWidth: {
        margin: '0 0 0 -7px',
        width: '80%'
      },
      likeStyle: {
        color: '#000000'
      },
      red: {
        color: theme.palette.getContrastText(red[500]),
        color: red[500]
      },
      commentContainer: {
        width: '112%'
      },
      comments: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '112%'
      }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.likedPostInfo = [];
        this.state = {
            instagramMediaInfo: [],
            instagramImageDetail: [],
            addedComment: [],
            likedPostInfo: [],
            showLikeIcon: true,
            searchString: '',
            profile_picture: `https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/s320x320/157122211_1745485552277687_8373494616517700195_n.jpg?tp=1&_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=kKsyaTAN_REAX8zUuPb&oh=f37d384a34641cf46f8f6aad5fbc25ee&oe=606E1033`,
            accessToken: sessionStorage.getItem('access-token')
        }
    }

    componentDidMount() {
        // Fetch Instagram Media detail's
        let updatedStoredPostDetails = JSON.parse(sessionStorage.getItem('instagram-posts'));
        if(!updatedStoredPostDetails) {
            let { accessToken } = this.state;
            let fetchMediaInfoEndPoint = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`;
            let dataMediaDetail = null;
            let xhrMediaInfo = new XMLHttpRequest();
            let that = this;
            xhrMediaInfo.addEventListener('readystatechange', function() {
                if(this.readyState === 4 && xhrMediaInfo.status === 200) {
                    let parsedData = JSON.parse(this.responseText).data;
                    that.setState({ instagramMediaInfo: parsedData}, () => {
                        that.fetchImageInfo(parsedData);
                    });
                }
            })
            xhrMediaInfo.open("GET", fetchMediaInfoEndPoint);
            xhrMediaInfo.setRequestHeader("Cache-Control", "no-cache");
            xhrMediaInfo.setRequestHeader("Content-Type", "application/json");
            xhrMediaInfo.setRequestHeader("Access-Control-Allow-Origin", "*");      // Handle CORS
            xhrMediaInfo.send(dataMediaDetail);
        }else {
            this.setState({ instagramImageDetail: JSON.parse(sessionStorage.getItem('instagram-posts')) });
        }
        // Store user profile picture
        sessionStorage.setItem("profile-picture", this.state.profile_picture);
    }

    fetchImageInfo = (mediaInfo) => {
         // Fetch individual post's detail(s) based on the post Id
         let { accessToken } = this.state;
         let tempArray = [];
         let mediaResponseArray = mediaInfo;
            mediaResponseArray.forEach(media => {
                let fetchedMediaId = media['id'];
                let fetchImageInfoEndPoint = `https://graph.instagram.com/${fetchedMediaId}?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`;
                let dataImageDetail = null;
                let xhrImageInfo = new XMLHttpRequest();
                let that = this;
                xhrImageInfo.addEventListener('readystatechange', function() {
                    if(this.readyState === 4 && xhrImageInfo.status === 200) {
                        let parsedData = JSON.parse(this.responseText);
                        if(parsedData.id === media.id) {
                            let tags = [];
                            let captionData = media.caption.split('#');
                            let maximum = 10, minimum = 5;
                            let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
                            parsedData['caption'] = captionData[0];
                            for(let i = 1; i < captionData.length; i++) {
                                tags.push(`#${captionData[i]}`);
                            }
                            parsedData['hashTags'] = tags;
                            parsedData['likes'] = {}; 
                            parsedData['likes']['count'] = randomnumber;
                            parsedData['likeIcon'] = 'dispBlock';
                            parsedData['likedIcon'] = 'dispNone';
                            parsedData['comments'] = [`This is a test comment for Post Id: ${fetchedMediaId}`, `Mock Test Comment: ${randomnumber}`];
                        }
                        tempArray.push(parsedData);
                        that.setState({ instagramImageDetail: tempArray }, () => {
                            sessionStorage.setItem("instagram-posts", JSON.stringify(that.state.instagramImageDetail));
                        });
                    }
                })
                xhrImageInfo.open("GET", fetchImageInfoEndPoint);
                xhrImageInfo.setRequestHeader("Cache-Control", "no-cache");
                xhrImageInfo.setRequestHeader("Content-Type", "application/json");
                xhrImageInfo.setRequestHeader("Access-Control-Allow-Origin", "*");      // Handle CORS
                xhrImageInfo.send(dataImageDetail);
            });
    }
    // Common model / function to handle liked post for individual post
    addLikeHandler = (postId, likeCount) => {
        let { instagramImageDetail } = this.state;
        let likeDetails = {};
        likeDetails['id'] = postId;
        if(likeDetails['id']) {
            this.likedPostInfo.push(likeDetails);
        }
        for(let i = 0; i < this.likedPostInfo.length; i++) {
            if(postId === this.likedPostInfo[i].id) {
                likeDetails['likeIcon'] = 'dispNone';
                likeDetails['likedIcon'] = 'dispBlock';
                likeDetails['likes'] = {
                    count: likeCount + 1
                }
            }
        }
        this.setState({ likedPostInfo:  this.likedPostInfo });
        for(let i = 0; i < instagramImageDetail.length; i++) {
            for(let j = 0; j < this.likedPostInfo.length; j++) {
                if(instagramImageDetail[i]['id'] === this.likedPostInfo[j]['id']) {
                    instagramImageDetail[i]['likes']['count'] = this.likedPostInfo[j]['likes']['count'];
                    instagramImageDetail[i]['likeIcon'] = this.likedPostInfo[j]['likeIcon'];
                    instagramImageDetail[i]['likedIcon'] = this.likedPostInfo[j]['likedIcon'];
                }
            }
        }
        sessionStorage.setItem("instagram-posts", JSON.stringify(instagramImageDetail));        // Store the updated liked count state in the session storage
    }
    // Common model / function to handle unliked post for individual post
    unlikeHandler = (postId, likeCount) => {
        let { instagramImageDetail } = this.state;
        let likeDetails = {};
        likeDetails['id'] = postId;
        if(likeDetails['id']) {
            this.likedPostInfo.push(likeDetails);
        }
        for(let i = 0; i < this.likedPostInfo.length; i++) {
            if(postId === this.likedPostInfo[i].id) {
                likeDetails['likeIcon'] = 'dispBlock';
                likeDetails['likedIcon'] = 'dispNone';
                likeDetails['likes'] = {
                    count: likeCount - 1
                }
            }
        }
        this.setState({ likedPostInfo:  this.likedPostInfo });
        for(let i = 0; i < instagramImageDetail.length; i++) {
            for(let j = 0; j < this.likedPostInfo.length; j++) {
                if(instagramImageDetail[i]['id'] === this.likedPostInfo[j]['id']) {
                    instagramImageDetail[i]['likes']['count'] = this.likedPostInfo[j]['likes']['count'];
                    instagramImageDetail[i]['likeIcon'] = this.likedPostInfo[j]['likeIcon'];
                    instagramImageDetail[i]['likedIcon'] = this.likedPostInfo[j]['likedIcon'];
                }
            }
        }
        sessionStorage.setItem("instagram-posts", JSON.stringify(instagramImageDetail));        // Store the updated unliked count state in the session storage
    }
    // Common model / function to handle all the newly added comment(s) for individual posts
    onSubmitComment = (e, id) => {
        e.stopPropagation();
        let addedCommentVal = document.getElementById(`addComment_${id}`).value.trim();
        let { instagramImageDetail } = this.state;
        const tempPostArray = instagramImageDetail;
        let commentInfo = {}, newAddedComment = [];
        commentInfo['id'] = id;
        commentInfo['newComments'] = addedCommentVal;
        newAddedComment.push(commentInfo);
        
        for(let i = 0; i < instagramImageDetail.length; i++) {
            for(let j = 0; j < newAddedComment.length; j++) {
                if((instagramImageDetail[i]['id'] === newAddedComment[j]['id']) && newAddedComment[j]['newComments']) {
                    tempPostArray[i]['comments'] = [...instagramImageDetail[i]['comments'], ...[newAddedComment[j]['newComments']]];
                }
            }
        }
        this.setState({ instagramImageDetail: tempPostArray });
        document.getElementById(`addComment_${id}`).value = '';
        sessionStorage.setItem("instagram-posts", JSON.stringify(tempPostArray));           // Store the updated comment(s) state in the session storage
    }
    // Search feature based on the post's caption
    searchCaptionHandler = (searchText) => {
        this.setState({ searchString: searchText });
    }

    render() {
        const { classes } = this.props;
        let { profile_picture, instagramImageDetail } = this.state;
        let instagramPosts = instagramImageDetail,
        searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0) {
            instagramPosts = instagramPosts.filter(function(post) {
              return post.caption.toLowerCase().match( searchString );
            });
        }
        return (
            <React.Fragment>
                {/* Display all the media post's details only if the user has logged in, orelse route the user back to Login screen */}
                {sessionStorage.getItem("access-token") ? 
                <React.Fragment>
                    <Header 
                        searchHandler={this.searchCaptionHandler} 
                        history={this.props.history}
                        displayItems = {{
                            displaySearchBar: true,
                            displayProfilePic: true,
                            userPicture: profile_picture
                        }}
                    />
                    <div className="image-card-alignment">
                        {(instagramPosts && instagramPosts.length > 0) && instagramPosts.map((imagePost) => {
                            let tempFormat = new Date(imagePost.timestamp); 
                            let timeFormat = `${tempFormat.getUTCMonth() + 1}/${tempFormat.getUTCDate()}/${tempFormat.getUTCFullYear()} ${tempFormat.getUTCHours()}:${tempFormat.getUTCMinutes()}:${tempFormat.getUTCSeconds()}`;
                            return (
                                <Card className={classes.root} key={'imagePost' + imagePost.id}>
                                    <CardHeader className={classes.avatarAlignment}
                                        avatar={
                                            <Avatar src={profile_picture} alt="Profile picture" />
                                        }
                                        title={imagePost.username}
                                        subheader={timeFormat}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={imagePost.media_url}
                                    />
                                    <hr className={classes.horizontalLine} />
                                    <CardContent className={classes.content}>
                                        <Typography variant="body2" component="p">
                                            {imagePost.caption}
                                            <span className={classes.hashTags}>{imagePost.hashTags}</span>
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing className={classes.likeAlignment}>
                                        <div className={imagePost.likeIcon} onClick={(e) => this.addLikeHandler(imagePost.id, imagePost['likes']['count'])}>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                        </div>
                                        <div className={imagePost.likedIcon} onClick={(e) => this.unlikeHandler(imagePost.id, imagePost['likes']['count'])}>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon className={classes.red} />
                                            </IconButton>
                                        </div>
                                        <Typography variant="body2" className={classes.likeStyle}>
                                            {(imagePost['likes']['count'] > 0) && imagePost['likes']['count']} {(imagePost['likes']['count'] > 1) ? 'likes' : (imagePost['likes']['count'] > 0) && 'like'}
                                        </Typography>
                                    </CardActions>
                                    {(imagePost.comments && imagePost.comments.length > 0) && imagePost.comments.map((comment, idx) => (
                                        <Typography variant="body2" component="p" key={'comment' + idx} className={classes.commentContainer}>
                                            <strong>{imagePost.username}: </strong> {comment}
                                        </Typography>
                                    ))}
                                    <CardActions disableSpacing className={classes.comments}>
                                        <TextField id={`addComment_${imagePost.id}`} placeholder="Add a comment" className={classes.textFieldWidth} />
                                        <Button variant="contained" color="primary" onClick={(e) => this.onSubmitComment(e, imagePost.id)}>
                                            ADD
                                        </Button>
                                    </CardActions>
                                </Card>
                            )})}
                        </div> 
                    </React.Fragment> : this.props.history.push("/")}
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Home);