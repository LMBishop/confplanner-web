<script setup>
import { Loader2Icon } from 'lucide-vue-next'
</script>

<template>
  <button :type="type" :disabled="disabled || loading">
    <Loader2Icon v-if="loading" class="icon-loader" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: var(--text-small);
  font-weight: 500;
  color: white;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-primary-dark);
}

button:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon-loader {
  animation: spin 1s linear infinite;
  margin-left: -0.25rem;
  margin-right: 0.75rem;
  height: 1.25rem;
  width: 1.25rem;
  color: white;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
