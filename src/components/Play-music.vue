<template>
    <div id="play-music-wrapper" class="position-fixed py-3 px-4 bg-white w-100">
        <div class="d-flex row align-items-center">
            <div class="play-music-left d-flex align-items-center col-12 col-xl-4 col-md-4 col-sm-12 col-xs-12">
                <div class="image position-relative overflow-hidden rounded-circle">
                    <img class="w-100 h-100 object-fit-cover" :src="getImageUrl(dataPlayMusic?.image)" alt="">
                </div>
                <div class="music-info mx-2">
                    <span class="name-song fw-bold">{{ dataPlayMusic.name_song }}</span><br>
                    <span class="singer">{{ dataPlayMusic.singer }}</span>
                </div>
            </div>
            <div class="play-music-right d-flex flex-1 col-12 col-xl-6 col-md-6 col-sm-12 col-xs-12 px-3">
                <div class="d-flex align-items-center">
                    <div class="time mx-2">
                        <span>{{ currentMusicmin }}</span>:<span>{{ currentMusicsec }}</span>
                    </div>
                    <div @click="handleMusicRewind" ref="progressBar" class="progress-music w-100">
                        <div :style="{'width': widthProgress + '%'}" class="progress-bar"></div>
                    </div>
                </div>
                <button @click="handlePlay" class="action-music rounded-circle mx-2 bg-white">
                    <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
                </button>
                <audio @timeupdate="handleProgress" @ended="handleEnded" ref="song" :src="getSong(dataPlayMusic?.song)"></audio>
            </div>
        </div>
</div>
</template>

<script>
import { handleImage } from '@/mixins/handleImage';

export default {
name: "Play-Music-App",
data(){
        return{
            isPlaying: false,
            widthProgress: 0,
            currentMusicmin: "00",
            currentMusicsec: "00"
        }
    },
    watch:{
        dataPlayMusic: function(newVal, oldVal){
            if (newVal !== oldVal) {
                this.widthProgress = 0;
                this.isPlaying = false;
            }
        }
    },
    props: {
        dataPlayMusic: {type: Object}
    },
    mixins: [handleImage],
    methods:{
        handlePlay() {
            const audioElement = this.$refs.song;
            if (this.isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        handleProgress(e){
            let currentTime = e.target.currentTime
            let duration = e.target.duration;
            this.widthProgress = (currentTime/duration)*100;

            this.currentMusicmin = Math.floor(currentTime/60);
            if(this.currentMusicmin < 10){
                this.currentMusicmin = `0${this.currentMusicmin}`
            }
            this.currentMusicsec = Math.floor(currentTime%60);
            if(this.currentMusicsec < 10){
                this.currentMusicsec = `0${this.currentMusicsec}`;
            }
        },
        handleMusicRewind(e){
            let progressWidthval = this.$refs.progressBar.clientWidth;
            let clickOffsetX = e.offsetX;
            let songDuration = this.$refs.song.duration;
            this.$refs.song.currentTime = (clickOffsetX / progressWidthval) * songDuration
            this.isPlaying = false;
            this.handlePlay()
        },
        handleEnded(){
            this.isPlaying = false
        }
    }
}
</script>