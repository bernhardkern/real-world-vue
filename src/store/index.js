import {createStore} from 'vuex'
import EventService from '@/services/EventService'
import router from '@/router'

export default createStore({
  state: {
    user: 'Adam Jahr',
    flashMessage: '',
    events: [],
    event: [],
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
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_FLASH_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
  },
  actions: {
    displayFlashMessage({commit}, message) {
      commit('SET_FLASH_MESSAGE', message)
      setTimeout(() => commit('SET_FLASH_MESSAGE', ''), 4000)
    },
    createEvent({commit, dispatch}, event) {
      return EventService.postEvent(event)
        .then((response) => {
          commit('SET_EVENT', response.data)
          console.log('Event:', response.data)
          dispatch('fetchEvents', 1)
          dispatch('displayFlashMessage', 'successfully created event < ' + response.data.title + ' >')
        })
        .catch((error) => {
          throw error
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
    fetchEvent({commit}, id) {
      EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            router.push({
              name: '404Resource',
              params: {resource: 'event'},
            })
          } else {
            router.push({name: 'NetworkError'})
          }
          console.log(error)
        })
    },
  },
  modules: {},
})
