export default {
    oidc: {
        clientId: '0oaemhi15o6q6zqJt0h7',
        issuer: 'https://dev-912759.oktapreview.com/oauth2/default',
        redirectUri: window.location.origin + '/implicit/callback',
        scope: 'openid profile email',
    },
    resourceServer: {
        messagesUrl: 'http://localhost:8000/api/messages',
    },
};