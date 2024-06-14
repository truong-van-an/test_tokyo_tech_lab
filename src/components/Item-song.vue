<template>
    <div class="position-relative">
        <div class="d-flex" @click="addPlayMusic(data)">
            <div class="image">
                <img class="w-100 h-100 object-fit-cover" :src="getImageUrl(data.image)" alt="">
            </div>
            <div class="song-app-info">
                <div class="px-4">
                    <span class="name-song fw-bold">{{ data.name_song }}</span><br>
                    <span class="singer">{{ data.singer }}</span>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { handleImage } from '@/mixins/handleImage'
export default {
    name: "Item-Song-App",
    props:{
        data:{type: Object}
    },
    mixins: [handleImage],
    methods:{
        addPlayMusic(data){
            this.$parent.addPlayMusic(data)
        }
    }
}
</script>

<style>
.delete{
    bottom: 0;
    right: 20px;
    z-index: 10000;
}
</style>