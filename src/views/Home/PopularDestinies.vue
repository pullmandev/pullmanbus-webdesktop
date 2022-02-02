<template>
  <NewsList
    :title="$t('home_text.news.title')"
    :subTitle="$t('home_text.news.sub')"
    :items="test_data"
  />
</template>

<script>
import NewsList from '@/components/NewsList'
// import API from '@/services/api/posts'

export default {
  components: {
    NewsList
  },

  data() {
    return {
      articles: [],
      test_data: [
        {
          img: 'img_not_1.png',
          link: '',
          content:
            'Pullman Bus comienza su marcha blanca para el proyecto Mascotas a Bordo'
        },
        {
          img: 'img_not_2.png',
          link: '',
          content: 'Ya es oficial, Pullman Bus es el sponsor oficial de San Antonio Unido'
        },
        {
          img: 'img_not_3.png',
          link: '',
          content:
            'Pullman Bus se ha certificado con la casa certificadora Aenor en sus protocolos covid-19'
        },
        {
          img: 'img_not_4.png',
          link: '',
          content:
            'Se viene Cyber Monday Pullman Bus, con un 25% de descuento en todo destino'
        }
      ]
    }
  }

  // async mounted() {
  //   const response = await API.getPosts()

  //   response.data
  //     .filter(item => {
  //       const id = 31
  //       let result = false

  //       for (let category of item.categories) {
  //         if (category === id) {
  //           result = true
  //           break
  //         }
  //       }
  //       return result
  //     })
  //     .forEach(item => {
  //       API.getImage(item._links['wp:featuredmedia'][0].href).then(response => {
  //         const img = response.data.media_details.sizes.medium_large.source_url

  //         this.articles.push({
  //           title: item.title.rendered,
  //           content: item.excerpt.rendered,
  //           link: item.link,
  //           img
  //         })
  //       })
  //     })
  // }
}
</script>
