

<script lang="ts" setup>
    import type buttonInterface from "./interface";
    import "./button.scss";
    import Icon from "#tokens/icons/icon.vue";
    
    const props = withDefaults(defineProps<buttonInterface>(), {
        buttonColor: 'primary',
        buttonType: 'filled',
        buttonSize: 'sm',
        buttonIcon: undefined,
        buttonIconSide: "left",
        buttonText: undefined
})

    const buttonColor = "button_color_" + props.buttonColor;

    const buttonType = "button_type_" + props.buttonType;

    const buttonSize = "button_size_" + props.buttonSize;



</script>


<template>
    <button class="button" :class="[buttonColor, buttonType, buttonSize]">
        <div v-if="props.buttonIconSide === undefined || props.buttonIconSide === 'left' || props.buttonIconSide === 'left-right'" class="button__icon">
            <Icon :name="props.buttonIcon"></Icon>
        </div>
        <div v-if="props.buttonText" class="button__text">
            {{ props.buttonText }}
            <span v-if="props.buttonText === undefined && props.buttonIcon === undefined">Ошибка: вставьте text или icon</span>
        </div> 
        <div v-if="props.buttonIconSide === 'right' || props.buttonIconSide === 'left-right'" class="button__icon">
            <Icon :name="props.buttonIcon"></Icon>
        </div>
    </button>
</template>