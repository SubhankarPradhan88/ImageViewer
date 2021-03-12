import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import './FormDialog.css';

// Custom styles - Material Card component
const customStyles = makeStyles((theme) => ({
    updateUserNameDialog: {
        marginTop: '-10%',
        marginLeft: '-25%'
    },
    updatePostsDialog: {
        margin: '0 auto'
    },
    postTitleWrapper: {
        width: 500,
        height: 'auto'
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
        height: 500,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

export default function FormDialog(props) {
    const classes = customStyles();
    let { showModal, selectedAction, selectedpostDetails, updateUserNameHandler, closeFormDialogHandler, userNameSubmitHandler } = props;
    let { editModal, nameFieldEmpty } = selectedAction;
    const updateNameHandler = (e) => {
        let { value } = e.target;
        updateUserNameHandler(value);
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
                            onChange={(e) => updateNameHandler(e)}
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
                    <div className={classes.postTitleWrapper}>User Details</div>
                </div>}
            </Dialog>
        </React.Fragment>
    )
}