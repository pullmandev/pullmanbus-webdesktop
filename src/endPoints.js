// const base = 'https://www.pullmanbus.cl' // prod
//const baseServ = 'https://servicios.pullmanbus.cl' // prod
const base = 'https://pullmanapi.pasajeschile.cl' // dev
const baseServ = 'https://pullmanapi.pasajeschile.cl' // dev

const baseVenta = `${base}/integrador-web/rest/private/venta`
const basePago = `${base}/integrador-web/rest/pago`
const sesion = `${base}/srv-privado-web/rest/usuario`
const compra = `${base}/srv-privado-web/rest/compra`
const parametros = `${base}/srv-privado-web/rest/parametros`
const confirmacion = `${base}/srv-privado-web/rest/confirmacion`
const serviciosVenta = `${baseServ}/serviciosVenta/rest/Servicios`
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
  buscarTransEmail: `${compra}/obtenerTransacciones`,
  buscarBoletoCode: `${compra}/obtenerBoleto`,
  guardarSolicitudServicio: `${compra}/guardarSolicitudServicio`,
  buscarBoleto: `${compra}/buscarBoleto`,
  buscarBoletoConfirmacion: `${confirmacion}/buscarBoleto`,
  confirmarBoleto: `${confirmacion}/confirmarBoleto`,
  validarBoletoCanje: `${compra}/validarBoletoCanje`,
  canjearBoletoCanje: `${compra}/canjearBoletoCanje`,
  cancel: `${baseVenta}/anularVenta`,
  tipoCuenta: `${parametros}/obtenerTipoCuenta`,
  bancos: `${parametros}/obtenerBanco`,
  itinerario: `${parametros}/buscarItinerario`,
  obtenerFaq: `${parametros}/obtenerFaq`,
  botonPago: `${serviciosVenta}/GetConvenio`,
  validarConvenio: `${serviciosVenta}/GetDescuentoConvenio`,
  convenios: `${administracion}/private/convenio/obtenerInformacion`,
  buscarCaluga: `${administracion}/private/contenido/buscarCaluga`
}
