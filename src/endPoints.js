// const base = 'https://www.pullmanbus.cl' // prod
const base = 'https://pullmanapi.pasajeschile.cl' // dev
const baseVenta = `${base}/integrador-web/rest/private/venta`
const basePago = `${base}/integrador-web/rest/pago`
const sesion = `${base}/srv-privado-viajaenbus-web/rest/usuario`
const compra = `${base}/srv-privado-viajaenbus-web/rest/compra`
const parametros = `${base}/srv-privado-viajaenbus-web/rest/parametros`

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
  registro: `${sesion}/guardar`,
  cambioPassword: `${sesion}/cambioPassowrd`,
  recuperarPassword: `${sesion}/recuperarPassword`,
  buscarTransEmail: `${compra}/buscarTransaccionPorEmail`,
  buscarBoletoCode: `${compra}/buscarBoletoPorCodigo`,
  cancel: `${baseVenta}/anularVenta`,
  tipoCuenta: `${parametros}/obtenerTipoCuenta`,
  bancos: `${parametros}/obtenerBanco`
}
