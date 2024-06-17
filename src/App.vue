<template>
  <div id="layout-wrapper" class="position-relative">
    <Topbar ref="search" @changeMusicSearch="changeMusicSearch"></Topbar>
    <div class="main-content w-100">
        <div class="container">
          <div class="banner col-12">
            <swiper :slidesPerView="1"
                :loop="true" 
                :pagination="true" 
                :navigation="true"
                :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }"
                :modules="modules" 
                @swiper="onSwiperSlide"
                class="swiper-slide"
            >
                <swiper-slide>
                    <img src="@/assets/images/banner1.jpg" alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src="@/assets/images/banner2.jpg" alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src="@/assets/images/banner3.jpg" alt="">
                </swiper-slide>
            </swiper>
          </div>

          <section v-if="listSongsPropose.length>0" class="propose-wrapper song-app-wrapper my-5">
            <div class="song-app-title position-relative py-2 mb-5">
              <span class="fw-bold">Propose</span>
              <div class="line position-absolute w-100"></div>
            </div>
            <div class="song-app-list col-12">
              <div class="row">
                <ItemSong v-for="(item,index) in listSongsPropose" :data="item" :key="index" class="song-app-item col-12 col-md-6 col-lg-4 col-xs-12 col-sm-6 mb-5">
                  <div @click="handleDel(item.id)" class="delete d-flex justify-content-end position-absolute">
                      <i class="fa-regular fa-trash-can text-danger"></i>
                  </div>
                </ItemSong>
              </div>
            </div>
          </section>
          <section class="new-song-wrapper song-app-wrapper my-5">
            <div class="new-song-title song-app-title position-relative py-2 mb-5">
              <span class="fw-bold">New Songs</span>
              <div class="line position-absolute w-100"></div>
            </div>
            <div class="new-song-list song-app-list col-12">
              <div class="row">
                <ItemSong @click="addPlayMusic(item)" v-for="(item,index) in listSongs" :key="index" :data="item" class="new-song-item song-app-item col-12 col-md-6 col-xs-12 col-sm-6 mb-5"></ItemSong>
              </div>
              </div>
          </section>
          <section class="song-app-wrapper my-5">
            <div class="song-app-title position-relative py-2 mb-5">
              <span class="fw-bold">Top Download Songs</span>
              <div class="line position-absolute w-100"></div>
            </div>
            <div class="song-app-list col-12">
              <div class="row">
                <ItemSong @click="addPlayMusic(item)" v-for="(item,index) in sortedSongs" :data="item" :key="index" class="song-app-item col-12 col-md-6 col-xs-12 col-sm-6 mb-5">
                </ItemSong>
              </div>
              </div>
          </section>
        </div>
    </div>
    <PlayMusic ref="compPlayMusic" v-if="dataPlayMusic" :dataPlayMusic="dataPlayMusic"></PlayMusic>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation,Pagination } from 'swiper/modules';
import Topbar from './components/Topbar.vue';
import PlayMusic from './components/Play-music.vue';
import ItemSong from './components/Item-song.vue';
import axios from 'axios';
import { handleImage } from './mixins/handleImage';
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: {
    Topbar,
    Swiper,
    SwiperSlide,
    PlayMusic,
    ItemSong
  },
  data(){
    return{
      modules: [Autoplay, Navigation, Pagination],
      listSongs: [],
      sortedSongs: [],
      dataPlayMusic: null,
      listSongsPropose: this.$store.state.history.dataHistory,
      dataSession: JSON.parse(sessionStorage.getItem('history'))
    }
  },
  mounted(){
    this.getSongs()
  },
  watch:{
    getDataHistory: function(newData){
      this.listSongsPropose = newData.slice(-3)
    }
  },
  computed:{
    getDataHistory(){
      return this.$store.state.history.dataHistory
    }
  },
  mixins: [handleImage],
  methods:{
    ...mapActions('history', ['handleHistory', 'removeItem']),
    onSwiperSlide(swiperInstance){
        this.swiperSlide = swiperInstance
    },
    async getSongs() {
      try {
        const { data } = await axios.get('/data.json');
        this.listSongs = data.slice(0, 10);
        this.sortedSongs = [...this.listSongs].sort((a, b) => b.download - a.download);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addPlayMusic(data){
      this.dataPlayMusic = data;
    },
    changeMusicSearch(data){
      this.dataPlayMusic = data
    },
    handleDel(id){
      this.removeItem(id);
      this.$refs.search.arrayMusic = JSON.parse(sessionStorage.getItem("history"))
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
