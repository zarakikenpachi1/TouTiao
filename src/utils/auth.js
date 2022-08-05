import storage from './storage'
// 封装，防止token名字打错
const token = 'TOUTIAO_TOKEN'

export const getToken = () => storage.get(token)

export const setToken = (value) => storage.set(token, value)

export const removeToken = () => storage.remove(token)
