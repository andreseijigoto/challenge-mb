export function validateEmpty(param) {
  return !!param && param.trim().length
}

export function validateLength(param, min = 0, max) {
  const len = param?.trim.length || 0

  return !param || !len || (len >= min && len <= max)
}

export function validateEmail(param) {
  return !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(param)
}

export function validateFullName(param) {
  return !!/^([a-zA-Z]+\s?\b){2,}$/.test(param)
}

export function validateCpf(param) {
  // missing deep cpf validation
  return !!/^\d{11}$/.test(param)
}

export function validateCnpj(param) {
  // missing deep cnpj validation
  return !!/^\d{14}$/.test(param)
}

export function validatePhone(param) {
  return !!/^\d{10,11}$/.test(param)
}
