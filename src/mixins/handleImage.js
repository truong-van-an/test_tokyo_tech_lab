export const handleImage = {
    methods:{
        getImageUrl(image) {
            return require(`@/assets/images/${image}`);
        },
        getSong(song) {
            return require(`@/assets/music/${song}`);
        }
    }
}