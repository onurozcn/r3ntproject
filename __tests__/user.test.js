const request = require("supertest")
const app = require("../src/app")

describe("User endpoint", () => {
    it("post request to /users should create a user", async () => {

        const userToCreate = {
            name: "Somename" + Date.now(),
            age: 27,
            email: "Been there, done that"
        }
        const createdUser = (await request(app).post("/users").send(userToCreate)).body
        expected(createdUser.name).toBe(userToCreate.name)
        expected(createdUser.age).toBe(userToCreate.age)
        expected(createdUser.email).toBe(userToCreate.email)

    })
})