<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const refDialog = ref<HTMLDialogElement | null>(null);

const props = defineProps<{
  kind?: 'normal' | 'error';
  fitContents?: boolean;
}>();

const showModal = () => {
  refDialog.value?.showModal();
  visible.value = true;
};

const closeModal = () => {
  refDialog.value?.close();
};

const emit = defineEmits(['close']);

defineExpose({
  show: showModal,
  close: closeModal,
  visible,
});

const onClose = () => {
  visible.value = false;
  emit('close');
};

const onDivClick = (e: MouseEvent) => {
  e.stopPropagation()
};

const onDialogClick = (e: MouseEvent) => {
  if (e.target === refDialog.value) {
    refDialog.value?.close();
  }
};
</script>

<template>
  <dialog ref="refDialog" @click="onDialogClick" @close="onClose" :class="[props.kind, { fit: props.fitContents }]">
    <div @click="onDivClick">
      <form v-if="visible" method="dialog">
        <slot />
      </form>
    </div>
  </dialog>
</template>


<style scoped>
dialog {
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 1000px;
  margin: 0;
  top: 80px;
  max-height: calc(100vh - 160px);
  left: 50%;
  transform: translateX(-50%);
}

dialog.normal {
  border: 2px solid var(--color-border);
  background-color: var(--color-background);
}

dialog.error {
  border: 2px solid var(--color-border-error);
  background-color: var(--color-error);
}

dialog.fit {
  width: fit-content;
  max-width: 1000px;
}

dialog::backdrop {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.1);
}

div.actions {
  display: flex;
  margin-top: 12px;
  gap: 8px;
  justify-content: flex-end;
}
</style>