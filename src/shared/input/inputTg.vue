<script lang="ts" setup>
    import "./input.scss"
    import type Interface from "./interface";
    const props = withDefaults(defineProps<Interface>(), {

    })

</script>

<script>
</script>
<template>

    <label :for="name" class="input__label">{{ label }}</label>
    <input
        required
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue" 
        :name="name" 
        :placeholder="placeholder" 
        class="input" 
        type="text"
        pattern=".*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*"
    >

</template>
