export const User = (
    id,
    firstName,
    lastName,
    email,
    login,
    password
) => {
    return {
        "id": id,
        "profile": {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "login": login
        },
        "credentials": {
            "password": {
                "value": password
            }
        }
    }
};
