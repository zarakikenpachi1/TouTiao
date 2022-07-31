export const mobileRoules = [
  { required: true, message: '请填写用户名' },
  { pattern: /^1[0-9]\d{9}$/, message: '输入的手机号不合法' }
]
export const codeRoulese = [
  { required: true, message: '请填写验证码' },
  { pattern: /^[0-9]{6}$/, message: '验证号码格式不正确' }
]
