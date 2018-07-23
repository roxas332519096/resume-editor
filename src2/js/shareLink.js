Vue.component('share-link',{
    props:['share-link'],
    template:`
    <div class="share" v-cloak>
        <h1>分享链接</h1>
        <span class="link">{{shareLink}}</span>
        <span @click="closeShare" class="close">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-2guanbi"></use>
            </svg>
        </span>
    </div>
    `,
    methods:{
        closeShare:function(){
            this.$emit('close')
        }
    }
})