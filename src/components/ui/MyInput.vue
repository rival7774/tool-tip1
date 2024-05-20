<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  id: String,
  labelValue: String,
  classInput: String,
  classLabel: String,
  name: String,
  showLabel: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) => ['text', 'textarea', 'password', 'email', 'tel', 'search', 'number'].includes(val)
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:modelValue']);
const value = ref(props.modelValue);

watch(value, (newValue) => {
  emits('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  value.value = newValue;
});

const onInputPrice = (e) => {
  if (props.type === 'number') {
    value.value = e.target.value.replace(/\D/g, '');
  }
};
</script>

<template>
  <div>
    <label
        :for="id"
        :class="[{'visually-hidden': !showLabel}, classLabel]">{{ labelValue }}
    </label>
    <input
        v-if="type !== 'textarea'"
        :type="type === 'number' ? 'text' : type"
        :placeholder="placeholder"
        v-model="value"
        :id="id"
        :class="[{'input-full-width': !showLabel}, classInput]"
        :required="required"
        :name="name"
        :data-label-value="labelValue"
        @input="onInputPrice"
    />

    <textarea
        v-else
        v-model="value"
        :id="id"
        :required="required"
        :name="name"
        :data-label-value="labelValue"
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

textarea,
input {
  color: black;
  border-radius: var(--border-radius);
  padding: 5px 15px;
  min-width: 100px;
  max-width: 45%;
  width: 100%;
}

textarea {
  min-width: 45%;
}

.input-full-width {
  max-width: 100%;
}

label {
  color: var(--color-info-title);
  max-width: 200px;
  width: 100%;
}

@media all and (max-width: 540px) {
  input {
    max-width: 234px;
  }
}
</style>
