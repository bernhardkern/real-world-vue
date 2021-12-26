import {createStore} from 'vuex'
import EventService from '@/services/EventService'
import router from '@/router'

export default createStore({
  state: {
    user: 'Adam Jahr',
    flashMessage: '',
    events: [],
    totalEvents: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
    SET_FLASH_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
  },
  actions: {
    createEvent({commit, dispatch}, event) {
      EventService.postEvent(event)
        .then((response) => {
          commit('ADD_EVENT', response.data)
          console.log('Event:', response.data)
          dispatch('fetchEvents', 1)
          commit('SET_FLASH_MESSAGE', 'successfully created event < ' + response.data.title + ' >')
          setTimeout(() => commit('SET_FLASH_MESSAGE', ''), 3000)
          router.push({name: 'EventList'})
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchEvents({commit}, page) {
      EventService.getEvents(2, page)
        .then((response) => {
          commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          console.log(error)
          router.push({name: 'NetworkError'})
        })
    },
  },
  modules: {},
})
