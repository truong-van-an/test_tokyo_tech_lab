export const debounce = {
    data(){
        return{
            timerId: null
        }
    },
    methods:{
        debounce(fn, delay){
            delay = delay || 0;
            return () => {
                if (this.timerId) {
                    clearTimeout(this.timerId)
                    this.timerId = null;
                }
                this.timerId = setTimeout(() => {
                    fn()
                }, delay)
    
            }
        },
    }
}