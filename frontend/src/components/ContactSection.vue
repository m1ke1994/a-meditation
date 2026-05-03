<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  telegram: '',
  message: '',
  agree: true,
})

function submitForm() {
  console.log('Contact form:', form.value)
}
</script>

<template>
  <section
    id="contacts"
    class="scroll-mt-24 bg-white px-6 py-16 text-[#242424] md:px-8 md:py-20"
  >
    <div class="mx-auto max-w-[1200px]">
      <!-- Header -->
      <div class="mx-auto max-w-[760px] text-center">
        <p class="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-black/40">
          Связаться с нами
        </p>

        <h2 class="text-3xl font-semibold leading-tight tracking-[0.02em] text-[#20201d] sm:text-4xl md:text-5xl">
          Контакты и запись на игру
        </h2>

        <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
          Оставьте заявку, и мы подберём удобный формат игры Лила для вашего запроса.
        </p>
      </div>

      <!-- Layout -->
      <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        
        <!-- FORM -->
        <div class="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.06)] md:p-8">
          <h3 class="text-2xl font-semibold text-[#20201d]">
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
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#1f1f1f] outline-none transition placeholder:text-stone-400 focus:border-black/30"
            >

            <input
              v-model="form.phone"
              type="tel"
              placeholder="Телефон *"
              required
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#1f1f1f] outline-none transition placeholder:text-stone-400 focus:border-black/30"
            >

            <input
              v-model="form.telegram"
              type="text"
              placeholder="Telegram"
              class="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#1f1f1f] outline-none transition placeholder:text-stone-400 focus:border-black/30"
            >

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Дата, количество игроков, пожелания"
              class="w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#1f1f1f] outline-none transition placeholder:text-stone-400 focus:border-black/30"
            />

            <label class="flex gap-3 text-xs leading-5 text-stone-500">
              <input
                v-model="form.agree"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 rounded border-black/20 accent-black"
              >
              <span>
                Нажимая кнопку «Отправить», я соглашаюсь на обработку персональных данных.
              </span>
            </label>

            <button
              type="submit"
              class="w-full rounded-full border border-black/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#20201d] transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg"
            >
              Отправить
            </button>
          </form>
        </div>

        <!-- MAP + CONTACT -->
        <div class="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.06)]">
          <div class="p-6 md:p-8">
            <h3 class="text-2xl font-semibold text-[#20201d]">
              Где проходит игра
            </h3>

            <div class="mt-5 space-y-3 text-stone-600">
              <p>
                <span class="text-black/40">Адрес:</span><br>
                Москва, ул. Боманическая, 33В стр 1
              </p>

              <p>
                <span class="text-black/40">Телефон / Telegram:</span><br>
                +7 903 198-91-88
              </p>

              <p>
                <span class="text-black/40">Формат:</span><br>
                индивидуально, парами или в группе
              </p>
            </div>
          </div>

          <div class="h-[360px] w-full">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=37.617700%2C55.755864&z=12"
              class="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>