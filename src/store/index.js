import {createStore} from 'vuex'

export default createStore({
  state: {
    user: 'Adam Jahr',
    flashMessage: '',
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_FLASH_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
  },
  actions: {},
  modules: {},
})
