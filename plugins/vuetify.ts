import { createVuetify } from 'vuetify'
import * as component from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components: {
      ...component,
      VDataTable,
    },
    theme: {
      defaultTheme: 'light'
    }
  })

  nuxtApp.vueApp.use(vuetify)
})