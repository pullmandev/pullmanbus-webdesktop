function emailValidation (v) {
  return /^.+@.+\..+$/.test(v) || 'E-mail debe ser valido'
}

function passwordValidation (v) {
  return /^[A-Za-z0-9]{8,}$/.test(v) || 'Contraseña debe ser valida'
}

function rutValidation (v) {
  const message = 'Rut debe ser valido, con guión y sin puntos'
  let rutCompleto = v
  if (!(/^[0-9]{7,8}[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))) return message
  let tmp = rutCompleto.split('-')
  let digv = tmp[1]
  let rut = tmp[0]
  if (digv === 'K') digv = 'k'
  // eslint-disable-next-line eqeqeq
  return (dv(rut) == digv) || message
}

function dv (T) {
  let M = 0
  let S = 1
  for (;T; T = Math.floor(T / 10)) {
    S = (S + T % 10 * (9 - M++ % 6)) % 11
  }
  return S ? S - 1 : 'k'
}

export default {
  emailValidation,
  passwordValidation,
  rutValidation
}
