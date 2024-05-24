<script lang="ts" setup>
import './mainLogo.scss';
import Icon from "#tokens/icons/icon.vue";
import areas from "#app/area/areas.json";

const props = defineProps({
    logoLink: String,
    logoArea: String,
    logoName: String,
    currentLink: String
})

let href = props.logoLink;

if(props.logoLink == props.currentLink) {
    href = ''
}

</script>
<template>
    <a :href="href" class="mainLogo">
        <template v-for="area in areas">
            <Icon v-if="props.logoLink === area.link" :name="area.logo"/>
        </template>
        <div class="mainLogo__label">
            <div class="mainLogo__name">
                <p>Никита Елисеев</p>
            </div>
            <div class="mainLogo__area">
                <p>{{logoArea}}</p>
            </div>
        </div>   
    </a>
</template>


