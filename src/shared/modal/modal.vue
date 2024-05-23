





<script lang="ts" setup>
import "./modal.scss";
import { ref } from 'vue';
import Button from "#shared/button/button.vue";

import type interfaceButton from '../button/interface'

interface interfaceModal extends interfaceButton {

}

const props = withDefaults(defineProps<interfaceModal>(), {
    buttonColor: 'primary',
    ButtonType: 'filled',
    buttonSize: 'sm',
    buttonIcon: undefined,
    buttonIconSide: undefined,
    buttonText: undefined
})




const openWindow = ref(false);



</script>


<script lang="ts">

    export default {
        data() {
            return {
                modalState: false
            }
        },
        methods: {
            openModal(){
                this.modalState = true
            },
            closeModal(){
                this.modalState = false;
            },
        },
    };

</script>

<template>


<Button
    @keyup.esc="closeModal" 
    @click="openModal" 
    :buttonSize="resultButtonSize" 
    :buttonColor="resultButtonColor"
    :buttonType="resultButtonType"
    :buttonIcon="resultButtonIcon"
    :buttonIconSide="resultButtonIconSide"
    :buttonText="resultButtonText"
></Button>

<transition name="fade">
<div @click="closeModal" v-if="modalState" class="overlay">
    <div class="modal">
        <div class="modal__nav">
            <Button  @click="closeModal" buttonSize="xl"  buttonType="border" buttonColor="black" buttonIconSide="left" buttonIcon="feather/x"></Button>
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