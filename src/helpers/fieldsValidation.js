function emailValidation(v) {
  return /^.+@.+\..+$/.test(v) || 'E-mail debe ser valido'
}

function numberValidation(v) {
  if(v) {
    return v.length === 8 || 'Número debe ser de 8 dígitos'
  }
  else
  {
    return false
  }
}

function numericValidation(v) {
  return !isNaN
  (v) || 'Sólo debe ingresar numeros'
}

function otherDocValidation(v) {
  return !isNaN(v) || 'Nº de Documento no debe tener letras'
}

function passwordValidation(v) {
  return /^[A-Za-z0-9]{8,}$/.test(v) || 'Contraseña debe ser valida'
}

function rutValidation(v) {
  const listaNegra = ["11111111","22222222","33333333","44444444","55555555","66666666","77777777","88888888","99999999"]
  const message = 'Rut debe ser valido, con guión y sin puntos'
  let rutCompleto = v
  if (!/^[0-9]{7,8}[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return message
  let tmp = rutCompleto.split('-')
  let digv = tmp[1]
  let rut = tmp[0]
  if(rut.length < 7) return message
  if(listaNegra.find(element=>element==rut)) return message
  
  if (digv === 'K') digv = 'k'
  // eslint-disable-next-line eqeqeq
  if(rut != undefined && rut != '') {
    
    rut = rut.replaceAll(/[a-zA-Z]/g,'');
    console.log('Entra..',rut);
    
  }

  return dv(rut) == digv || message
}

function dv(T) {
  let M = 0
  let S = 1
  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - (M++ % 6))) % 11
  }
  return S ? S - 1 : 'k'
}
export default {
  emailValidation,
  numberValidation,
  otherDocValidation,
  passwordValidation,
  rutValidation,
  passwordCostaValidation,
  numericValidation
}

function passwordCostaValidation(v) {
  return /^[A-Za-z0-9]{4,}$/.test(v) || 'Contraseña debe ser valida'
}
