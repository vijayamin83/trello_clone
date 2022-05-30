const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      hooks.restrictToOwner({
        ownerField: 'createrId'
      })
    ],
    get: [
      hooks.restrictToOwner({
        ownerField: 'createrId'
      })
    ],
    create: [
      hooks.associateCurrentUser({
        as: 'createrId'
      })
    ],
    update: [
      hooks.restrictToOwner({
        ownerField: 'createrId'
      })
    ],
    patch: [
      hooks.restrictToOwner({
        ownerField: 'createrId'
      })
    ],
    remove: [
      hooks.restrictToOwner({
        ownerField: 'createrId'
      })
    ]
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
