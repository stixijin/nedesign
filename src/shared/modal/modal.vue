<script lang="ts" setup>
import "./modal.scss";
import { ref, watch, onMounted, onUnmounted, computed, useSlots, reactive } from 'vue';
import FeatherIcon from 'vue-feather';


enum CloseSide {
    Left = "left",
    Right = "right",
    Top = "top",
    Bottom = "bottom",
    Custom = "custom",
}

enum ClosePosition {
    Start = "start",
    End = "end",
    Custom = "custom",
}

enum PositionX {
    Left = "left",
    Right = "right",
    Center = "center",
    Custom = "custom",
}

enum PositionY {
    Top = "top",
    Bottom = "bottom",
    Center = "center",
    Custom = "custom",
}

enum Dimension {
    Full = "full",
    Half = "half",
    Fit = "fit",
    Custom = "custom",
}

enum Transition {
    Fade = "fade",
    DepRight = "depRight",
    DepBottom = "depBottom",
    Custom = "custom",
}

// Определяем интерфейс для свойств компонента
interface ModalProps {
    name?: string;
    modelValue?: boolean;
    desctop?: boolean;
    mobile?: boolean;

    mobileBodyPadding?: boolean,
    mobileCloseSide?: CloseSide;
    mobileClosePosition?: ClosePosition;
    mobilePositionX?: PositionX;
    mobilePositionY?: PositionY;
    mobileHeight?: Dimension;
    mobileWidth?: Dimension;
    mobileTransition?: Transition;

    desctopBodyPadding?: boolean,
    desctopCloseSide?: CloseSide;
    desctopClosePosition?: ClosePosition;
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
    mobileCloseSide: CloseSide.Top,
    mobileClosePosition: ClosePosition.End,
    mobilePositionX: PositionX.Center,
    mobilePositionY: PositionY.Bottom,
    mobileHeight: Dimension.Fit,
    mobileWidth: Dimension.Full,
    mobileTransition: Transition.DepBottom,

    desctopBodyPadding: true,
    desctopCloseSide: CloseSide.Left,
    desctopClosePosition: ClosePosition.Start,
    desctopPositionX: PositionX.Center,
    desctopPositionY: PositionY.Center,
    desctopHeight: Dimension.Fit,
    desctopWidth: Dimension.Fit,
    desctopTransition: Transition.Fade,
});

const currentName = props.name + '__modal';

const mobileClasses = computed(() => {
    return {
        modal_m_bodyPadding_false: !props.mobileBodyPadding,
        [`modal_m_height_${props.mobileHeight}`]: props.mobile,
        [`modal_m_width_${props.mobileWidth}`]: props.mobile,
        [`modal_m_close_side_${props.mobileCloseSide}`]: props.mobile,
        [`modal_m_close_pos_${props.mobileClosePosition}`]: props.mobile,
        [`modal_m_posX_${props.mobilePositionX}`]: props.mobile,
        [`modal_m_posY_${props.mobilePositionY}`]: props.mobile,
    };
});

const desktopClasses = computed(() => {
    return {
        modal_d_bodyPadding_false: !props.desctopBodyPadding,
        [`modal_d_height_${props.desctopHeight}`]: props.desctop,
        [`modal_d_width_${props.desctopWidth}`]: props.desctop,
        [`modal_d_close_side_${props.desctopCloseSide}`]: props.desctop,
        [`modal_d_close_pos_${props.desctopClosePosition}`]: props.desctop,
        [`modal_d_posX_${props.desctopPositionX}`]: props.desctop,
        [`modal_d_posY_${props.desctopPositionY}`]: props.desctop,
    };
});


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

const MIN_SWIPE_DISTANCE = 160;
const SWIPE_SENSITIVITY = 0.5; // Коэффициент для уменьшения скорости перемещения


interface ModalState {
    overlayVisible: boolean;
    modalVisible: boolean;
    touchStartY: number;
    touchCurrentY: number;
    touchEndY: number;
    touchStartX: number; // Новая переменная для X координаты
    touchCurrentX: number; // Новая переменная для X координаты
    touchEndX: number; // Новая переменная для X координаты
    activeModalName: string | null;
    isTouching: boolean;
    isSwiping: boolean;
}
const modalState = reactive<ModalState>({
    overlayVisible: props.modelValue,
    modalVisible: false,
    touchStartY: 0,
    touchCurrentY: 0,
    touchEndY: 0,
    touchStartX: 0, // Инициализация новой переменной
    touchCurrentX: 0, // Инициализация новой переменной
    touchEndX: 0, // Инициализация новой переменной
    activeModalName: null,
    isTouching: false,
    isSwiping: false,
});

const openModal = () => {
    modalState.overlayVisible = true;
    document.body.classList.add('scroll_fixed');
    setTimeout(() => {
        modalState.modalVisible = true;
    }, 300); // Задержка, чтобы модальное окно появилось после оверлея
};

