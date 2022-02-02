<template>
  <v-input
    :error="error"
    :rules="rutRules"
    :value="rut"
    :class="containerClass"
    class="v-input--dense v-text-field v-text-field--filled v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"
  >
    <fieldset aria-hidden="true">
      <legend :style="{ width: focusState || rutNumber.length > 0 ? '20px' : '0px' }">
        <span><br /></span>
      </legend>
    </fieldset>
    <div class="v-text-field__slot">
      <label
        for="input-249"
        class="v-label theme--light"
        :class="labelClass"
        style="left: 0px; right: auto; position: absolute;"
        >Rut</label
      >
      <input
        type="text"
        id="input-249"
        outline-1
        @focus="focus"
        @input="input"
        @blur="blur"
        :value="rutFormated"
      />
    </div>
  </v-input>
</template>
<script>
import validations from '@/helpers/fieldsValidation'

export default {
  data() {
    return {
      focusState: false,
      rutNumber: '',
      rut: '',
      error: false,
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation]
    }
  },
  computed: {
    labelClass() {
      let classes = []
      if (this.error) {
        classes.push('error--text')
        console.log(this.rut)
      }
      if (this.focusState && !this.error) {
        classes.push('blue--text')
      }
      if (this.focusState || this.rutNumber.length > 0) {
        classes.push('v-label--active')
      }
      const result = classes.length > 0 ? classes.join(' ') : ''
      return result
    },
    containerClass() {
      let classes = []
      if (this.focusState) {
        classes.push('v-input--is-focused')
      }
      if (!this.error && this.focusState) {
        classes.push('blue--text')
      }
      return classes
    },
    rutFormated() {
      const rut = this.rutNumber
      let key = ''
      let body = ''
      if (rut.length > 0) {
        key = '-' + rut.substr(rut.length - 1, 1)
      }
      if (rut.length > 1) {
        body = rut.substr(0, rut.length - 1)
        const rutElements = body.split('')
        const points = Math.ceil(rutElements.length / 3) - 1
        console.log(points, 'points')
        let formatedBody = rutElements
        console.log(rutElements, 'rutElements')
        for (let i = 1; i <= points; i++) {
          formatedBody.splice(-3 * i - i + 1, 0, '.')
        }
        body = rutElements.join('')
        console.log(body.length, 'body')
      }
      const result = body + key
      return result
    }
  },
  methods: {
    errorEvent(error) {
      console.log(error)
    },
    focus() {
      this.focusState = true
    },
    input(event) {
      const { value } = event.target
      const withoutFormat = value.replace(/-/g, '').replace(/\./g, '')
      this.rutNumber = withoutFormat
      const rut = withoutFormat.split('')
      rut.splice(-1, 0, '-')
      this.rut = rut.join('')
      if (!withoutFormat) {
        this.error = true
      } else if (validations.rutValidation(this.rut).length) {
        this.error = true
      } else {
        this.error = false
      }
      this.$forceUpdate()
    },
    blur(event) {
      const value = event.target.value
      this.focusState = false
      if (!value) {
        this.error = true
      } else if (typeof validations.rutValidation(this.rut) === 'string') {
        this.error = true
      } else {
        this.error = false
      }
    }
  }
}
</script>
