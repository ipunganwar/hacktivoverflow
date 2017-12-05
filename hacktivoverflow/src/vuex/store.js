import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseUrl: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  questions: [],
  question: {},
  comments: [],
  comment: {}
}

const mutations = {
  setQuestions (state, payload) {
    console.log('data di mutations sebagai paylload', payload)
    state.questions = payload
  },
  setQuestion (state, payload) {
    state.question = payload
  },
  getQuestion (state, payload) {
    state.questions.push(payload[0])
  },
  setComments (state, payload) {
    console.log(payload)
    state.comments = payload
  },
  getComment (state, payload) {
    console.log(payload[0])
    state.comments.push(payload[0])
  },
  deleteComment (state, payload) {
    state.comments.forEach((item, index) => {
      if (item._id == payload) {
        state.comments.splice(index, 1)
      }
    })
  }
}

const actions = {
  getAllQuestions ({ commit }) {
    http.get('http://localhost:3000/api/questions/list')
    .then(({data}) => {
      commit('setQuestions', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getByIdQuestion ({ commit }, payload) {
    http.get(`http://localhost:3000/api/questions/getBy/${payload}`)
    .then(({data}) => {
      commit('setQuestion', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postQuestion ({ commit }, payload) {
    http.post(`http://localhost:3000/api/questions/create`, payload)
    .then(({data}) => {
      commit('getQuestion', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getCommentById ({ commit }, payload) {
    http.get(`http://localhost:3000/api/comments/list/${payload}`)
    .then(({data}) => {
      commit('setComments', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postComment ({ commit }, payload) {
    http.post('http://localhost:3000/api/comments/add', payload)
    .then(({data}) => {
      commit('getComment', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteComment ({ commit }, payload) {
    console.log(payload.token)
    http.delete(`http://localhost:3000/api/comments/destroy/${payload.id}`, 
  {headers: { token: payload.token }})
    .then(({data}) => {
      commit('deleteComment', payload.id)
    })
    .catch(err => {
      console.log(err)
    })
  }

}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store