import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Header } from '../../common/header/Header';
import './Login.css';

// Custom styles - Material Card component
const customStyles = () => ({ 
    root: {
        marginTop: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1%',
        width: 400
    },
    inputWidth: {
        width: 360
    },
    helperTextSpaceAround: {
        marginTop: 20
    },
    loginActionBtn: {
        marginTop: 15,
        marginBottom: -15,
        marginLeft: -8
    }
});

const userDetails = [
    {
        username: 'username_1',
        password: 'password'
    },
    {
        username: 'username_2',
        password: 'password'
    },
    {
        username: 'username_3',
        password: 'password'
    }
];

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameRequired: 'dispNone',
            userPasswordRequired: 'dispNone',
            loginfailureMessage: 'dispNone',
            accessToken: 'IGQVJWZAXplU1ZABZAUtqZA3l3cGhpbzhuM2RYVDFMRWJOQmtQaXZAfOE1zZAkxud29tWVhPVkVKd0IxbmVmSGFuWjVFTV8ybzJuMUkyUFRlQmhRcGI2c3M3UTNQZAXdXR01PWWtvWXFGNEpGSXNLSWZAPV25LMAZDZD'
        }
    }
    // On Change handler for username & password input
    handleChange = (e, check) => {
        switch(check) {
            case 'username':
                this.setState({
                    username: e.target.value.trim()
                }, () => {
                    if(this.state.username) {
                        this.setState({usernameRequired: 'dispNone'});
                    }
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value.trim()
                }, () => {
                    if(this.state.password) {
                        this.setState({userPasswordRequired: 'dispNone'});
                    }
                });
        }
    }
    // Login handler 
    loginClickHandler = (e) => {
        let loginSuccess = false;
        let loginDetailObj = {};
        loginDetailObj['username'] = this.state.username;
        loginDetailObj['password'] = this.state.password;
        
        // Shallow compare of two objects (Username & Password check)
        userDetails.forEach((userInfo) => {
            if(JSON.stringify(userInfo) === JSON.stringify(loginDetailObj)) {
                loginSuccess =  true;
                // Store access token on successful login
                sessionStorage.setItem("access-token", this.state.accessToken);
                this.setState({loginfailureMessage: 'dispNone'});
            }else {
                loginSuccess =  false;
                // Check if the username / password is empty
                for(let key in loginDetailObj) {
                    if(loginDetailObj[key]) {
                        this.setState({loginfailureMessage: 'dispBlock'});      // Show helper text, if the user has provided some wrong input
                    }else {
                        this.setState({loginfailureMessage: 'dispNone'});
                    }
                }
            }
        });
        // Set form helper text for mandatory fields
        if(!this.state.username) {
            this.setState({usernameRequired: 'dispBlock'});
        }else {
            this.setState({usernameRequired: 'dispNone'});
        }
        if(!this.state.password) {
            this.setState({userPasswordRequired: 'dispBlock'});
        }else {
            this.setState({userPasswordRequired: 'dispNone'});
        }
        console.log('loginSuccess', loginSuccess);
    }

    render() {
        const { classes } = this.props;
        let { username, password } = this.state;
        return (
            <React.Fragment>
                <Header />
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            LOGIN
                        </Typography>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username </InputLabel>
                            <Input id="username" className={classes.inputWidth} type="text" onChange={(e) => this.handleChange(e, 'username')} value={username} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password </InputLabel>
                            <Input id="password" type="password" className={classes.inputWidth} onChange={(e) => this.handleChange(e, 'password')} value={password} />
                            <FormHelperText className={this.state.userPasswordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl>
                        <FormHelperText className={`${this.state.loginfailureMessage} ${classes.helperTextSpaceAround}`}><span className="red">Incorrect username and/or password</span></FormHelperText>
                        <CardActions className={classes.loginActionBtn}>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                LOGIN
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Login);