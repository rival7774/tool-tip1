<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';

const {
  modelValue,
  showLabel
} = defineProps({
  modelValue: String,
  placeholder: String,
  id: String,
  labelValue: String,
  classInput: String,
  classLabel: String,
  showLabel: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) => [
      'text',
      'textarea',
      'password',
      'email',
      'tel',
      'search'
    ].includes(val)
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue']);

const value = ref(modelValue);
watch(value, () => {
  emits('update:modelValue', value.value);
});
</script>

<template>
  <div>
    <label :for="id" :class="[{'visually-hidden': !showLabel}, classLabel]">{{ labelValue }}</label>
    <input v-if="type !== 'textarea'"
           :type="type"
           :placeholder="placeholder"
           v-model="value"
           :id="id"
           :class="[{'input-full-width': !showLabel}, classInput]"
           :required="required"
    >

    <textarea rows="3"
              v-else
              v-model="value"
              :id="id"
              :class="getWidthInput"
              :required="required"
    >
    </textarea>
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

input {
  color: black;
  border-radius: var(--border-radius);
  padding: 5px 15px;
  min-width: 100px;
  max-width: 45%;
  width: 100%;
}

.input-full-width {
  max-width: 100%;
}

label {
  color: var(--color-info-title);
  max-width: 186px;
  width: 100%;
}

@media all and (max-width: 540px) {
  input {
    max-width: 234px;
  }
}
</style>
