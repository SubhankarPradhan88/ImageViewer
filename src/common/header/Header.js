import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ReactDOM from 'react-dom';

import './Header.css';
import Login from '../../screens/login/Login';

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
            sessionStorage.removeItem("access-token");      // Clear the saved session storage
            ReactDOM.render(<Login />, document.getElementById('root'));
        }
    }

    render() {
        const { classes } = this.props;
        document.body.addEventListener('click', this.handleDropDown, true);     // Close 'Sort' drop down on click anywhere in the document

        return (
            <React.Fragment>
                <header className="header-container">
                    <div className="logo-padding">
                        Image Viewer
                    </div>
                    {this.state.accessToken && <div className="flex-align width-15-percentage margin-right-10px">
                        <div className="search-container">
                            <Paper component="form" className={classes.root}>
                                <div className={classes.iconButton}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => this.onSearchEvent(e)}
                                />
                            </Paper>
                            <div className={classes.headerAvatar}>
                                <Avatar src={this.props.userPicture} alt="Profile picture" onClick={this.showDropDownHandler} />
                                {this.state.showDropDown && <div className={classes.selectDropDown}>
                                    <p onClick={this.routeHandler.bind(this,'myAccount')}>My Account</p>
                                    <hr/>
                                    <p onClick={this.routeHandler.bind(this,'logout')}>Logout</p>
                                </div>}
                            </div>
                        </div>
                    </div>}
                </header>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Header);