<template>
  <v-app>
    <v-main>
      <Principal/>
    </v-main>
  </v-app>
</template>

<script>
import Principal from './components/Principal';

export default {
  name: 'App',

  components: {
    Principal,
  },

  data: () => ({
    //
  }),
};
</script>
