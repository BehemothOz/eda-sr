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

    reset() {
        this.userID = null;
    }
}

export const sessionService = new Session();
