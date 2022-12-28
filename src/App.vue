<script setup>
import { RouterView } from 'vue-router'
import NavContent from './components/NavContent.vue'
import FooterContent from './components/FooterContent.vue'

</script>

<template>
  <header>
    <NavContent /> 
  </header>

  <div class="continaer">
    <RouterView />
  </div>

  <footer>
    <FooterContent />
  </footer>
</template>

<script>

export default {
  methods:{
    
  },
}
</script>
