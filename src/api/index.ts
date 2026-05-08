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

type FilterData = {
  arr_title?: string
  from?: string
  to?: string
  category?: number
  price?: 'low' | 'high'
}

type FilterHotelData = {
  acc_name?: string
  acc_type?: string
  acc_stars?: number
}

export default {
  userLogin: ({ username, password }: LoginData) =>
    axios.post('auth/login', { username, password }),

  userRegister: ({ fullname, username, password, email }: RegisterData) =>
    axios.post('auth/register', { fullname, username, password, email }),

  getDestinations: (usr_id: number) =>
    axios.get('front/destinations', {
      params: { usr_id },
    }),
  getCategories: () => axios.get('front/categories'),
  filterArrByCat: (cat_id: number) =>
    axios.get('front/categories/filterArrangements', {
      params: { cat_id },
    }),

  //--- HOME PAGE ---//
  popularDest: (usr_id: number) =>
    axios.get('front/destinations/popular', {
      params: { usr_id },
    }),
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

  filterArrangements: (filters: FilterData) =>
    axios.get('front/arrangements/filter', {
      params: filters,
    }),

  filterDestinations: (des_name: string) =>
    axios.get('front/destinations/search', { params: { des_name } }),

  filterAccommodations: (filter: FilterHotelData) =>
    axios.get('front/accommodations/filter', { params: filter }),

  getFavorites: (usr_id: number) => axios.get('/front/favorites', { params: { usr_id } }),
  postFavorite: (usr_id: number, des_id: number) =>
    axios.post('front/favorites', { usr_id, des_id }),
  removeFavorite: (usr_id: number, des_id: number) =>
    axios.delete('front/favorites', {
      data: { usr_id, des_id },
    }),

  getTransport: () => axios.get('/front/transport'),

  getTransportArrangements: (tra_type: string) =>
    axios.get('/front/transport/details', { params: { tra_type } }),
}
