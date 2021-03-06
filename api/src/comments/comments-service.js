const CommentsService = {
  getAllComments(knex) {
    return knex
      .select(
        "comments.*",
        "users.first_name",
        "users.last_name",
        "users.avatar"
      )
      .from("comments")
      .leftJoin("users", "users.user_id", "comments.user_id")
      .orderBy("date_created", "desc");
  },
  getById(knex, id) {
    return knex
      .select(
        "comments.*",
        "users.first_name",
        "users.last_name",
        "users.avatar"
      )
      .from("comments")
      .leftJoin("users", "users.user_id", "comments.user_id")
      .where("comment_id", id)
      .first();
  },
  insertComment(knex, newComment) {
    return knex
      .insert(newComment)
      .into("comments")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = CommentsService;
