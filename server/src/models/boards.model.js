module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const boards = new Schema({
    name: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    createrId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('boards', boards);
};
