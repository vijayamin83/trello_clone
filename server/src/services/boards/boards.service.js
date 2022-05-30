const createService = require('feathers-mongoose');
const createModel = require('../../models/boards.model');
const hooks = require('./boards.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'boards',
    Model,
    paginate
  };

  app.use('/boards', createService(options));

  const service = app.service('boards');

  service.hooks(hooks);
};
