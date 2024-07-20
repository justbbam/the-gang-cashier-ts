<template>
  <header>
    <img src="../assets/images/logo.png" alt="Logo" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
  header{
    margin: 2rem 1rem;
  }

    /* Extra small devices (phones, 600px and down) */
  @media all and (max-width: 767.9px) {
    header{
      margin: 1rem 0.25rem;
    }
  }

  @media all and (min-width: 768px) and (max-width: 992px) {
    header{
      margin: 1rem 1rem;
    }
  }
</style>
