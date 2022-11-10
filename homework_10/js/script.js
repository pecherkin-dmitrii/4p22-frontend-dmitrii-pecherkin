"use strict"

const USERS_LIST_START_TEXT = "Наша база содержит данные следующих пользователей: ";

async function requestUsers() {
    try {
        const response = await fetch("https://reqres.in/api/users");
        return response.json()
    } catch (e) {
        console.log("Request failed. Error: ", e);
    }
}

async function displayUsersInfo() {
    try {
        const responseData = await requestUsers();
        const usersInfo = responseData.data;

        await displayLastNames(usersInfo);
        await displayAllUsersInfo(usersInfo, lastNameStartsWithFilter("F"));
        await displayUsersList(usersInfo);
        await displayUserObjectKeys(usersInfo);
    } catch (e) {
        console.log("Cannot get users info. Error: ", e);
    }
}

async function displayLastNames(usersInfo) {
    console.log("Users last names:");
    usersInfo.forEach(info => console.log(info.last_name));
    console.log("");
}

function lastNameStartsWithFilter(firstLetter) {
    return userInfo => userInfo.last_name.startsWith(firstLetter);
}

async function displayAllUsersInfo(usersInfo, usersFilter) {
    console.log("All users:")
    usersInfo
        .filter(usersFilter)
        .forEach(info => {
            for (let [key, value] of Object.entries(info)) {
                console.log(key + ": " + value);
            }
            console.log("");
        })
    console.log("");
}

async function displayUsersList(usersInfo) {
    const usersListString = usersInfo.reduce((acc, userInfo, index) => {
        acc = acc + userInfo.first_name + " " + userInfo.last_name + (index === usersInfo.length - 1 ? "" : ", ");
        return acc;
    }, USERS_LIST_START_TEXT);
    console.log(usersListString);
    console.log("");
}

async function displayUserObjectKeys(usersInfo) {
    if (usersInfo.length === 0) {
        console.log("No user objects received.");
    } else {
        console.log("Keys in user object: ");
        Object.keys(usersInfo[0]).forEach(key => console.log(key));
    }
}

displayUsersInfo();