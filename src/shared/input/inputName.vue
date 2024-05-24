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
        pattern="/^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/"
    >

</template>
