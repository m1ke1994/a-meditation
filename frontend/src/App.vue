<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppHero from './components/AppHero.vue'
import AboutMeApp from './components/AboutMeApp.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import SimpleWordsSection from './components/SimpleWordsSection.vue'
import AppPrices from './components/AppPrices.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-950">
    <AppHeader />
    <main class="flex-1">
      <AppHero />
      <SimpleWordsSection />
      <AboutMeApp />
      <ReviewsSection />
      <AppPrices />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
