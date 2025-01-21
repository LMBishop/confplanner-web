<script setup lang="ts">
import { defineProps, type PropType } from 'vue';

defineProps({
  kind: {
    type: String as PropType<"normal" | "error" | "success">,
    required: false,
    default: 'normal',
  },
});
</script>
<template>
  <div class="card" :class="kind">
    <slot />
  </div>
</template>

<style>
.card {
  padding: 1rem; 
  border-radius: 0.5rem; 
}

.normal {
  background-color: white;
  border: 0.1rem solid var(--color-border);
}

.error {
  background-color: var(--color-error);
  border: 0.1rem solid var(--color-border-error);
}

.success {
  background-color: var(--color-success);
  border: 0.1rem solid var(--color-border-success);
}
</style>