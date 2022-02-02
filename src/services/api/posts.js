import axios from 'axios'

// const post = 'https://cors-anywhere.herokuapp.com/http://blog.pullmanbus.cl/?rest_route=/wp/v2/posts'
// const post = 'http://blog.pullmanbus.cl/?rest_route=/wp/v2/posts'

const post =
  'https://cors-anywhere.herokuapp.com/https://pullman-blog.witservices.io/?rest_route=/wp/v2/posts'

const instaPost = 'https://www.instagram.com/pullman.cl/'

export default {
  getPosts() {
    return axios.get(post)
  },
  getImage(url) {
    return axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
  },
  getInstaPost() {
    return axios.get(instaPost)
  }
}
