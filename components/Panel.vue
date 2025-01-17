<template>
  <div class="card">
    <slot />
  </div>
</template>

<style>
.card {
  background-color: white;
  padding: 1rem; 
  border-radius: 0.5rem; 
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06); */
  border: 0.1rem solid var(--color-border);
}
</style>