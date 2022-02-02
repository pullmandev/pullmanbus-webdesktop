<template>
  <div id="news" class="my-12">
    <img
      src="../../../static/images/news/banner_noticias.png"
      alt="banner-confirmacion"
      style="width: 100%"
    />
    <v-container class="mt-8">
      <v-toolbar color="blue_light" class="toolbar-radius white--text elevation-0" dense>
        <div class="pa-1 mr-2" style="border-radius: 50%; border: 2px solid white">
          <v-icon color="white" size="28">mdi-bullhorn-outline</v-icon>
        </div>
        <v-toolbar-title>
          <h1 class="text-left title" style="line-height: 20px">
            {{ $t('news') }}
          </h1>
        </v-toolbar-title>
      </v-toolbar>
      <h2 class="blue_light--text my-5" style="font-size: 1.4rem;">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dicta nam
        delectus officiis corporis
      </h2>
      <div class="news-content">
        <div class="mr-12 blue_light--text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime
            quidem dolore nemo tempora doloribus, impedit inventore ratione fuga,
            consequatur magni incidunt. Ad vel tenetur assumenda ratione tempore iusto
            omnis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            accusamus voluptates consequuntur illo sint ducimus a itaque perferendis
            beatae minus ullam officiis vitae repudiandae quaerat molestiae ex cumque
            aperiam perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cum ipsa quibusdam accusantium vel laborum praesentium alias? Reprehenderit
            hic earum facere odio possimus corporis nemo minus voluptatum, quod id,
            perferendis error.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ad similique,
            maxime porro aut error impedit corporis vel aspernatur laboriosam magni
            reiciendis. Suscipit minus incidunt, alias cupiditate enim ipsam porro. Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Quia libero, officiis,
            dolorum maiores optio mollitia, molestiae fugit consequuntur error esse soluta
            at velit? Corporis ex atque quisquam incidunt fugit omnis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic inventore
            consectetur, id commodi ex fugiat minima accusamus nobis dicta ad in voluptate
            nesciunt doloribus neque porro quae necessitatibus a molestias? Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Officia maiores laboriosam illum
            facilis vel excepturi sunt eligendi, laudantium nemo autem quae totam ipsa
            suscipit nostrum, fuga laborum ex reiciendis saepe. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Reiciendis assumenda maiores accusantium
            voluptatem, sint quidem. Optio veniam natus sint beatae esse culpa nihil
            temporibus impedit quisquam rem, tempore, repellat autem?
          </p>
        </div>
        <div class="d-flex flex-column">
          <img
            class="mb-12"
            src="../../../static/images/home/slides/img_not_2.png"
            alt=""
          />
          <img src="../../../static/images/home/slides/img_not_1.png" alt="" />
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import scrollAnimation from '@/helpers/scrollAnimation'
export default {
  mounted() {
    this.scrollToTop()
  },
  methods: {
    scrollToTop() {
      scrollAnimation('#news')
    }
  }
}
</script>
<style lang="scss" scoped src="./News.scss"></style>
