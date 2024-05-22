

<script lang="ts" setup>
    import type inteface from "./interface";
    import "./button.scss";
    import Icon from "#shared/icons/icon.vue";
    
    const props = defineProps<inteface>()


    var buttonColor ="button_color_primary";
    if(props.buttonColor) buttonColor = "button_color_" + props.buttonColor;

    var buttonType ="button_type_filled";
    if(props.buttonType) buttonType = "button_type_" + props.buttonType;

    var buttonSize ="button_size_sm";
    if(props.buttonSize) buttonSize = "button_size_" + props.buttonSize;



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