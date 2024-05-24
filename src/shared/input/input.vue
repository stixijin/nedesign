<script lang="ts" setup>
    import "./input.scss"

     interface InputInterface {
        name: String,
        label: String,
        placeholder: String,
    }

    const props = withDefaults(defineProps<InputInterface>(), {
})



</script>

<template>

    <label :for="name" class="input__label">{{ label }}</label>
    <input :name="name" :placeholder="placeholder" class="input" type="text">

</template>
