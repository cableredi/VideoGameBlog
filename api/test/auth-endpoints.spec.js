const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const fixtures = require("./data-fixtures");

describe("Auth Endpoints", () => {
  let db;

  const testUsers = fixtures.makeUsersArray();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
    db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  });

  afterEach("cleanup", () => db.raw("TRUNCATE users RESTART IDENTITY CASCADE"));

  after("disconnect from db", () => db.destroy());

  describe(`POST /api/auth/login`, () => {
    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });

    const requiredFields = ["username", "password"];

    requiredFields.forEach((field) => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password,
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it(`responds 400 'invalid username or password' when bad username`, () => {
      const userInvalidUser = { username: "user-not", password: "existy" };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidUser)
        .expect(400, { error: `Incorrect username or password` });
    });

    it(`responds 400 'invalid username or password' when bad password`, () => {
      const userInvalidPass = {
        username: testUser.username,
        password: "incorrect",
      };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidPass)
        .expect(400, { error: `Incorrect username or password` });
    });

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: testUser.username,
        password: "testUser1!",
      };
      const expectedToken = jwt.sign(
        { user_id: testUser.user_id, first_name: testUser.first_name }, // payload
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          expiresIn: process.env.JWT_EXPIRY,
          algorithm: "HS256",
        }
      );
      return supertest(app)
        .post("/api/auth/login")
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        });
    });
  });
});
