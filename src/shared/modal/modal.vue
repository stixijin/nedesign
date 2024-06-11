<script lang="ts" setup>
import "./modal.scss";
import { ref, watch, onMounted, onUnmounted, computed, useSlots  } from 'vue';
import FeatherIcon from 'vue-feather';


type closeSide = "left" | "right" | "top" | "bottom" | "custom";
type closePosition = "start" | "end" | "custom";
type PositionX = "left" | "right" | "center" | "custom";
type PositionY = "top" | "bottom" | "center" | "custom";
type Dimension = "full" | "half" | "fit" | "custom";
type Transition = string;

// Определяем интерфейс для свойств компонента
interface ModalProps {
    name?: string;
    modelValue?: boolean;
    desctop?: boolean;
    mobile?: boolean;

    mobileBodyPadding?: boolean,
    mobileCloseSide?: closeSide;
    mobileClosePosition?: closePosition;
    mobilePositionX?: PositionX;
    mobilePositionY?: PositionY;
    mobileHeight?: Dimension;
    mobileWidth?: Dimension;
    mobileTransition?: Transition;

    desctopBodyPadding?: boolean,
    desctopCloseSide?: closeSide;
    desctopClosePosition?: closePosition;
    desctopPositionX?: PositionX;
    desctopPositionY?: PositionY;
    desctopHeight?: Dimension;
    desctopWidth?: Dimension;
    desctopTransition?: Transition;
}


type Props = ModalProps;


const props = withDefaults(defineProps<Props>(), {
    name: 'default',
    modelValue: false,
    desctop: true,
    mobile: true,

    mobileBodyPadding: false,
    mobileCloseSide: 'top',
    mobileClosePosition: 'end',
    mobilePositionX: 'center',
    mobilePositionY: 'bottom',
    mobileHeight: 'fit',
    mobileWidth: 'full',
    mobileTransition: 'fade',

    desctopBodyPadding: false,
    desctopCloseSide: 'left',
    desctopClosePosition: 'start',
    desctopPositionX: 'center',
    desctopPositionY: 'center',
    desctopHeight: 'fit',
    desctopWidth: 'fit',
    desctopTransition: 'fade',
});

const currentName = props.name + '__modal';

let currentMobileHeight = '';
let currentMobileWidth = '';
let currentMobileCloseSide = '';
let currentMobileClosePosition = '';
let currentMobilePositionX = ''
let currentMobilePositionY = ''
let currentDesctopBodyPadding = ''
let currentMobileBodyPadding = ''

if(!props.desctopBodyPadding) {
    currentMobileBodyPadding="modal_d_bodyPadding_false";
}

if(!props.mobileBodyPadding) {
    currentMobileBodyPadding="modal_m_bodyPadding_false";
}

if (props.mobile) {
    currentMobileHeight = "modal_m_height_" + props.mobileHeight;
    currentMobileWidth = "modal_m_width_" + props.mobileWidth;
    currentMobileCloseSide = "modal_m_close_side_" + props.mobileCloseSide;
    currentMobileClosePosition = "modal_m_close_pos_" + props.mobileClosePosition;
    currentMobilePositionX = "modal_m_posX_" + props.mobilePositionX;
    currentMobilePositionY = "modal_m_posY_" + props.mobilePositionY;
}


let currentDesctopHeight = ''
let currentDesctopWidth = ''
let currentDesctopCloseSide = ''
let currentDesctopClosePosition = ''
let currentDesctopPositionX = ''
let currentDesctopPositionY = ''

if (props.desctop) {
    currentDesctopHeight = "modal_d_height_" + props.desctopHeight;
    currentDesctopWidth = "modal_d_width_" + props.desctopWidth;
    currentDesctopCloseSide = "modal_d_close_side_" + props.desctopCloseSide;
    currentDesctopClosePosition = "modal_d_close_pos_" + props.desctopClosePosition;
    currentDesctopPositionX = "modal_d_posX_" + props.desctopPositionX;
    currentDesctopPositionY = "modal_d_posY_" + props.desctopPositionY;
}





const currentTransition = ref<string>();

const updateTransition = () => {
    if (window.innerWidth <= 768) {
        currentTransition.value = props.mobileTransition;
    } else {
        currentTransition.value = props.desctopTransition;
    }
};

onMounted(() => {
    updateTransition();
    window.addEventListener('resize', updateTransition);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateTransition);
});

let overlayState = ref<boolean>(props.modelValue);
let modalState = ref<boolean>(false);

