<template>
  <div>
    <Login :open="sessionDialog.dialogType === 'login' && sessionDialog.open" />
    <SignUp :open="sessionDialog.dialogType === 'signup' && sessionDialog.open" />
    <SendPassword
      :open="sessionDialog.dialogType === 'sendPassword' && sessionDialog.open"
    />
    <Confirmation
      :open="sessionDialog.dialogType === 'confirmation' && sessionDialog.open"
    />
    <ChangePassword
      :open="sessionDialog.dialogType === 'changePassword' && sessionDialog.open"
    />
  </div>
</template>
<script>
import Login from '@/views/Login/Login'
import SignUp from '@/views/Login/SignUp'
import SendPassword from '@/views/Login/SendPassword'
import Confirmation from '@/views/Login/Confirmation'
import ChangePassword from '@/views/Login/ChangePassword'
import { mapState } from 'vuex'

export default {
  components: {
    Login,
    SignUp,
    SendPassword,
    Confirmation,
    ChangePassword
  },
  computed: mapState(['sessionDialog'])
}
</script>
