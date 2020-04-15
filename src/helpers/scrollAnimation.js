
export default function scrollAnimation (elementId) {
  document.querySelector(elementId).scrollIntoView({
    behavior: 'smooth'
  })
}
