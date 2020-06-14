const VideosService = {
    getAll(knex) {
      return knex
        .select('*')
        .from('videos')
        .orderBy('video_id', 'asc')
    },
    getById(knex, id) {
      return knex
      .from('videos')
      .select('*')
      .where('video_id', id)
      .first()
    },
    updateVideo(knex, id, newVideoFields) {
      return knex('videos')
        .where({ video_id: id })
        .update(newVideoFields)
    },
  };
  
  module.exports = VideosService;