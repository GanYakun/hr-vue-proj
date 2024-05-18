import axios from 'axios'

const baseURL = 'http://localhost:8080'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000

})

instance.interceptors.request.use(
    (config) => {
        
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(function (response) {
    return response
}, function (err) {
    return Promise.reject(err)
})

export default instance
export { baseURL }
