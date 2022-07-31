// 封装本地存储
// 用class 特性：封装 继承 多态
class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    // JSON.parse的方法只能转化json字符串
    // 用try catch的方法判断如果是json字符串就json.parse转化一下，否则就直接return返回
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
