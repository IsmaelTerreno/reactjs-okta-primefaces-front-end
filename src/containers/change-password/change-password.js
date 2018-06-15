import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { Button } from 'primereact/components/button/Button';
import { Card } from 'primereact/components/card/Card';
import { Messages } from 'primereact/components/messages/Messages';
import { InputText } from 'primereact/components/inputtext/InputText';
import { withRouter } from 'react-router-dom';
import { changeUserPassword, clearUserMessages } from '../../ducks/user/user.action';
import { User } from '../../ducks/user/user.model';

class ChangePassword extends Component {
    static propTypes = {
        isFetching: PropTypes.bool,
        dispatch: PropTypes.func,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        changePassword: PropTypes.func.isRequired,
        accessToken: PropTypes.string,
        currentUser: PropTypes.instanceOf(User),
        userMessages: PropTypes.array
    };

    state = {
        oldPassword: '',
        newPassword: '',
    };

    oldPasswordChange = (event) => {
        this.setState({oldPassword: event.target.value});
    };
    newPasswordChange = (event) => {
        this.setState({newPassword: event.target.value});
    };
    cancelNewPassword = () => {
        this.props.history.push('/');
    };
    changePasswordConfirm = (e) => {
        if(this.props.currentUser.id){
            const accessToken = this.props.accessToken;
            const changePassword = {
                "userId": this.props.currentUser.id,
                "oldPassword" : this.state.oldPassword,
                "newPassword" : this.state.newPassword
            } ;
            this.props.changeUserPassword(changePassword, accessToken);
        }
        e.preventDefault();
    };

    componentDidUpdate(){
        const {userMessages} = this.props;
        if ( userMessages && userMessages.length > 0 ) {
            this.messages.show(userMessages);
            this.props.clearUserMessages();
        }
    }
    render() {
        let footer = <span>
                <Button onClick={this.changePasswordConfirm} label="Confirm" icon="fa-check"/>
                <Button onClick={this.cancelNewPassword} label="Cancel" icon="fa-close" className="ui-button-secondary"/>
        </span>;
        return(
            <div className="App App-main-layout">
                <div className="ui-g">
                    <div className="ui-g-12">
                        <div className="ui-g-4 ui-sm-1">
                        </div>
                        <div className="ui-g-3 ui-sm-10">
                            <Messages ref={(el) => { this.messages = el; }}>
                            </Messages>
                        </div>
                        <div className="ui-g-5 ui-sm-1">
                        </div>
                    </div>
                    <div className="ui-g-2 ui-sm-1">
                    </div>
                    <div className="ui-g-7 ui-sm-10">
                        <Card
                            title="Change Password"
                            footer={footer} >
                            <form onSubmit={this.changePasswordConfirm}>
                                <div className="Form-section">
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.oldPassword} onChange={this.oldPasswordChange}
                                            placeholder="Old password" type="password" />
                                    </div>
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.newPassword} onChange={this.newPasswordChange}
                                            placeholder="New password" type="password" />
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </div>
                    <div className="ui-g-3 ui-sm-1">
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUserPassword: (changePassword, accessToken) => dispatch(changeUserPassword(changePassword, accessToken)),
        clearUserMessages: () => dispatch(clearUserMessages())
    }
};
const mapStateToProps = state => {
    const { users } = state;
    const {
        isFetching,
        accessToken,
        currentUser,
        userMessages
    } = users;

    return {
        isFetching,
        accessToken,
        currentUser,
        userMessages
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withAuth(ChangePassword)));