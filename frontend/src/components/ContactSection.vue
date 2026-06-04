<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { submitLead } from '../composables/useLeadApi'

const props = defineProps({
  section: {
    type: Object,
    default: null,
  },
})

const form = ref({
  name: '',
  phone: '',
  telegram: '',
  message: '',
  agree: true,
})
const isSending = ref(false)
const submitSuccess = ref('')
const submitError = ref('')

const defaultLocations = [
  {
    title: 'Парк Горького',
    address: 'Москва, ул. Крымский Вал, 9',
    lat: 55.7298,
    lng: 37.6011,
  },
  {
    title: 'Патриаршие пруды',
    address: 'Москва, Патриаршие пруды',
    lat: 55.7636,
    lng: 37.5906,
  },
  {
    title: 'ВДНХ',
    address: 'Москва, проспект Мира, 119',
    lat: 55.8298,
    lng: 37.6328,
  },
  {
    title: 'Третьяковская галерея',
    address: 'Москва, Лаврушинский пер., 10',
    lat: 55.7414,
    lng: 37.6208,
  },
]

const sectionContent = computed(() => props.section?.content || {})
const sectionTag = computed(() => sectionContent.value.subtitle || 'Свяжитесь для записи')
const sectionTitle = computed(() => sectionContent.value.title || 'Контакты и запись на практику')
const sectionDescription = computed(
  () => sectionContent.value.description || 'Оставьте заявку, и мы подберем удобный формат практики под ваш запрос.',
)
const sectionAddress = computed(() => sectionContent.value.address || 'Москва, ул. Ботаническая, 33В стр 1')
const sectionPhone = computed(() => sectionContent.value.phone || '+7 903 198-91-88')
const sectionTelegram = computed(() => sectionContent.value.telegram || '@leelabirdcase')
const locations = computed(() => {
  const apiLocations = sectionContent.value.locations
  if (!Array.isArray(apiLocations) || apiLocations.length === 0) {
    return defaultLocations
  }
  return apiLocations
    .filter((location) => location && typeof location.lat === 'number' && typeof location.lng === 'number')
    .map((location) => ({
      title: location.title || 'Локация',
      address: location.address || '',
      lat: location.lat,
      lng: location.lng,
    }))
})

const mapRef = ref(null)
const mapStatus = ref('loading')

let yandexMap

const loadYandexMaps = () => new Promise((resolve, reject) => {
  if (window.ymaps) {
    window.ymaps.ready(() => resolve(window.ymaps))
    return
  }

  const existingScript = document.getElementById('yandex-maps-api')

  if (existingScript) {
    existingScript.addEventListener('load', () => window.ymaps.ready(() => resolve(window.ymaps)), { once: true })
    existingScript.addEventListener('error', reject, { once: true })
    return
  }

  const script = document.createElement('script')
  script.id = 'yandex-maps-api'
  script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
  script.async = true
  script.onload = () => window.ymaps.ready(() => resolve(window.ymaps))
  script.onerror = reject
  document.head.appendChild(script)
})

const initMap = async () => {
  if (!mapRef.value) return

  try {
    const ymaps = await loadYandexMaps()

    yandexMap = new ymaps.Map(mapRef.value, {
      center: [55.76, 37.61],
      zoom: 11,
      controls: ['zoomControl'],
    })

    const coordinates = locations.value.map((location) => [location.lat, location.lng])

    locations.value.forEach((location) => {
      const placemark = new ymaps.Placemark(
        [location.lat, location.lng],
        {
          balloonContentHeader: location.title,
          balloonContentBody: location.address,
          hintContent: location.title,
        },
        {
          preset: 'islands#darkGreenDotIconWithCaption',
          iconCaption: location.title,
        },
      )

      yandexMap.geoObjects.add(placemark)
    })

    yandexMap.setBounds(
      ymaps.util.bounds.fromPoints(coordinates),
      {
        checkZoomRange: true,
        zoomMargin: [42, 42, 42, 42],
      },
    )

    mapStatus.value = 'ready'
  } catch (error) {
    console.warn('Не удалось загрузить Яндекс.Карты', error)
    mapStatus.value = 'error'
  }
}

function resetForm() {
  form.value = {
    name: '',
    phone: '',
    telegram: '',
    message: '',
    agree: true,
  }
}

