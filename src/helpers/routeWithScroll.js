import router from '@/router'
import scrollAnimation from '@/helpers/scrollAnimation'

function routeWithScroll(idElement, routeName) {
  scrollAnimation(idElement)
  router.push({ name: routeName })
}

export default routeWithScroll
