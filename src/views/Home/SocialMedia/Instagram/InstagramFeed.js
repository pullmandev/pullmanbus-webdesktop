import API from '@/services/api/posts'

let image_sizes = {
  '150': 0,
  '240': 1,
  '320': 2,
  '480': 3,
  '640': 4
}

let escape_map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

function escape_string(str) {
  const regex = new RegExp('/[&<>"\'`=/]/g')

  return str.replace(regex, function(char) {
    return escape_map[char]
  })
}

function parse_caption(igobj, data) {
  if (
    typeof igobj.node.edge_media_to_caption.edges[0] !== 'undefined' &&
    typeof igobj.node.edge_media_to_caption.edges[0].node !== 'undefined' &&
    typeof igobj.node.edge_media_to_caption.edges[0].node.text !==
      'undefined' &&
    igobj.node.edge_media_to_caption.edges[0].node.text !== null
  ) {
    return igobj.node.edge_media_to_caption.edges[0].node.text
  }

  if (
    typeof igobj.node.title !== 'undefined' &&
    igobj.node.title !== null &&
    igobj.node.title.length != 0
  ) {
    return igobj.node.title
  }

  if (
    typeof igobj.node.accessibility_caption !== 'undefined' &&
    igobj.node.accessibility_caption !== null &&
    igobj.node.accessibility_caption.length != 0
  ) {
    return igobj.node.accessibility_caption
  }

  return data.username + ' image '
}

function getContent(data) {
  // Gallery
  let image_index = image_sizes[640]
  // typeof image_sizes[this.options.image_size] !== 'undefined'
  //   ? image_sizes[this.options.image_size]
  //   : image_sizes[640]

  if (typeof data.is_private !== 'undefined' && data.is_private === true) {
    console.error('Este sitio es privado')
    return
  }
  let imgs = (data.edge_owner_to_timeline_media || data.edge_hashtag_to_media)
      .edges,
    max = imgs.length > 3 ? 3 : imgs.length

  const content = []

  for (let i = 0; i < max; i++) {
    let url = 'https://www.instagram.com/p/' + imgs[i].node.shortcode,
      image,
      type_resource,
      caption = escape_string(parse_caption(imgs[i], data))

    switch (imgs[i].node.__typename) {
      case 'GraphSidecar':
        type_resource = 'sidecar'
        image = imgs[i].node.thumbnail_resources[image_index].src
        break
      case 'GraphVideo':
        type_resource = 'video'
        image = imgs[i].node.thumbnail_src
        break
      default:
        type_resource = 'image'
        image = imgs[i].node.thumbnail_resources[image_index].src
    }
    content.push({ url, type_resource, caption, image })
  }

  const result = {
    profileImage: data.profile_pic_url,
    biography: data.biography,
    fullname: data.full_name,
    content
  }

  return result
}

export default async function getFeedInfo() {
  try {
    const response = await API.getInstaPost()
    const text = response.data
      .split('window._sharedData = ')[1]
      .split('</script>')[0]

    let data = JSON.parse(text.substr(0, text.length - 1))

    data = data.entry_data.ProfilePage || data.entry_data.TagPage
    data = data[0].graphql.user || data[0].graphql.hashtag

    return getContent(data)
  } catch (err) {
    console.error(err)
  }
}
