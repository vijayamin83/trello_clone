const state = {
  messages: [],
};

const mutations = {
  pushSnack: (state, messages) => state.messages = messages,
  acknowledgeSnackById: state => state.messages = [],
};

export default {
  namespaced: true,
  state,
  mutations,
};
