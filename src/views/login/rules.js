export const mobileRules = [
  {
    required: true,
    message: '请填写手机号',
    trigger: 'onChange'
  },
  {
    pattern: /^1[3,5,7,8,9]\d{9}$/,
    message: '手机号格式不正确',
    trigger: 'onChange'
  }
]

export const codeRules = [
  {
    required: true,
    message: '请填写验证码',
    trigger: 'onChange'
  },
  {
    pattern: /^[0-9]{6}$/,
    message: '验证码格式不正确'
  }
]
