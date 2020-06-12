import axios from 'axios'

const post =
  'https://cors-anywhere.herokuapp.com/http://blog.pullmanbus.cl/?rest_route=/wp/v2/posts'

export default {
  getPosts() {
    return axios.get(post)
  },
  getImage(url) {
    return axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
  }
}
