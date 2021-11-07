class Session {
    constructor() {
        this.userID = null;
    }

    getUserID() {
        return this.userID;
    }

    setUserID(userID) {
        this.userID = userID;
        return userID;
    }
}

export const sessionService = new Session();
