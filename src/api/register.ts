import request from '@/utils/request'

export const userRegisterService = ({username, password, repassword} : any ) => 
    request.post('/api/register', {username, password, repassword}) 

export const loginService = ({username, password} : any ) => 
    request.post('/api/login', {username, password})