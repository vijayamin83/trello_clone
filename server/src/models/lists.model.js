module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const lists = new Schema({
    name: {
      type: String,
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
    background: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('lists', lists);
};
