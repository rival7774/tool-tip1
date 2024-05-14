<script setup>
defineProps({
  name: String,
  labelValue: String,
  classLabel: String,
  id: {
    type: String,
    required: true
  },
  accept: String
});

const emit = defineEmits(['change']);

const onChange = async (e) => {
  const target = e.target;

  if (target.files.length) {
    const file = target.files[0];
    const src = URL.createObjectURL(file);
    emit('change', {
      file,
      src
    });
  }
};
</script>

<template>
  <div>
    <input
        @change="onChange"
        type="file"
        :name="name"
        :id="id"
        class="visually-hidden"
        :accept="accept">
    <label :class="classLabel" :for="id">
      {{ labelValue }}
    </label>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

label {
  cursor: pointer;
  color: var(--color-info-title);
  max-width: 200px;
  width: 100%;
}

img {
  max-width: 100%;
  display: block;
  object-fit: contain;
}
</style>
