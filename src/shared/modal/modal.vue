





<script lang="ts" setup>
import "./modal.scss";
import { ref } from 'vue';
import Button from "#shared/button/button.vue";

import type interfaceButton from '../button/interface'

interface interfaceModal extends interfaceButton {

}

const props = defineProps<interfaceModal>()

    var resultButtonColor = "primary"; // default button color
    if(props.buttonColor) resultButtonColor = props.buttonColor;

    var resultButtonType ="filled"; // default button type
    if(props.buttonType) resultButtonType = props.buttonType;

    var resultButtonSize = `sm`; // default button size
    if(props.buttonSize) resultButtonSize = props.buttonSize;

    var resultButtonIcon = undefined; // default button icon
    if(props.buttonIcon) resultButtonIcon = props.buttonIcon;

    var resultButtonIconSide = undefined; // default button side icon
    if(props.buttonIconSide) resultButtonIconSide = props.buttonIconSide;

    var resultButtonText = undefined; // default button text
    if(props.buttonText) resultButtonText = props.buttonText;


const openWindow = ref(false);



</script>

<template>


<Button
    @keyup.esc="openWindow = false" 
    @click="openWindow = !openWindow" 
    :buttonSize="resultButtonSize" 
    :buttonColor="resultButtonColor"
    :buttonType="resultButtonType"
    :buttonIcon="resultButtonIcon"
    :buttonIconSide="resultButtonIconSide"
    :buttonText="resultButtonText"
></Button>

<transition name="fade">
<div @click="openWindow = false " v-if="openWindow === true" class="overlay">
    <div class="modal">
        <div class="modal__nav">
            <Button  @click="openWindow = !openWindow" buttonSize="xl"  buttonType="border" buttonColor="black" buttonIconSide="left" buttonIcon="feather/x"></Button>
        </div>
        <div class="modal__window" >
            <slot></slot>
        </div>
    </div>
</div>
</transition>

</template>


<style>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>