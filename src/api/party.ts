import request from '@/utils/request'

export const partyListFindService = () => request.get('/parties')
