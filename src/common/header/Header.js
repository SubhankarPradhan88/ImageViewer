import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

import './Header.css';
import Login from '../../screens/login/Login';
import Profile from '../../screens/profile/Profile';
import Home from '../../screens/home/Home';

// Custom styles - Material Card component
const customStyles = (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: 300,
      height: 35,
      borderRadius: 4,
      backgroundColor: '#c0c0c0'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: '2px 0 0 10px'
    },
    headerAvatar: {
        marginLeft: 10,
        cursor: 'pointer'
    },
    selectDropDown: {
        width: 100,
        background: '#e7e7e7',
        position: 'absolute',
        margin: '5px 0 0 -75px',
        color: '#000000',
        borderRadius: 4,
        padding: '0 10px 0px 10px',
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            accessToken: sessionStorage.getItem('access-token')
        }
    }
    onSearchEvent = (e) => {
        let { value } = e.target;
        this.props.searchHandler(value);
    }
    showDropDownHandler = (e) => {
        console.log(this.state.showDropDown);
        this.setState({ showDropDown: !this.state.showDropDown });
    }
    handleDropDown = () => {
        if(this.state.showDropDown) {
            // Close the drop down asynchronously
            setTimeout(() => { 
                this.setState({ showDropDown: false });
            },0);
        }
    }
    routeHandler = (check) => {
        if(check === 'logout') {
            // Remove all saved data from sessionStorage
            sessionStorage.clear();
            // Route back to Login screen
            this.props.history.push("/");
        }else {
            // Route back to Profile screen
            this.props.history.push("/profile");
        }
    }
    redirectHomeHandler = (e) => {
        this.props.history.push("/home");
    }

    render() {
        const { classes, displayItems } = this.props;
        document.body.addEventListener('click', this.handleDropDown, true);     // Close 'Sort' drop down on click anywhere in the document
        
        return (
            <React.Fragment>
                <header className="header-container">
                    <div className={!displayItems['displaySearchBar'] ? "logo-padding cursorPointer" : "logo-padding"} onClick={!displayItems['displaySearchBar'] ? this.redirectHomeHandler.bind(this) : null}>
                        Image Viewer
                    </div>
                    {displayItems['displayProfilePic'] && <div className="flex-align width-15-percentage margin-right-10px">
                        <div className="search-container">
                            {displayItems['displaySearchBar'] && <Paper component="form" className={classes.root}>
                                <div className={classes.iconButton}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => this.onSearchEvent(e)}
                                />
                            </Paper>}
                            {displayItems['displayProfilePic'] && <div className={classes.headerAvatar}>
                                <Avatar src={displayItems['userPicture']} alt="Profile picture" onClick={this.showDropDownHandler} />
                                {this.state.showDropDown && <div className={classes.selectDropDown}>
                                    {displayItems['displaySearchBar'] && <p onClick={(e) => this.routeHandler('myAccount')}>My Account</p>}
                                    {displayItems['displaySearchBar'] && <hr/>}
                                    <p onClick={(e) => this.routeHandler('logout')}>Logout</p>
                                </div>}
                            </div>}
                        </div>
                    </div>}
                </header>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Header);