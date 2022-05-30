const actions = {
  login({ dispatch }, { valid, user }) {
    if (valid) {
      return dispatch('auth/authenticate', {
        strategy: 'local',
        ...user,
      }, { root: true });
    }
    return 0;
  },
};

export default {
  namespaced: true,
  actions,
};
