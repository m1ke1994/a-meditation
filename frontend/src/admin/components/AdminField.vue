<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block min-w-0 max-w-full">
    <span class="mb-1.5 block text-sm font-medium text-[#24231F] dark:text-[#F3EEE5]">{{ label }}</span>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      class="box-border block min-h-[120px] w-full min-w-0 max-w-full resize-y overflow-hidden break-words rounded-2xl border border-[#8B7449]/20 bg-white px-4 py-3 text-sm text-[#24231F] outline-none transition placeholder:text-stone-400 focus:border-[#8B7449] focus:ring-4 focus:ring-[#8B7449]/10 dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:placeholder:text-stone-500 dark:focus:border-[#B89B67] dark:focus:ring-[#B89B67]/10"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      class="box-border block w-full min-w-0 max-w-full rounded-2xl border border-[#8B7449]/20 bg-white px-4 py-3 text-sm text-[#24231F] outline-none transition placeholder:text-stone-400 focus:border-[#8B7449] focus:ring-4 focus:ring-[#8B7449]/10 dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:placeholder:text-stone-500 dark:focus:border-[#B89B67] dark:focus:ring-[#B89B67]/10"
      @input="$emit('update:modelValue', type === 'number' ? Number($event.target.value) : $event.target.value)"
    >
  </label>
</template>
