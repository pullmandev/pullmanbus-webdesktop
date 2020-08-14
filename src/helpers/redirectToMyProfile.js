function redirect(store, next) {
  if (!store.getters.userData.usuario.rut) {
    next({
      name: 'my_profile'
    })
  } else {
    next()
  }
}

export default redirect
