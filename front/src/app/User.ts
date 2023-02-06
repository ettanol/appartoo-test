export interface User {
    _id ?: string,
    pseudo: string,
    password: string,
    role?: string,
    profileImageUrl?: string,
    isConnected?: boolean,
    peopleInvites: [],
    friends: [],
}