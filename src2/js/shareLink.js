Vue.component('share-link',{
    props:['share-link'],
    template:`
    <div class="share" v-cloak>
        <h1>分享链接:</h1>
        <span>{{shareLink}}</span>
        <span @click="closeShare">关闭</span>
    </div>
    `,
    methods:{
        closeShare:function(){
            this.$emit('close')
        }
    }
})