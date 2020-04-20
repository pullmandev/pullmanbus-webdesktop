<template>
</template>
<script>
export default {
  mounted () {
    const {url, token} = localStorage
    var f = document.createElement('form')
    f.setAttribute('method', 'post')
    f.setAttribute('action', url)
    var i = document.createElement('input')
    i.setAttribute('type', 'text')
    i.setAttribute('name', 'TBK_TOKEN')
    i.setAttribute('value', token)
    f.appendChild(i.cloneNode())
    f.style.display = 'none'
    document.body.appendChild(f)
    f.submit()
    document.body.removeChild(f)
    localStorage.url = ''
    localStorage.token = ''
  }
}
</script>

