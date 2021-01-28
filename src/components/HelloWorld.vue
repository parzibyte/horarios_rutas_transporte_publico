<template>
  <div>

    <v-tabs
        background-color="cyan"
        dark
        v-model="tab"
        align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab>
        Rutas
      </v-tab>
      <v-tab>
        Horarios
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Rutas></Rutas>
      </v-tab-item>
      <v-tab-item>
        <Horarios></Horarios>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Rutas from "@/components/Rutas";
import Horarios from "@/components/Horarios";

export default {
  name: 'HelloWorld',
  components: {Horarios, Rutas},
  data: () => ({
    tab: null,
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
