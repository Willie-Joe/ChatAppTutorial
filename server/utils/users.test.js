const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
    let users;

    // executed before each test
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: "a1",
                name: "name1",
                room: "room1"
            },
            {
                id: "a2",
                name: "name2",
                room: "room3"
            }
            , {
                id: "a3",
                name: "name3",
                room: "room1"
            }
        ]
    });



    it("should add new user", () => {
        let users = new Users();
        let user = {
            id: "dfsd",
            name: "name",
            room: "room"
        };

        let reUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    // test for getting all users of given room
    it("should return all names for room1", () => {
        let userList = users.getUserList("room1");

        expect(userList).toEqual(["name1", "name3"])
    });

    //  test for get an user by id
    it("should return user of given id", () => {
        let userId = "a2";
        let user = users.getUserById(userId);
        console.log("dsf", user)
        expect(user.id).toEqual(userId)
    })

    //  test for no user of given if found
    it("should not find user", () => {
        let userId = "a27";
        let user = users.getUserById(userId);

        expect(user).toBeUndefined();
    });


    it("should remove given user from Users", () => {
        let userId = "a1";
        user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);


    });

    it("should not remove given user from Users", () => {
        let userId = "a133";
        user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);


    })
});