async function submitForm() {
  if (isSending.value) return
  submitSuccess.value = ''
  submitError.value = ''

  if (!form.value.name.trim() || !form.value.phone.trim()) {
    submitError.value = 'Заполните обязательные поля'
    return
  }

  isSending.value = true
  try {
    await submitLead({
      section_key: 'contacts',
      form_name: 'Форма записи',
      name: form.value.name.trim(),
      phone: form.value.phone.trim(),
      message: form.value.message.trim(),
      payload: {
        telegram: form.value.telegram.trim(),
      },
    })
    submitSuccess.value = 'Заявка отправлена'
    resetForm()
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Не удалось отправить заявку'
  } finally {
    isSending.value = false
  }
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  yandexMap?.destroy()
})
</script>

<template>
  <section
    id="contacts"
    class="scroll-mt-24 bg-[#F8F3EA] px-6 py-16 text-[#24231F] md:px-8 md:py-20"
  >
    <div class="mx-auto max-w-[1200px]">
      <!-- Header -->
      <div class="mx-auto max-w-[760px] text-center">
        <p class="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-black/40">
          {{ sectionTag }}
        </p>

        <h2 class="text-3xl font-semibold leading-tight tracking-[0.02em] text-[#24231F] sm:text-4xl md:text-5xl">
          {{ sectionTitle }}
        </h2>

        <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
          {{ sectionDescription }}
        </p>
      </div>

      <!-- Layout -->
      <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        
        <!-- FORM -->
        <div class="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.06)] md:p-8">
          <h3 class="text-2xl font-semibold text-[#24231F]">
            Форма обратной связи
          </h3>

          <p class="mt-3 text-sm leading-6 text-stone-500">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </p>

          <form class="mt-7 space-y-4" @submit.prevent="submitForm">
            <input
              v-model="form.name"
              type="text"
              placeholder="ФИО"
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449]/60"
            >

            <input
              v-model="form.phone"
              type="tel"
              placeholder="Телефон *"
              required
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449]/60"
            >

            <input
              v-model="form.telegram"
              type="text"
              placeholder="Telegram"
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449]/60"
            >

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Дата, количество участников, пожелания"
              class="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449]/60"
            />

            <label class="flex gap-3 text-xs leading-5 text-stone-500">
              <input
                v-model="form.agree"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 rounded border-black/20 accent-[#8B7449]"
              >
              <span>
                Нажимая кнопку «Отправить», я соглашаюсь на обработку персональных данных.
              </span>
            </label>

            <button
              type="submit"
              :disabled="isSending"
              class="w-full rounded-full border border-black/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#24231F] transition duration-300 hover:-translate-y-1 hover:bg-[#24231F] hover:text-white hover:shadow-lg"
            >
              {{ isSending ? 'Отправляем...' : 'Отправить' }}
            </button>
            <p v-if="submitSuccess" class="text-sm text-emerald-700">{{ submitSuccess }}</p>
            <p v-if="submitError" class="text-sm text-rose-700">{{ submitError }}</p>
          </form>
        </div>

        <!-- MAP + CONTACT -->
        <div class="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.06)]">
          <div class="p-6 md:p-8">
            <h3 class="text-2xl font-semibold text-[#24231F]">
              Где проходит практика
            </h3>

            <div class="mt-5 space-y-3 text-stone-600">
              <p>
                <span class="text-black/40">Адрес:</span><br>
                {{ sectionAddress }}
              </p>

              <p>
                <span class="text-black/40">Телефон / Telegram:</span><br>
                {{ sectionPhone }} В· {{ sectionTelegram }}
              </p>

              <p>
                <span class="text-black/40">Формат:</span><br>
                индивидуально, парами или в группе
              </p>
            </div>

            <div class="mt-6 grid gap-2 sm:grid-cols-2">
              <div
                v-for="location in locations"
                :key="location.title"
                class="rounded-2xl border border-black/10 bg-[#FBF7EF] px-4 py-3"
              >
                <p class="text-sm font-semibold text-[#24231F]">
                  {{ location.title }}
                </p>
                <p class="mt-1 text-xs leading-5 text-stone-500">
                  {{ location.address }}
                </p>
              </div>
            </div>
          </div>

          <div class="relative h-[360px] w-full overflow-hidden bg-[#FBF7EF]">
            <div
              ref="mapRef"
              class="h-full w-full"
              aria-label="Карта с местами проведения"
            />

            <div
              v-if="mapStatus !== 'ready'"
              class="absolute inset-0 flex items-center justify-center bg-[#FBF7EF] px-6 text-center text-sm text-stone-500"
            >
              <span v-if="mapStatus === 'loading'">
                Загрузка карты...
              </span>
              <span v-else>
                Не удалось загрузить карту. Адреса указаны выше.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

