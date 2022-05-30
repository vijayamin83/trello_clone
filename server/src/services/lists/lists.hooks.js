const { authenticate } = require('@feathersjs/authentication').hooks;
const { isBoardOwner } = require('../../hooks/authorization');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), isBoardOwner],
    get: [authenticate('jwt'), isBoardOwner],
    create: [authenticate('jwt'), isBoardOwner],
    update: [authenticate('jwt'), isBoardOwner],
    patch: [authenticate('jwt'), isBoardOwner],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
