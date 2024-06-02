<script lang="ts" setup>
    import "./modal.scss";
    import { ref, watch} from 'vue';
    import Icon from "#tokens/icons/icon.vue";

    const props = defineProps({
        name: String,
        closePos: String,
        modelValue: Boolean
    })


    const nameModal = "modal__" + props.name;
    const closePos = "modal_close_" + props.closePos;

    let modalState = ref(props.modelValue);

    const openModal = () => {
        modalState.value = true;
        updateState();
        document.body.classList.add('scroll_fixed');
    }
    
    const closeModal = () => {
        modalState.value = false;
        updateState();
        document.body.classList.remove('scroll_fixed');
    }

    const emits = defineEmits([
      'updateState',
    ]);

    
    const updateState = () => {
      emits('updateState', modalState.value);
    }
    
    watch(() => props.modelValue, (newValue) => {
        modalState.value = newValue;
    });


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
                <p class="test">{{ props.modelValue }}</p>
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