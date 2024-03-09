
export const loadUsers = () => {
    const usersJson = localStorage.getItem("users")
    if (usersJson) {
        const users = JSON.parse(usersJson);
        return users;;
    } else {
        return [];
    }
}

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users))
}

export const loginUser = (username, password) => {
    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        //TODO save to sessionstorage
        sessionStorage.setItem("login", JSON.stringify(user));
        return true;
    } else {
        return false;
    }
}

export const logoutUser = (email) => {
    const rawUser = sessionStorage.getItem("login")
    if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user.email === email) {
            sessionStorage.removeItem("login");
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}
export const adminEditUser = (updatedUser) => {
    const users = loadUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index === -1) {
        return false;
    }
    users[index] = updatedUser;
    saveUsers(users);
    return true;
}
export const editUser = (updatedUser) => {
    const rawUser = sessionStorage.getItem("login");
    if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user.email == updatedUser.email) {
            sessionStorage.setItem('login', JSON.stringify(updatedUser));
            const users = loadUsers();
            const userIndex = users.findIndex(u => u.email === updatedUser.email);
            if (userIndex === -1) {
                return false;
            }
            users[userIndex] = updatedUser
            saveUsers(users);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }


}