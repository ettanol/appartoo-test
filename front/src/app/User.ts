export interface User {
    pseudo: string,
    password: string,
    role?: string,
    profileImageUrl?: string,
    isConnected?: boolean,
    peopleInvites: [],
    friends: [],
}