// 封装localstorage
// class类的特性 封装 继承 多态
class Storage {
  get(key) {
    // localStorage.getItem('key')
    const value = localStorage.getItem(key)
    // JSON.parse只能转换JSON格式的字符串
    // 如果是JSON格式的字符串就进行转换，如果不是就直接return
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
