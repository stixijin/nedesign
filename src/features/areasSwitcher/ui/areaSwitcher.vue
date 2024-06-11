<script setup>

import "./areaSwitcher.scss";
import Modal from "#shared/modal/modal.vue";
import areas from "#app/area/areas.json";
import MainLogo from "#shared/mainLogo/mainLogo.vue";
import Button from "#shared/button/button.vue"

const props = defineProps({
    logoLink: String
})

</script>


<template>
    <Modal name="areaSwitcher"
        desctopPositionX="custom"
        desctopPositionY="custom"
        desctopTransition="fade"
        mobileHeight="fit"
        mobileWidth="full"
        mobileCloseSide="top"
        mobileClosePosition="end"
        mobilePositionX="center"
        mobilePositionY="bottom"
        mobileTransition="depBottom"
        :mobileBodyPadding=false
    >
        <template v-slot:action>
            <Button buttonIcon="area" buttonSize="xl" buttonColor="black"></Button>
        </template>
        <template v-slot:body>
            <div class="areaList">
                <template  v-for="area in areas">
                    <MainLogo v-if="props.logoLink !== area.link" :logoLink="area.link" :logoArea="area.name" :logoName="area.logo"/>
                </template>
            </div>
        </template>

    </Modal>
</template>