const openModal = () => {
    overlayState.value = true;
    document.body.classList.add('scroll_fixed');
    setTimeout(() => {
        modalState.value = true;
    }, 300); // Задержка, чтобы модальное окно появилось после оверлея
}

const closeModal = () => {
    modalState.value = false;
    setTimeout(() => {
        overlayState.value = false;
        document.body.classList.remove('scroll_fixed');
        touchStartY.value = 0;
        touchCurrentY.value = 0;
        touchEndY.value = 0;
        activeModalName.value = null;
    }, 10); // Задержка, чтобы модальное окно скрылось перед оверлеем
}

const emits = defineEmits([
    'updateState',
]);

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        openModal();
    } else {
        closeModal();
    }
});


const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
const hasBody = computed(() => !!slots.body)
const hasFooter = computed(() => !!slots.footer)



const activeModalName = ref<string | null>(null);
const touchStartY = ref<number>(0);
const touchCurrentY = ref<number>(0);
const touchEndY = ref<number>(0);
const MIN_SWIPE_DISTANCE = 160;
const SWIPE_SENSITIVITY = 0.5; // Коэффициент для уменьшения скорости перемещения
const isTouching = ref<boolean>(false);
const isSwiping = ref<boolean>(false);

const onTouchStart = (e: TouchEvent) => {
  if ((e.target as HTMLElement).closest('.modal')?.classList.contains(currentName)) {
    touchStartY.value = e.touches[0].clientY;
    touchCurrentY.value = touchStartY.value;
    activeModalName.value = props.name;
    isTouching.value = true; // Устанавливаем флаг, что началось касание
    isSwiping.value = true; // Устанавливаем флаг для отслеживания свайпа
  }
};

const onTouchMove = (e: TouchEvent) => {
  if (isSwiping.value) {
    touchCurrentY.value = e.touches[0].clientY;
  }
};

const onTouchEnd = (e: TouchEvent) => {
  if (activeModalName.value === props.name) {
    touchEndY.value = e.changedTouches[0].clientY;
    const swipeDistance = touchEndY.value - touchStartY.value;
    isSwiping.value = false; // Завершаем свайп

    if (swipeDistance > MIN_SWIPE_DISTANCE) {
      // Добавляем класс для плавного ухода вниз
      isTouching.value = false; // Устанавливаем флаг для начала анимации закрытия
      const modalElement = document.querySelector(`.${currentName}`);
      if (modalElement) {
        modalElement.classList.add('release-animation');
        setTimeout(() => {
          closeModal();
          setTimeout(() => {
            modalElement.classList.remove('release-animation');
            activeModalName.value = null; // Сбрасываем активное модальное окно после окончания анимации
          }, 300); // Убираем класс после завершения анимации
        }, 300); // Задержка перед началом сброса состояния
      }
    } else {
      touchCurrentY.value = touchStartY.value; // Возвращаем в исходное положение, если свайп недостаточный
      isTouching.value = false; // Сбрасываем флаг после окончания касания
    }
  }
};
</script>

<template>
    <div @keyup.esc="closeModal" @click="openModal">
        <slot name="action"></slot>
    </div>
    <transition name="fade">
        <div v-if="overlayState" @click="closeModal" class="overlay">
            <transition :name="currentTransition">
                <div v-if="modalState" @click.stop class="modal" :class="[currentName,
                    currentDesctopBodyPadding,
                    currentMobileBodyPadding,
                    currentMobileWidth,
                    currentMobileHeight,
                    currentMobileCloseSide,
                    currentMobileClosePosition,
                    currentMobilePositionX,
                    currentMobilePositionY,
                    currentDesctopWidth,
                    currentDesctopHeight,
                    currentDesctopClosePosition,
                    currentDesctopCloseSide,
                    currentDesctopPositionX,
                    currentDesctopPositionY]"
                    
                     @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
                     :style="isTouching ? { transform: `translateY(${Math.max((touchCurrentY - touchStartY) * SWIPE_SENSITIVITY, 0)}px)` } : null"
                    >
                    <div class="modal__nav">
                        <button @click="closeModal" class="modal__btnClose">
                            <feather-icon type="x" />
                        </button>
                    </div>
                    <div class="modal__window">
                        <div v-if="hasHeader" class="modal__header">
                            <slot name="header"></slot>
                        </div>
                        <div v-if="hasBody" class="modal__body">
                            <slot name="body">

                            </slot>
                        </div>
                        <div v-if="hasFooter" class="modal__footer">
                            <slot name="footer"></slot>
                        </div>

                    </div>
                    <slot name="alerts"></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>
