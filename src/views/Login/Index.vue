<template>
  <div>
    <Login :open="sessionDialog.dialogType === 'login' && sessionDialog.open" />
    <SignUp
      :open="sessionDialog.dialogType === 'signup' && sessionDialog.open"
    />
    <SendPassword
      :open="sessionDialog.dialogType === 'sendPassword' && sessionDialog.open"
    />
  </div>
</template>
<script>
import Login from '@/views/Login/Login'
import SignUp from '@/views/Login/SignUp'
import SendPassword from '@/views/Login/SendPassword'
import { mapState } from 'vuex'

export default {
  components: {
    Login,
    SignUp,
    SendPassword
  },
  computed: mapState(['sessionDialog'])
}
</script>
