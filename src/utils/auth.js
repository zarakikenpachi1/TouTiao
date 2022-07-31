// 封装key值，避免在token中把名字打错
import storage from './storage'
const TOKEN = 'HEIMA_TOUTIAO_TOUKEN'
export const setToken = (value) => storage.set(TOKEN, value)

export const getToken = () => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)
