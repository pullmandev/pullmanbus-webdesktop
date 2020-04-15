<template>
  <div class="destinies-type-container blue_light pt-5">
    <h3 class="display-2 text-center white--text">
      Pullman bus de cordillera a mar
    </h3>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="(item, index) of items" :key="index">
          <v-card max-width="344" class="mx-auto">
            <v-img
              :src="require(`../../../static/images/home/${item.img}`)"
              height="194"
              contain
            ></v-img>
            <v-card-text>
              <h3>{{ item.title }}</h3>
              <p>
                {{ item.text }}
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn dark color="blue_dark">
                Más info.
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        img: 'Elemento1.png',
        title: 'Norte de Chile',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolor maiores perferendis ad voluptates, aut tempore saepe quibusdam corporis'
      },
      {
        img: 'Elemento2.png',
        title: 'Chile Central',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolor maiores perferendis ad voluptates, aut tempore saepe quibusdam corporis'
      },
      {
        img: 'Elemento3.png',
        title: 'Sur de Chile',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolor maiores perferendis ad voluptates, aut tempore saepe quibusdam corporis'
      },
      {
        img: 'Elemento4.png',
        title: 'Otros destinos',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolor maiores perferendis ad voluptates, aut tempore saepe quibusdam corporis'
      }
    ]
  })
}
</script>
<style scoped>
.destinies-type-container {
  width: 100vw;
  height: 80vh;
}
</style>
