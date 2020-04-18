[{
    id: "fsd",

}]

class Users {
    constructor(name, age) {
        this.users = [];

    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    };

    // get names of all users in this Users list from given room
    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }

    // get user by id
    getUserById(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    // remove user by id
    removeUser(id) {
        let user = this.getUserById(id);
        console.log("user");
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
}
module.exports = { Users };