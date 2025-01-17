import { type Event } from "./schedule";
import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', () => {
  const error = ref(null as Event | null)
  const setError = (event: Event) => {
    error.value = event
  }
  const clearError = () => {
    error.value = null
  }
  
  return {error, setError, clearError}
})
