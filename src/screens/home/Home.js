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
        //Get Instagram Media detail's
        //  let { accessToken } = this.state;
        //  let fetchMediaInfoEndPoint = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`;
        //  let dataMediaDetail = null;
        //  let xhrMediaInfo = new XMLHttpRequest();
        //  let that = this;
        //  xhrMediaInfo.addEventListener('readystatechange', function() {
        //      if(this.readyState === 4 && xhrMediaInfo.status === 200) {
        //          let parsedData = JSON.parse(this.responseText).data;
        //          that.setState({ instagramMediaInfo: parsedData}, () => {
        //              that.fetchImageInfo(parsedData);
        //          });
        //      }
        //  })
        //  xhrMediaInfo.open("GET", fetchMediaInfoEndPoint);
        //  xhrMediaInfo.setRequestHeader("Cache-Control", "no-cache");
        //  xhrMediaInfo.setRequestHeader("Content-Type", "application/json");
        //  xhrMediaInfo.setRequestHeader("Access-Control-Allow-Origin", "*");      // Handle CORS
        //  xhrMediaInfo.send(dataMediaDetail);

        // Store user profile picture
        sessionStorage.setItem("profile-picture", this.state.profile_picture);

        // ***** MOCK ******
        let mockResponse = {
            data: [
                {
                    id: "17917116379594550",
                    caption: "Music meets soul... #guitar"
                },
               {
                    id: "18161116435119934",
                    caption: "#sweetlove #dessert"
               },
               {
                    id: "17869448207302490",
                    caption: "#winter #january #heal"
               },
               {
                    id: "18199106851042411",
                    caption: "#butterfly #nature #peace"
               },
               {
                    id: "17882483834061294",
                    caption: "#sunset #nature #naturelove"
               }
            ],
            paging: {
                cursors: {
                    before: "QVFIUjlWVDhTWHNqc1NXYlJxT01mRmFKbE8wQkppRGdUUmFULXdkZAHlZAU2tlbnZAMdVBvOHcwMjYySDFsNkNaRzFQUmRqN0UtX1RsVDlWaXFFUTRkb3VZAdWFn",
                    after: "QVFIUmR0eWVWODNNdUsxZADUycmlvR1EtTS0tZAWN1NXRVcjU0TkFmSDBvVld5cEdkeEpERnhWdGVBNERnT1RvcTdQek84emVLOUUySEdfN0t5ZAW8yYzM3Vm1R"
                }
            }
         };

        let parsedData = mockResponse.data;
        this.setState({ instagramMediaInfo: parsedData}, () => {
            this.fetchImageInfo(parsedData);
        });
    }

    fetchImageInfo = (mediaInfo) => {
         //Get Instagram Images / Videos detail's
        //  let { accessToken } = this.state;
        //  let tempArray = [];
        //  let mediaResponseArray = mediaInfo;
        //     mediaResponseArray.forEach(media => {
        //         let fetchedMediaId = media['id'];
        //         let fetchImageInfoEndPoint = `https://graph.instagram.com/${fetchedMediaId}?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`;
        //         let dataImageDetail = null;
        //         let xhrImageInfo = new XMLHttpRequest();
        //         let that = this;
        //         xhrImageInfo.addEventListener('readystatechange', function() {
        //             if(this.readyState === 4 && xhrImageInfo.status === 200) {
        //                 let parsedData = JSON.parse(this.responseText);
        //                 if(parsedData.id === media.id) {
        //                     let tags = [];
        //                     let captionData = media.caption.split('#');
        //                     let maximum = 10, minimum = 5;
        //                     let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        //                     parsedData['caption'] = captionData[0];
        //                     for(let i = 1; i < captionData.length; i++) {
        //                         tags.push(`#${captionData[i]}`);
        //                     }
        //                     parsedData['hashTags'] = tags;
        //                     parsedData['likes'] = {}; 
        //                     parsedData['likes']['count'] = randomnumber;
        //                     parsedData['likeIcon'] = 'dispBlock';
        //                     parsedData['likedIcon'] = 'dispNone';
        //                     parsedData['comments'] = [`This is a test comment for Post Id: ${fetchedMediaId}`, `Mock Test Comment: ${randomnumber}`];
        //                 }
        //                 console.log('parsedData', parsedData);
        //                 tempArray.push(parsedData);
        //                 that.setState({ instagramImageDetail: tempArray});
        //             }
        //         })
        //         xhrImageInfo.open("GET", fetchImageInfoEndPoint);
        //         xhrImageInfo.setRequestHeader("Cache-Control", "no-cache");
        //         xhrImageInfo.setRequestHeader("Content-Type", "application/json");
        //         xhrImageInfo.setRequestHeader("Access-Control-Allow-Origin", "*");      // Handle CORS
        //         xhrImageInfo.send(dataImageDetail);
        //     });

        // **** Mock Data *****
        let tempArray = [
            {
                id: "17917116379594550",
                media_type: "IMAGE",
                media_url: "https://scontent-bom1-1.cdninstagram.com/v/t51.29350-15/158132159_481858973197455_1767100568549228076_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=nQUzQTLyRSAAX_TCjNq&_nc_ht=scontent-bom1-1.cdninstagram.com&oh=d3048141f361803a7d54747712c0576c&oe=606CD4AF",
                username: "subhdeveloper88",
                timestamp: "2021-03-08T21:50:20+0000",
                caption: 'Eat',
                hashTags: '#Love #Heal #Peace',
                likes: { count: 0 },
                likeIcon: 'dispBlock',
                likedIcon: 'dispNone',
                comments: ["This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5, "This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5]
             },
            {
                id: "18161116435119934",
                media_type: "IMAGE",
                media_url: "https://scontent-bom1-1.cdninstagram.com/v/t51.29350-15/157427159_866915980536626_1415770927514952702_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=2y3f5sqmxOcAX_C--7_&_nc_ht=scontent-bom1-1.cdninstagram.com&oh=034490be3eac33af27ad428f8ca74a3b&oe=606AA919",
                username: "subhdeveloper88",
                timestamp: "2021-03-06T16:30:26+0000",
                caption: 'Read',
                hashTags: '#Love #Heal #Peace',
                likes: {
                    count: 1
                },
                likeIcon: 'dispBlock',
                likedIcon: 'dispNone',
                comments: ["This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5, "This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5]
             },
             {
                id: "17869448207302490",
                media_type: "IMAGE",
                media_url: "https://scontent-bom1-2.cdninstagram.com/v/t51.29350-15/158212859_487981989239532_745530961166136984_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=P2kHbURgDN8AX9vUfId&_nc_ht=scontent-bom1-2.cdninstagram.com&oh=b524e6076ea1db00218919e97d094527&oe=606BB7DD",
                username: "subhdeveloper88",
                timestamp: "2021-03-06T16:29:40+0000",
                caption: 'Music',
                hashTags: '#Love #Heal #Peace',
                likes: {
                    count: Math.floor(Math.random() * (10 - 5 + 1)) + 5
                },
                likeIcon: 'dispBlock',
                likedIcon: 'dispNone',
                comments: ["This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5, "This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5]
             },
             {
                id: "18199106851042411",
                media_type: "IMAGE",
                media_url: "https://scontent-bom1-2.cdninstagram.com/v/t51.29350-15/156905243_2759659677680198_1805264822665327254_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=1DdCqEhg7BAAX8zs-WD&_nc_ht=scontent-bom1-2.cdninstagram.com&oh=f9eec3e3b45d92a468926d0e2498d238&oe=606C68C9",
                username: "subhdeveloper88",
                timestamp: "2021-03-06T16:28:22+0000",
                caption: 'Music 01',
                hashTags: '#Love #Heal #Peace',
                likes: {
                    count: Math.floor(Math.random() * (10 - 5 + 1)) + 5
                },
                likeIcon: 'dispBlock',
                likedIcon: 'dispNone',
                comments: ["This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5, "This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5]
             },
             {
                id: "17882483834061294",
                media_type: "IMAGE",
                media_url: "https://scontent-bom1-2.cdninstagram.com/v/t51.29350-15/157021635_237232678054679_1552139667774356302_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=zrTb5JH3s8gAX9wqfZq&_nc_ht=scontent-bom1-2.cdninstagram.com&oh=6190d48361d0b2c32506635d8784e326&oe=606B7521",
                username: "subhdeveloper88",
                timestamp: "2021-03-06T16:27:20+0000",
                caption: 'Music03',
                hashTags: '#Love #Heal #Peace',
                likes: {
                    count: Math.floor(Math.random() * (10 - 5 + 1)) + 5
                },
                likeIcon: 'dispBlock',
                likedIcon: 'dispNone',
                comments: ["This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5, "This is test comment for Post Id: " + Math.floor(Math.random() * (10 - 5 + 1)) + 5]
             }
        ]

        this.setState({ instagramImageDetail: tempArray});
    }
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
    }
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
    }
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
    }
    searchCaptionHandler = (searchText) => {
        this.setState({ searchString: searchText });
    }

    render() {
        const { classes } = this.props;
        let { instagramImageDetail, profile_picture } = this.state;
        // Store all posts details in session storage
        sessionStorage.setItem("instagram-posts", JSON.stringify(instagramImageDetail));

        let instagramPosts = instagramImageDetail,
        searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0) {
            instagramPosts = instagramPosts.filter(function(post) {
              return post.caption.toLowerCase().match( searchString );
            });
        }
        return (
            <React.Fragment>
                <Header 
                    searchHandler={this.searchCaptionHandler} 
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
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Home);