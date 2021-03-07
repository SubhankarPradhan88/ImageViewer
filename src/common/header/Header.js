import React from 'react';
import Button from '@material-ui/core/Button';

import './Header.css';

export const Header = (props) => {
    return (
        <React.Fragment>
            <header className="header-container">
                <div className="width-85-percentage">
                    Image Viewer
                </div>
                <div className="flex-align width-15-percentage margin-right-10px">
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Search
                        </Button>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}