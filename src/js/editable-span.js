Vue.component('editable-sapn', {
    props: ['value'],
    template: `
    <div>
        <span v-show="!editing">{{value}}</span>
        <input type="text" v-model="value" @input="editdata" v-show="editing">
        <button @click="editing = !editing">修改</button>
    </div>
    `,
    data:function(){
        return {
            editing:false
        }
    },
    methods:{
        editdata:function(){
            this.$emit('input',this.value)
        }
    }
})
