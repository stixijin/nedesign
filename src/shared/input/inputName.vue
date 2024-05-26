<script lang="ts" setup>
    import { ref, reactive } from "vue";
    import "./input.scss"
    import type Interface from "./interface";

    const props = withDefaults(defineProps<Interface>(), {
    })


    const emits = defineEmits([
        'updateValue',
    ]);

    const inputValue = ref(props.modelValue);


    const updateValue = () => {
        emits('updateValue', inputValue.value);
    }

</script>

<script>
</script>
<template>

    <label :for="name" class="input__label">{{ label }}</label>
    <input :name="name" :placeholder="placeholder" v-model="inputValue" @input="updateValue" class="input" type="text">

    

</template>
