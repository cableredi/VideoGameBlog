const knex = require("knex");
const fixtures = require("./data-fixtures");
const app = require("../src/app");

describe("Comments Endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
    db.raw("TRUNCATE users, videos, comments RESTART IDENTITY CASCADE");
  });

  afterEach("cleanup", () =>
    db.raw("TRUNCATE users, videos, comments RESTART IDENTITY CASCADE")
  );

  after("disconnect from db", () => db.destroy());

  describe("GET /api/comments", () => {
    const testUsers = fixtures.makeUsersArray();

    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });

    context(`Given no comments`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/comments").expect(200, []);
      });
    });

    context("Given there are comments in the database", () => {
      const testVideos = fixtures.makeVideosArray();
      const testComments = fixtures.makeCommentsArray();

      beforeEach("insert Videos", () => {
        return db.into("videos").insert(testVideos);
      });

      beforeEach("insert comments", () => {
        return db.into("comments").insert(testComments);
      });

      it("gets the comments from database", () => {
        return supertest(app)
          .get("/api/comments")
          .expect((res) => {
            for (let i = 0; i < testComments.length; i++) {
              expect(res.body[i].video_id).to.eql(testComments[i].video_id);
              expect(res.body[i].user_id).to.eql(testComments[i].user_id);
              expect(res.body[i].user_comment).to.eql(
                testComments[i].user_comment
              );
              expect(res.body[i].date_created.substring(0, 9)).to.eql(
                testComments[i].date_created.substring(0, 9)
              );
              expect(res.body[i]).to.have.property("comment_id");
            }
          });
      });
    });
  });

  describe(`POST /api/comments`, () => {
    const testUsers = fixtures.makeUsersArray();
    const testVideos = fixtures.makeVideosArray();

    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });

    beforeEach("insert videos", () => {
      return db.into("videos").insert(testVideos);
    });

    it(`creates a comment responding with 201 and the new comment`, function () {
      this.retries(3);
      const newComment = {
        video_id: 2,
        user_id: 1,
        user_comment: "New Test Comment"
      };

      return supertest(app)
        .post("/api/comments")
        .send(newComment)
        .set("Authorization", fixtures.makeAuthHeader(testUsers[0]))
        .expect(201)
        .expect((res) => {
          expect(res.body.video_id).to.eql(newComment.video_id);
          expect(res.body.user_id).to.eql(newComment.user_id);
          expect(res.body.user_comment).to.eql(newComment.user_comment);
          expect(res.body).to.have.property("comment_id");
          expect(res.headers.location).to.eql(
            `/api/comments/${res.body.comment_id}`
          );
        })
        .then((res) =>
          supertest(app)
            .get(`/api/comments/${res.body.comment_id}`)
            .set("Authorization", fixtures.makeAuthHeader(testUsers[0]))
            .expect(res.body)
        );
    });
  });
});
