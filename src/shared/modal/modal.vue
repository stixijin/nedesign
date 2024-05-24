<script lang="ts" setup>
    import "./modal.scss";
    import { ref } from 'vue';
    import Icon from "#tokens/icons/icon.vue";

    const props = defineProps({
        name: String,
        closePos: String
    })


    const nameModal = "modal__" + props.name;
    const closePos = "modal_close_" + props.closePos;


</script>


<script lang="ts">

    export default {
        data() {
            return {
                modalState: false,
                color: 'red'
            }
        },
        methods: {
            openModal(){
                this.modalState = true;
                document.body.classList.add('scroll_fixed');

            },
            closeModal(){
                this.modalState = false;
                document.body.classList.remove('scroll_fixed')
            },
        }
    };

</script>

<template>
    <div
        @keyup.esc="closeModal" 
        @click="openModal" 
    >
    <slot name="action"></slot>
    
    </div>

<transition name="fade">
    <div v-if="modalState" class="modalContainer">
        <div @click="closeModal" class="overlay"></div>
        <div :class="nameModal, closePos" class="modal">
            <div class="modal__nav">
                <button  @click="closeModal" class="modal__btnClose"><Icon name="feather/x"></Icon></Button>
            </div>
            <div class="modal__window" >
                <slot name="body"></slot>
            </div>
        </div>
        
    </div>

</transition>

</template>


<style :global lang="scss">
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }

</style>