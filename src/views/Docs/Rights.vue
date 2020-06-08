<template>
  <section class="container">
    <v-row>
      <v-col cols="10" offset="1">
        <h2 class="mb-12">{{ $t('your_rights') }}</h2>

        <h3>Deberes de los pasajeros</h3>
        <ul class="my-6">
          <li>
            Planifique su viaje y compre sus pasajes con la debida anticipación.
          </li>
          <li>
            Compre los pasajes solo en las líneas y las empresas del comercio
            establecido para así estar adecuadamente protegido frente a posibles
            problemas. El transporte ilegal o pirata no entrega ninguna garantía
            de respeto a los derechos como consumidor.
          </li>
          <li>
            Confirme la validez de las promociones u ofertas que puedan disponer
            las empresas en sus viajes. Revise folletos (si los hay), pregunte
            al vendedor de pasajes (en las cajas de los terminales de buses o
            centros de venta) o revise el sitio Web de cada empresa, si esta lo
            posee.
          </li>
          <li>
            Exija un comprobante por cada bulto de equipaje que lleve en las
            cámaras portaequipajes.
          </li>
          <li>
            Tenga precaución con su equipaje de mano, es de su entera
            responsabilidad lo que lleve al interior del bus.
          </li>
          <li>
            Declare al llevar equipaje cuyo valor exceda a las 5 Unidades
            Tributarias Mensuales ($160.000 aproximados) en los formularios
            habilitados por cada empresa. Si no lo hace, se expone a que ante la
            pérdida de su equipaje, la empresa sólo responda hasta 5 UTM y no
            por el verdadero valor del bien que extravió.
          </li>
          <li>
            Exija que el bus donde viaja lleve un dispositivo acústico y
            luminoso de color rojo al interior del vehículo, el cual debe estar
            a la vista de los pasajeros y activarse automáticamente cada vez que
            la velocidad del bus exceda de 100 kilómetros por hora.
          </li>
          <li>
            Exija al conductor bajar la velocidad cuando el dispositivo esté
            encendido.
          </li>
          <li>
            Exija que el volumen del audio (radio o tv) se mantenga en un nivel
            adecuado.
          </li>
          <li>
            Es también su deber mantener en buen estado el mobiliario de la
            unidad que lo transporta, no debe rayar o destruir asientos, vidrios
            y cortinas del bus, tampoco pegar chicles u otros de carácter
            adhesivo. El baño debe ser usado solo para orinar, teniendo en
            consideración que lo utilizarán también otros pasajeros. Está
            prohibido a los pasajeros fumar y beber alcohol dentro del bus.
          </li>
          <li>
            Ponga por escrito sus comentarios en el libro de reclamos de la
            empresa ante incumplimientos de los servicios ofrecidos.
          </li>
        </ul>

        <h3>
          OTRAS DIRECCIONES DE INTERÉS RESPECTO A ESTE TEMA
        </h3>
        <ul class="my-6">
          <li>
            Ley del Consumidor (<a
              href="http://www.gobiernodechile.cl/consumidor/ley.asp"
              target="_blank"
              >http://www.gobiernodechile.cl/consumidor/ley.asp</a
            >)
          </li>
          <li>
            Reglamento de los Servicios Nacionales de Transporte Público de
            Pasajeros (D.S 212/92) (<a
              href="http://www.subtrans.cl/subtrans/doc/leyes_ds212_1992(agosto2005).pdf"
              target="_blank"
              >http://www.subtrans.cl/subtrans/doc/leyes_ds212_1992(agosto2005).pdf</a
            >)
          </li>
          <li>
            Fiscalización de Transportes (<a
              href="http://www.mttfiscalizacion.cl"
              target="_blank"
              >http://www.mttfiscalizacion.cl</a
            >)
          </li>
          <li>
            Ministerio de Transportes (<a
              href="http://www.mtt.cl"
              target="_blank"
              >http://www.mtt.cl</a
            >)
          </li>
          <li>
            Subsecretaría de Transportes (<a
              href="http://www.subtrans.cl"
              target="_blank"
              >http://www.subtrans.cl</a
            >)
          </li>
          <li>
            Servicio Nacional del Consumidor Sernac (<a
              href="http://www.sernac.cl"
              target="_blank"
              >http://www.sernac.cl</a
            >)
          </li>
          <li>
            Fenabus (<a href="http://www.fenabus.cl" target="_blank"
              >http://www.fenabus.cl</a
            >)
          </li>
        </ul>
      </v-col>
    </v-row>
  </section>
</template>
<script>
export default {
  mounted() {
    this.$parent.scrollToTop()
    this.$parent.$data.title = 'your_rights'
  }
}
</script>
<style scoped>
h2 {
  text-align: center;
}
</style>
