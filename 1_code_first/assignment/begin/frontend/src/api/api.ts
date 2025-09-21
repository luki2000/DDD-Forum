import axios from 'axios'
import type { RegistrationInput } from '../model/registrationInput'

export const api = {
  posts: {
    getPosts: () => {
      return axios.get('http://localhost:3000/posts?sort=recent')
    }
  },
  register: (input: RegistrationInput) => {
    return axios.post('http://localhost:3000/users/new', {
      ...input
    })
  }
}