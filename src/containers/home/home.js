import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import {
        checkLoginUserRequest,
        checkLoginUserSuccess,
        checkLoginUserFail,
        saveAccessToken,
        saveCurrentUser } from '../../ducks/user/user.action';
import {Card} from 'primereact/components/card/Card';
import '../../App.css';
import { Button } from 'primereact/components/button/Button';
import logo from '../../bunker-app-logo.png';
import { withRouter, Link } from 'react-router-dom';
import { User } from '../../ducks/user/user.model';

class Home extends Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        accessToken: PropTypes.string,
        currentUser: PropTypes.instanceOf(User)
    };
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication();
    }
    componentDidUpdate() {
        this.checkAuthentication();
    }
    checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
            if (this.state.authenticated === true)
                { this.props.checkLoginUserSuccess(); } else { this.props.checkLoginUserFail(); }
            const currentUser = await this.props.auth.getUser();
            if(currentUser){
                const userLogin = User(
                    currentUser.sub,
                    currentUser.given_name,
                    currentUser.family_name,
                    currentUser.email,
                    currentUser.email,
                    null
                );
                this.props.saveCurrentUser(userLogin);
                const accessToken = await this.props.auth.getAccessToken();
                this.props.saveAccessToken(accessToken);
            }
        }
    };
    loginUser = async () => {
        this.props.checkLoginUserRequest();
        // Redirect to '/' after login
        this.props.auth.login('/');
    };
    logoutUser = async () => {
        // Redirect to '/' after logout
        this.props.auth.logout('/');
    };
    createAccount = () => {
        this.props.history.push('/registration');
    };
    changePassword = () => {
        this.props.history.push('/change-password');
    };
    secretFriends = () => {
        this.props.history.push('/protected-info');
    };
    render() {
        if (this.state.authenticated === null) return null;
        let header = <img alt="Card" src={logo} className="App-logo"/>;
        const LogOffUserButtons = <div>
            {
                this.state.authenticated ?
                    <div className="ui-g">
                        <div className="ui-g-12 ui-sm-12">
                            <Button
                                label="Secret Friends"
                                icon="fa-user-secret"
                                className="ui-button-success"
                                onClick={this.secretFriends} />
                        </div>
                        <div className="ui-g-12 ui-sm-12">
                            <Button
                                label="Change password"
                                icon="fa-key"
                                className="ui-button-success"
                                onClick={this.changePassword} />
                        </div>
                        <div className="ui-g-12 ui-sm-12">
                            <Button
                                label="Log Out"
                                icon="fa-close"
                                className="ui-button-secondary"
                                onClick={this.logoutUser} />
                        </div>
                    </div>:
                    <div>
                        <Button
                            label="Login"
                            icon="fa-check"
                            onClick={this.loginUser} />
                        <Button
                            label="Create Account"
                            icon="fa-user-circle"
                            className="ui-button-success"
                            onClick={this.createAccount} />
                    </div>
            }
        </div>;
        const userInfo = (currentUserInfo, authenticated) => {
            if (currentUserInfo && authenticated) {
                return (
                    <div className="fade-in-effect">
                        <h4>Welcome {
                            this.props.currentUser.profile.firstName + ' '+
                            this.props.currentUser.profile.lastName
                        }.</h4>
                        <p>Email: {this.props.currentUser.profile.email}</p>
                    </div>
                );
            }
            return(<div> </div>);
        };
        return (
            <div className="App App-main-layout">
                <div className="ui-g">
                    <div className="ui-g-12">
                        <div className="ui-g-4 ui-sm-1">
                        </div>
                        <div className="ui-g-3 ui-sm-10">
                            <Card
                                title="Bunker"
                                header={header}
                                footer={LogOffUserButtons}>
                                {
                                    userInfo( this.props.currentUser, this.state.authenticated )
                                }
                            </Card>
                        </div>
                        <div className="ui-g-5 ui-sm-1">
                        </div>
                    </div>
                    <div className="ui-g-12">
                        <div className="ui-g-4 ui-sm-1">
                        </div>
                        <div className="ui-g-3 ui-sm-10">
                            <Card>
                                <div >
                                    <Link className="App-credits-link" to={'/credits-developer'}>
                                        Credits : Ismael Terreno
                                    </Link>
                                </div>
                            </Card>
                        </div>
                        <div className="ui-g-5 ui-sm-1">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkLoginUserRequest: () => dispatch(checkLoginUserRequest()),
        checkLoginUserSuccess: () => dispatch(checkLoginUserSuccess()),
        checkLoginUserFail: () => dispatch(checkLoginUserFail()),
        saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
        saveCurrentUser: (currentUser) => dispatch(saveCurrentUser(currentUser)),
    }
};

const mapStateToProps = state => {
    const { users } = state;
    const {
        isFetching,
        accessToken,
        currentUser
    } = users;

    return {
        isFetching,
        accessToken,
        currentUser
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withAuth(Home)));