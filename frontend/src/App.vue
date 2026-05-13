<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppHero from './components/AppHero.vue'
import AboutMeApp from './components/AboutMeApp.vue'
import MeditationsSection from './components/MeditationsSection.vue'
import GallerySection from './components/GallerySection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import SimpleWordsSection from './components/SimpleWordsSection.vue'
import AppPrices from './components/AppPrices.vue'
import ContactSection from './components/ContactSection.vue'
import { useSiteContentStore } from './admin/stores/siteContent'

const route = useRoute()
const contentStore = useSiteContentStore()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

onMounted(() => {
  contentStore.load()
})
</script>

<template>
  <RouterView v-if="isAdminRoute" />

  <div
    v-else
    class="flex min-h-screen flex-col bg-[#F8F3EA] text-[#24231F]"
  >
    <AppHeader />
    <main class="flex-1">
      <AppHero />
      <SimpleWordsSection />
      <AboutMeApp />
      <MeditationsSection />
      <GallerySection />
      <ReviewsSection />
      <AppPrices />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