const closeModal = () => {
    modalState.modalVisible = false;
    setTimeout(() => {
        modalState.overlayVisible = false;
        document.body.classList.remove('scroll_fixed');
        resetTouchState();
    }, 10); // Задержка, чтобы модальное окно скрылось перед оверлеем
};

const resetTouchState = () => {
    modalState.touchStartY = 0;
    modalState.touchCurrentY = 0;
    modalState.touchEndY = 0;
    modalState.activeModalName = null;
};

const handleSwipeEnd = (swipeDistanceY: number, swipeDistanceX: number) => {
    if (props.mobileTransition === Transition.DepBottom && swipeDistanceY > MIN_SWIPE_DISTANCE) {
        // Логика закрытия вниз
        modalState.isTouching = false; // Устанавливаем флаг для начала анимации закрытия
        const modalElement = document.querySelector(`.${currentName}`);
        if (modalElement) {
            modalElement.classList.add('release-animation-bottom');
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    modalElement.classList.remove('release-animation-bottom');
                    modalState.activeModalName = null; // Сбрасываем активное модальное окно после окончания анимации
                }, 300); // Убираем класс после завершения анимации
            }, 300); // Задержка перед началом сброса состояния
        }
    } else if (props.mobileTransition === Transition.DepRight && swipeDistanceX > MIN_SWIPE_DISTANCE) {
        // Логика закрытия вправо
        modalState.isTouching = false; // Устанавливаем флаг для начала анимации закрытия
        const modalElement = document.querySelector(`.${currentName}`);
        if (modalElement) {
            modalElement.classList.add('release-animation-right');
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    modalElement.classList.remove('release-animation-right');
                    modalState.activeModalName = null; // Сбрасываем активное модальное окно после окончания анимации
                }, 300); // Убираем класс после завершения анимации
            }, 300); // Задержка перед началом сброса состояния
        }
    } else {
        modalState.touchCurrentY = modalState.touchStartY; // Возвращаем в исходное положение, если свайп недостаточный
        modalState.touchCurrentX = modalState.touchStartX; // Возвращаем в исходное положение, если свайп недостаточный
        modalState.isTouching = false; // Сбрасываем флаг после окончания касания
    }
};


const swipeStyles = computed(() => {
    if (!modalState.isTouching) return null;

    if (props.mobileTransition === Transition.DepBottom) {
        return { transform: `translateY(${Math.max((modalState.touchCurrentY - modalState.touchStartY) * SWIPE_SENSITIVITY, 0)}px)` };
    } else if (props.mobileTransition === Transition.DepRight) {
        return { transform: `translateX(${Math.max((modalState.touchCurrentX - modalState.touchStartX) * SWIPE_SENSITIVITY, 0)}px)` };
    }

    return null;
});

const onTouchStart = (e: TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.modal')?.classList.contains(currentName)) {
        modalState.touchStartY = e.touches[0].clientY;
        modalState.touchCurrentY = modalState.touchStartY;
        modalState.touchStartX = e.touches[0].clientX; // Установка начальной X координаты
        modalState.touchCurrentX = modalState.touchStartX; // Установка текущей X координаты
        modalState.activeModalName = props.name;
        modalState.isTouching = true; // Устанавливаем флаг, что началось касание
        modalState.isSwiping = true; // Устанавливаем флаг для отслеживания свайпа
    }
};

const onTouchMove = (e: TouchEvent) => {
    if (modalState.isSwiping) {
        modalState.touchCurrentY = e.touches[0].clientY;
        modalState.touchCurrentX = e.touches[0].clientX; // Обновление текущей X координаты
    }
};

const onTouchEnd = (e: TouchEvent) => {
    if (modalState.activeModalName === props.name) {
        modalState.touchEndY = e.changedTouches[0].clientY;
        modalState.touchEndX = e.changedTouches[0].clientX; // Установка конечной X координаты
        const swipeDistanceY = modalState.touchEndY - modalState.touchStartY;
        const swipeDistanceX = modalState.touchEndX - modalState.touchStartX; // Вычисление расстояния свайпа по X
        modalState.isSwiping = false; // Завершаем свайп
        handleSwipeEnd(swipeDistanceY, swipeDistanceX);
    }
};

</script>

<template>
    <div @keyup.esc="closeModal" @click="openModal">
        <slot name="action"></slot>
    </div>
    <transition name="fade">
        <div v-if="modalState.overlayVisible" @click="closeModal" class="overlay">
            <transition :name="currentTransition">
                <div v-if="modalState.modalVisible" @click.stop class="modal"
                    :class="[currentName, mobileClasses, desktopClasses]" @touchstart="onTouchStart"
                    @touchmove="onTouchMove" @touchend="onTouchEnd"
                    :style="swipeStyles">
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
                            <slot name="body"></slot>
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
