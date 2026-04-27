import axios from './config'

export default {
  getDestinations: () => axios.get('front/destinations'),
  getCategories: () => axios.get('front/categories'),
}
