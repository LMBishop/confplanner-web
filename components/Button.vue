<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { defineProps } from 'vue';

defineProps({
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
    type: String as PropType<"button" | "submit" | "reset">,
    default: "",
  },
  kind: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary",
  },
});
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="kind">
    <Loader2Icon v-if="loading" class="icon-loader" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped>
button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: var(--text-small);
  font-family: var(--font-family);
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-primary-dark);
}

button:focus {
  outline: none;
  border-color: var(--color-accent);
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
  
button.primary {
  background-color: var(--color-primary);
}
  
button.secondary {
  background-color: var(--color-background);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}
  
button.secondary:hover {
  background-color: var(--color-background-muted);
  border: 1px solid var(--color-primary-dark);
  color: var(--color-primary-dark);
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
