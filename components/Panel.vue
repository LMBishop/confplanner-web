<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { defineProps, type PropType } from 'vue';

defineProps({
  kind: {
    type: String as PropType<"normal" | "error" | "success">,
    required: false,
    default: 'normal',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  breadcrumbs: {
    type: Array as PropType<Array<{ text: string, to: string }>>,
    required: false,
    default: () => [],
  },
});
</script>
<template>
  <div class="card" :class="kind">
    <div v-if="title" class="card-title-container">
      <span v-for="(breadcrumb, index) in breadcrumbs" class="breadcrumb" :key="index">
        <NuxtLink :to="breadcrumb.to">{{ breadcrumb.text }}</NuxtLink>
        <ArrowRight />
      </span>
      <span class="card-title"> {{ title }} </span>
    </div>
    <slot />
  </div>
</template>

<style>
.card {
  padding: 1rem; 
  border-radius: 0.5rem; 
}

.card-title-container {
  line-height: 1;
  background-color: var(--color-background-muted);
  padding: 1rem 1rem;
  margin: -1rem -1rem 1rem -1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.breadcrumb {
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb > svg {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--color-text-muted);
}

.breadcrumb > a {
  color: var(--color-text-muted);
}

.breadcrumb > a:hover {
  color: var(--color-primary);
}

.normal {
  background-color: white;
  border: 0.1rem solid var(--color-border);
}

.error {
  background-color: var(--color-error-light);
  border: 0.1rem solid var(--color-border-error-light);
}

.success {
  background-color: var(--color-success-light);
  border: 0.1rem solid var(--color-border-success-light);
}
</style>