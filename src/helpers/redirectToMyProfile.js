function redirect(store, next) {
  console.log(store.getters.getSearchingConfirmation)
  if (!store.getters.userData.usuario.rut) {
    next({
      name: 'my_profile'
    })
  } else {
    next()
  }
}

export default redirect
