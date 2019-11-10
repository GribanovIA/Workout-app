<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

export default {
  components: {
    MainLayout, EmptyLayout,
  },
  data() {
    return {

    };
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`;
    },
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss">
// Здесь импортируем глобальные стили для нашего проекта
// ~ - папка node modules
// @import 'assets/index.css';
</style>
