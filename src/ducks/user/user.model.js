export const User = (
    id,
    firstName,
    lastName,
    email,
    login,
    password
) => {
    return {
        id,
        "profile": {
            firstName,
            lastName,
            email,
            login
        },
        "credentials": {
            "password": {
                "value": password
            }
        }
    }
};
