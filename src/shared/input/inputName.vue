<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import "./input.scss"
import type Interface from "./interface";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers  } from '@vuelidate/validators';

const props = withDefaults(defineProps<Interface>(), {
})



// Реактивность

const emits = defineEmits([
    'update:value',
    'update:valid',
]);

const updateValue = (e) => {
    emits('update:value', e.target.value);
}



// Валидация

let name = ref();

const rules = computed(() => ({
    name: {
        required: helpers.withMessage('Это обязательное поле', required),
        minLength: helpers.withMessage('Это поле должно содержать как минимум 3 символа', minLength(3))
    }
}));

const v$ = useVuelidate(rules, { name });

const updateValid = function(){
    emits('update:valid', v$.value);
}

const touch = v$.value.name.$touch;

updateValid();

</script>

<script>
</script>
<template>
    <div class="input">
<!--         <p style="color:white">{{ v$ }}</p> -->
        <label :for="name" class="input__label">{{ label }}</label>
        
        
        <input @focus="v$.$reset()" @blur="touch" v-model="name" :name="name" :placeholder="placeholder"
            @input="updateValue" @change="updateValid"
            :class="{ input__field_error: v$.name.$error, input__field_succesful: !v$.name.$invalid }"
            class="input__field" type="text">
       
       
            <transition name="fade">
            <div class="input__errors" v-if="v$.name.$error">
                <p v-for="error of v$.$errors" :key="error.$uid">
                    <span>{{ error.$message }}</span>
                </p>
            </div>
        </transition>
    </div>




</template>
