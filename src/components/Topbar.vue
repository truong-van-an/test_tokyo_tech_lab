<template>
  <div id="topbar">
        <div class="d-flex align-items-center">
            <span class="logo">
                Music market
            </span>
            <div class="form-search position-relative">
                <input @input="handleDebounce" class="search w-100" type="text" placeholder="Type any name here...">
                <div v-if="isListDataResult" class="search-result position-absolute">
                    <div>
                        <div @click="handlePlayMusic(item)" v-for="(item,index) in listDataSearch" :key="index" class="search-item p-3">
                            <div class="d-flex align-items-center">
                                <div class="image position-relative overflow-hidden">
                                    <img class="w-100 h-100 object-fit-cover" :src="getImageUrl(item.image)" alt="">
                                </div>
                                <div class="song-app-info px-4">
                                    <span class="name-song fw-bold">{{ item.name_song }}</span><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from '@/mixins/debounce';
import { handleImage } from '@/mixins/handleImage';
export default {
    name: "Topbar-App",
    mixins: [debounce, handleImage],
    data(){
        return {
            listDataSearch: [],
            uniqueSongs: [],
            isListDataResult: false,
            arrayMusic: sessionStorage.getItem("history") ? JSON.parse(sessionStorage.getItem('history')) : []
        }
    },
    methods:{
        handleDebounce(event){
            const debouncedLoadValue = this.debounce(() => {
                this.handleSearch(event.target.value)
            }, 1000);
            debouncedLoadValue()
        },
        async handleSearch(value) {
            if(value.length > 0){
                try {
                    const response = await axios.get('/data.json');
                    let data = response.data;
                    this.listDataSearch = data.filter(song => song.name_song.toLowerCase().includes(value.toLowerCase()));
                    if(this.listDataSearch.length > 0){
                        this.isListDataResult = true
                    }
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            else{
                this.isListDataResult = false
            }
        },
        handlePlayMusic(data){
            this.$emit('changeMusicSearch', data)
            this.arrayMusic.push(data)
            const uniqueSongId = new Set();
            this.uniqueSongs = this.arrayMusic.filter(song => {
                if (!uniqueSongId.has(song.id)) {
                    uniqueSongId.add(song.id);
                    return true;
                }
                return false;
            });
            sessionStorage.setItem('history', JSON.stringify(this.uniqueSongs))
            this.$store.dispatch('history/handleHistory')
        }
    }
}
</script>