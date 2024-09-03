import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNameStore = defineStore('name', () => {
  const name = ref('')

  return { name }
})
