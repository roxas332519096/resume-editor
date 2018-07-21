Vue.component('editable-sapn', {
    props: ['value','editing'],
    template: `
    <div>
        <span v-show="!editing">{{value}}</span>
        <input type="text" v-model="value" @input="editdata" v-show="editing">
    </div>
    `,
    data:function(){
        return {
            editing:false,
        }
    },
    methods:{
        editdata:function(){
            this.$emit('input',this.value)
        }
    }
})
