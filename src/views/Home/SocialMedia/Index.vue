<template>
  <div>
    <h3
      class="display-3 text-center blue_dark--text"
      style="font-size: 2rem !important;"
    >
      Redes
    </h3>
    <Facebook />
    <Instagram />
  </div>
</template>
<script>
import Facebook from '@/views/Home/SocialMedia/Facebook'
import Instagram from '@/views/Home/SocialMedia/Instagram/Index'
export default {
  components: {
    Facebook,
    Instagram
  }
}
</script>
