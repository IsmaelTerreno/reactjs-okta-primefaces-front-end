import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import '../../App.css';
import secret_friends from './secret-friends.jpg';
const ProtectedInfo = () => (
    <div className="App">
        <p>Secret friends - They will help and follow you every time you need.</p>
        <img src={ secret_friends } className="secret-friends" alt="The secret friends." />
    </div>
);
export default withAuth(ProtectedInfo);