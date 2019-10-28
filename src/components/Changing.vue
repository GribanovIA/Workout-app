<template>
        <div class="input">
                <b-form-input @update='update' :class='tag' class='input-changing' @click='edit' @blur='edited'  @keyup.enter='$event.target.blur()' :value='valueModified'></b-form-input>
        </div>

</template>

<script>
export default {
    props:{
        value:{

        },
        tag:{

        },
        textBefore:{
            default: ''
        },
        textAfter:{
            default: ''
        },
        "tag-modile":{

        }
    },
    data() {
        return {
            beforeChanging: '',
            number: this.value
            
        }
    },
    computed:{
        valueModified(){
            return this.textBefore+this.value+this.textAfter
            
            ;
        }
    },
    methods:{
        update(value){
            
            let number = value.match(/[0-9]+/) ? value.match(/[0-9]+/)[0] : '' ;
            this.number = number;
            
        },
        edit(e){
            let text = e.target;
            text.value = this.number;
            text.classList.remove('changed');
            this.beforeChanging = this.value;
        },
        edited(e){
            // console.log(this.value);
            // console.log(this.number);
            // Ебаный костыль
            if(this.value === this.number){
                this.number = this.number+'\r';
            }
            this.$emit('update',this.number+'');
            setTimeout(() => {
                let text = e.target;
                if(this.beforeChanging != this.value){
                    text.classList.add('changed');
                }
            }, 500);
        }
    }
}
</script>

<style scoped lang="scss">
    .input{
        display: flex;
        margin-right: 15px;
        font-size: 10px;
    }
    .changed{
        animation: changeColor 2s ease-out;

    }
    .form-control{
        transition: all .25s ease-out;
        border: 0px solid #000;
        cursor: pointer;
        // &:hover{
        //     background-color: rgb(255, 255, 236);
        // }
    }


    @keyframes changeColor {
        from{
            background-color: rgb(245, 245, 153);
        }
        to{
            background-color: rgb(255, 255, 255);
        }
    }
    .h1 {
        font-size: 2.5rem;
        
    }
    .h2 {
        font-size: 2rem;
    }
    .h3 {
        font-size: 1.75rem;
    }
    .h4 {
        font-size: 1.5rem;
    }
    .h5 {
        font-size: 1rem;
    }
    .h1, .h2, .h3, .h4, .h5, .h6 {
        margin-bottom: .5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.5;
    }
    @media screen and (max-width: 576px) {
        
        .h1 {
            font-size: 1rem;

        }
    }
</style>