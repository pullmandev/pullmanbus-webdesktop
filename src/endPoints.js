// const base = 'https://pullman.cl' // prod
const base = 'https://pullmanapi.pasajeschile.cl' // dev

const baseVenta = `${base}/integrador-web/rest/private/venta`
const basePago = `${base}/integrador-web/rest/pago`
const sesion = `${base}/srv-privado-web/rest/usuario`
const compra = `${base}/srv-privado-web/rest/compra`
const parametros = `${base}/srv-privado-web/rest/parametros`
const confirmacion = `${base}/srv-privado-web/rest/confirmacion`
const anular = `${base}/srv-privado-web/rest/anular`
const administracion = `${base}/administracion-web/rest`
export default {
  cities: `${baseVenta}/buscaCiudades`,
  services: `${baseVenta}/obtenerServicio`,
  map: `${baseVenta}/planilla`,
  availability: `${baseVenta}/disponibilidad`,
  validateSeat: `${baseVenta}/validarAsiento`,
  takeSeat: `${baseVenta}/tomarAsiento`,
  freeSeat: `${baseVenta}/liberarAsiento`,
  transaction: `${basePago}/guardarTransaccion`,
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
  buscarBoletoConfirmacion: `${confirmacion}/buscarBoleto`,
  confirmarBoleto: `${confirmacion}/confirmarBoleto`,
  validarBoletoCanje: `${compra}/validarBoletoCanje`,
  canjearBoletoCanje: `${compra}/canjearBoletoCanje`,
  cancel: `${baseVenta}/anularVenta`,
  enviarMailAnulacion: `${anular}/enviarMailAnulacion`,
  tipoCuenta: `${parametros}/obtenerTipoCuenta`,
  bancos: `${parametros}/obtenerBanco`,
  itinerario: `${parametros}/buscarItinerario`,
  obtenerFaq: `${parametros}/obtenerFaq`,
  obtenerCiudades: `${parametros}/obtenerCiudades`,
  obtenerRegiones: `${parametros}/obtenerRegiones`,
  buscarMotivoContacto: `${parametros}/buscarMotivoContacto`,
  datosAgencia: `${administracion}/datosAgencia`,
  botonPago: `${administracion}/private/convenio/getConvenio`,
  validarConvenio: `${administracion}/private/convenio/getDescuentoConvenio`,
  convenios: `${administracion}/private/convenio/obtenerInformacion`,
  buscarCaluga: `${administracion}/private/contenido/buscarCaluga`
}
