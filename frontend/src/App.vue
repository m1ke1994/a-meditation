<script setup>
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
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#F8F3EA] text-[#24231F]">
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
