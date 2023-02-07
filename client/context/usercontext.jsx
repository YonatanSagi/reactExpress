import React, { useContext, useState } from 'react';

const UserContext = React.createContext();
const SetUserContext = React.createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function useSetUserContext() {
    return useContext(SetUserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}