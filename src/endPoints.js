//const base = 'https://pullman.cl' // prod
//const base = 'https://pullmanapi.viajaenbus.cl/' // dev
//const base = 'http://qa.pullman.cl'
const base = ''

const baseVenta = `${base}/integrador-web/rest/private/venta`
const basePago = `${base}/integrador-web/rest/pago`
const sesion = `${base}/srv-privado-web/rest/usuario`
const compra = `${base}/srv-privado-web/rest/compra`
const parametros = `${base}/srv-privado-web/rest/parametros`
const anular = `${base}/srv-privado-web/rest/anular`
const administracion = `${base}/administracion-web/rest`
const operacion = `${base}/integrador-web/rest/operacion`
const baseCuponera = `${base}/integrador-web/rest/cuponera`
const pasajero = `${base}/srv-privado-web/rest/pasajero`

export default {
  cities: `${baseVenta}/buscaCiudades`,
  citiesTo: `${baseVenta}/buscarCiudadPorCodigo`,
  services: `${baseVenta}/obtenerServicio`,
  map: `${baseVenta}/planilla`,
  availability: `${baseVenta}/disponibilidad`,
  validateSeat: `${baseVenta}/validarAsiento`,
  takeSeat: `${baseVenta}/tomarAsientoV2`,
  freeSeat: `${baseVenta}/liberarAsiento`,
  transaction: `${basePago}/guardarTransaccion`,
  validaCupon: `${operacion}/validarCupon`,
  validaCuponNuevo: `${operacion}/validaCuponNuevo`,
  searchHeader: `${baseVenta}/buscarEncabezado`,
  generateVoucher: `${baseVenta}/generarComprobante`,
  auth: `${sesion}/autenticar`,
  registro: `${sesion}/inscribirUsuario`,
  actualizar: `${sesion}/guardar`,
  cambioPassowrd: `${sesion}/cambioPassowrd`,
  recuperarPassword: `${sesion}/recuperarPassword`,
  guardarUsuario: `${sesion}/guardarUsuario`,
  enviarContacto: `${sesion}/enviarContacto`,
  buscarTransEmail: `${compra}/obtenerTransacciones`,
  buscarBoletoCode: `${compra}/obtenerBoleto`,
  guardarSolicitudServicio: `${compra}/guardarSolicitudServicio`,
  buscarBoleto: `${compra}/buscarBoleto`,
  buscarBoletoConfirmacion: `${operacion}/buscarBoleto`,
  confirmarBoleto: `${operacion}/confirmarBoleto`,
  buscarCityConfirmacion: `${operacion}/buscarOrigen`,
  buscarCityToConfirmacion: `${operacion}/buscarDestino`,
  validarBoletoCanje: `${operacion}/validarBoletoCambio`,
  canjearBoletoCanje: `${operacion}/cambiarBoleto`,
  cancel: `${baseVenta}/anularVenta`,
  enviarMailAnulacion: `${anular}/enviarMailAnulacion`,
  tipoCuenta: `${parametros}/obtenerTipoCuenta`,
  bancos: `${parametros}/obtenerBanco`,
  itinerario: `${parametros}/buscarItinerario`,
  obtenerFaq: `${parametros}/obtenerFaq`,
  obtenerCiudades: `${parametros}/obtenerCiudades`,
  obtenerRegiones: `${parametros}/obtenerRegiones`,
  buscarMotivoContacto: `${parametros}/buscarMotivoContacto`,
  datosAgencia: `${parametros}/datosAgencia`,
  botonPago: `${administracion}/private/convenio/getConvenio`,
  validarConvenio: `${administracion}/private/convenio/getDescuentoConvenio`,
  convenios: `${administracion}/private/convenio/obtenerInformacion`,
  buscarCaluga: `${administracion}/private/contenido/buscarCaluga`,
  mapVertical: `${baseVenta}/buscarPlantillaVertical`,
  buscarCuponera: `${baseCuponera}/buscarCuponera`,
  validarUsuario: `${baseCuponera}/validarUsuario`,
  transactionCoupon: `${baseCuponera}/guardarTransaccionCuponera`,
  searchHeaderCoupon: `${baseCuponera}/buscarEncabezadoCuponera`,
  generateCoupon: `${baseCuponera}/generarComprobanteCuponera`,
  obtenerListaCiudad: `${parametros}/obtenerListaCiudad`,

  buscarListaTipoDocumento: `${pasajero}/buscarListaTipoDocumento`,
  buscarListaNacionalidad: `${pasajero}/buscarListaNacionalidad`,
  buscarPorNumeroDocumento: `${pasajero}/buscarPorNumeroDocumento`,
  guardarRelacionPasajero: `${pasajero}/guardarRelacionPasajero`,

  buscarRegistroPorBoleto: `${operacion}/buscarRegistro`,
  editarRegistroBoleto: `${operacion}/modificarRegistro`,

  origenCuponera: `${baseCuponera}/buscarOrigenCuponera`,
  destinoCuponera: `${baseCuponera}/buscarDestinoCuponera`,

  detalleConvenioAtributo:  `${administracion}/private/convenio/getDetalleConvenioAtributo`,
  buscarListaCarrusel: `${administracion}/private/contenido/obtenerSeccion`,
  buscarUsuario: `${sesion}/obtenerUsuarioPass`,
  cambiarClave: `${sesion}/modificarClaveUsuario`,
  enviarClave: `${sesion}/enviarCorreoClave`,

  guardarDatosCliente: `${baseCuponera}/guardarDatosClienteCuponera`

}
