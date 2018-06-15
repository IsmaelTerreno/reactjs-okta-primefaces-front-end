import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, clearUserMessages } from '../../ducks/user/user.action';
import { withAuth } from '@okta/okta-react/dist/index';
import { Button } from 'primereact/components/button/Button';
import { Card } from 'primereact/components/card/Card';
import { Messages } from 'primereact/components/messages/Messages';
import { InputText } from 'primereact/components/inputtext/InputText';
import { withRouter } from 'react-router-dom';
import { User } from '../../ducks/user/user.model';

class Registration extends Component {

    static propTypes = {
        isFetching: PropTypes.bool,
        dispatch: PropTypes.func,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        registerUser: PropTypes.func.isRequired
    };
    static defaultProps = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',

    };

    firstNameChange = evt => {
        this.setState({firstName: evt.target.value});
    };
    lastNameChange = evt => {
        this.setState({lastName: evt.target.value});
    };
    emailChange = evt => {
        this.setState({email: evt.target.value});
    };
    passwordChange = evt => {
        this.setState({password: evt.target.value});
    };
    cancelRegistration = () => {
        this.props.history.push('/');
    };
    sigInUser = evt => {
        const userLogin = User(
            null,
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.email,
            this.state.password
        );
        this.props.registerUser(userLogin);
        evt.preventDefault();
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
                <Button onClick={this.sigInUser} label="Sing in" icon="fa-check"/>
                <Button onClick={this.cancelRegistration} label="Cancel" icon="fa-close" className="ui-button-secondary"/>
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
                            title="Bunker Registration"
                            footer={footer} >
                            <form onSubmit={this.sigInUser}>
                                <div className="Form-section">
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.firstName} onChange={this.firstNameChange}
                                            placeholder="First name" type="text"  />
                                    </div>
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.lastName} onChange={this.lastNameChange}
                                            placeholder="Last name" type="text"  />
                                    </div>
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.email} onChange={this.emailChange}
                                            placeholder="Email" type="email"  />
                                    </div>
                                    <div className="ui-g-12 ui-sm-12">
                                        <InputText
                                            value={this.state.password} onChange={this.passwordChange}
                                            placeholder="Password" type="password" />
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
        registerUser: user => dispatch(registerUser(user)),
        clearUserMessages: () => dispatch(clearUserMessages())
    }
};
const mapStateToProps = state => {
    const { users } = state;
    const {
        isFetching,
        userMessages
    } = users;

    return {
        isFetching,
        userMessages
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withAuth(Registration)));