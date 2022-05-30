module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const cards = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: 'lists'
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
  }, {
    timestamps: true
  });

  return mongooseClient.model('cards', cards);
};
