const knex = require("knex");
const fixtures = require("./data-fixtures");
const app = require("../src/app");

describe("Videos Endpoints", () => {
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

  describe("GET /api/videos", () => {
    context(`Given no videos`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/videos").expect(200, []);
      });
    });

    context("Given there are videos in the database", () => {
      const testVideos = fixtures.makeVideosArray();

      beforeEach("insert videos", () => {
        return db.into("videos").insert(testVideos);
      });

      it("gets the videos from database", () => {
        return supertest(app).get("/api/videos").expect(200, testVideos);
      });
    });
  });

  describe("GET /api/videos/:video_id", () => {
    const testVideos = fixtures.makeVideosArray();

    beforeEach("insert videos", () => {
      return db.into("videos").insert(testVideos);
    });

    it("responds with 200 and the specified video", () => {
      const video_id = 1;
      const expectedVideo = fixtures.makeExpectedVideo();

      return supertest(app)
        .get(`/api/videos/${video_id}`)
        .expect(200, expectedVideo);
    });
  });

  describe(`PATCH /api/videos/:video_id`, () => {
    const testVideos = fixtures.makeVideosArray();

    beforeEach("insert videos", () => {
      return db.into("videos").insert(testVideos);
    });

    context(`Given no videos`, () => {
      it(`responds with 404`, () => {
        const video_id = 123456;
        return supertest(app)
          .patch(`/api/videos/${video_id}`)
          .expect(404, { error: { message: `Video Not Found` } });
      });
    });

    context("Given there are videos in the database", () => {
      it("responds with 204 and updates the video", () => {
        const idToUpdate = 1;
        const updateVideo = {
          title: "Video Title 1",
          video_link: "https://www.video1link.com",
          thumb_link: "https://www.thumb1link.com",
          views: "1",
          likes: "1",
          dislikes: "1",
        };

        const expectedVideo = {
          ...testVideos[idToUpdate - 1],
          ...updateVideo,
        };

        return supertest(app)
          .patch(`/api/videos/${idToUpdate}`)
          .send(updateVideo)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/videos/${idToUpdate}`)
              .expect(200)
              .expect((res) => {
                expect(res.body.title).to.eql(expectedVideo.title);
                expect(res.body.video_link).to.eql(expectedVideo.video_link);
                expect(res.body.thumb_link).to.eql(expectedVideo.thumb_link);
                expect(res.body.likes).to.eql(expectedVideo.likes);
                expect(res.body.dislikes).to.eql(expectedVideo.dislikes);
                expect(res.body.views).to.eql(expectedVideo.views);
                expect(res.body).to.have.property("video_id");
              })
          );
      });
    });
  });
});
