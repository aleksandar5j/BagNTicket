import axios from './config'

type LoginData = {
  username: string
  password: string
}

type RegisterData = {
  fullname: string
  username: string
  password: string
  email: string
}

export default {
  userLogin: ({ username, password }: LoginData) =>
    axios.post('auth/login', { username, password }),

  userRegister: ({ fullname, username, password, email }: RegisterData) =>
    axios.post('auth/register', { fullname, username, password, email }),

  getDestinations: () => axios.get('front/destinations'),
  getCategories: () => axios.get('front/categories'),
  filterArrByCat: (cat_id: number) =>
    axios.get('front/categories/filterArrangements', {
      params: { cat_id },
    }),

  //--- HOME PAGE ---//
  popularDest: () => axios.get('front/destinations/popular'),
  lastMinuteDeals: () => axios.get('front/destinations/lastminute'),

  getDestinationDetails: (des_id: number) =>
    axios.get('front/destinations/details', {
      params: { des_id },
    }),

  getArrangementDetails: (arr_id: number) =>
    axios.get('front/arrangements/details', {
      params: { arr_id },
    }),

  getAccommodationDetails: (acc_id: number) =>
    axios.get('front/accommodations/details', {
      params: { acc_id },
    }),

  getArrangements: () => axios.get('front/arrangements'),
  getAccommodations: () => axios.get('front/accommodations'),

  loadGallery: (acc_id: number) => axios.get(`/front/images/gallery/${acc_id}`),
}
