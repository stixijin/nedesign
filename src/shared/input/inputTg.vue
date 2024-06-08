<script lang="ts" setup>
import { ref, computed } from "vue";
import "./input.scss"
import type Interface from "./interface";
import useVuelidate from "@vuelidate/core";
import { required, helpers  } from '@vuelidate/validators';

const props = withDefaults(defineProps<Interface>(), {
})



// Реактивность

const emits = defineEmits([
    'update:value'
]);

const updateValue = (e) => {
    emits('update:value', e.target.value);
}

const mask = helpers.regex(/@?\w{5,32}|https:\/\/t\.me\/\w{5,32}/g);

// Валидация

let fieldValue = ref();

const rules = computed(() => ({
    fieldValue: {
        required: helpers.withMessage('Это обязательное поле', required),
        mask: helpers.withMessage('Некорректный формат, пример: @username или https://t.me/username', mask),
    }
}));

const v$ = useVuelidate(rules, { fieldValue });

const touch = v$.value.fieldValue.$touch;

</script>

<script>
</script>
<template>
    <div class="input">
        <label :for="name" class="input__label">{{ label }}</label>
        
        
        <input @focus="v$.$reset()" @blur="touch" v-model="fieldValue" :name="name" :placeholder="placeholder"
            @input="updateValue"
            :class="{ input__field_error: v$.fieldValue.$error, input__field_succesful: !v$.fieldValue.$invalid }"
            class="input__field" type="text">
       
       
            <transition name="collapse">
            <div class="input__errors" v-if="v$.fieldValue.$error">
                <p v-for="error of v$.$errors" :key="error.$uid">
                    <span>{{ error.$message }}</span>
                </p>
            </div>
        </transition>
    </div>




</template>
