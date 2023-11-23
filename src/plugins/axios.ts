import axios from 'axios'

export const defaultAxios = axios.create()
defaultAxios.defaults.baseURL = import.meta.env.VITE_APP_API_DOMAIN
defaultAxios.defaults.withCredentials = true
