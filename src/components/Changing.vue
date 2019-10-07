<template>
        <div class="input">
            <transition>
                <div v-if='isShow' @click='edit' class="text-changing">{{value}}</div>
                <b-form-input @update='update'  class='input-changing' @blur="edited" @keyup.enter='$event.target.blur()' :value='value' v-else></b-form-input>
            </transition>
        </div>

</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            isShow: true,
            beforeChanging: '',
            // Родительский узел очень важен т.к. при использовании функции querySelector поиск должне вестись в конкретном помпоненте а не во все документе, иначе свойства применяется не к тому элементу
            parentNode: ''
        }
    },
    methods:{
        update(value){
            this.$emit('input',value);
            
        },
        edit(e){
            // Находим самый корневой элемент
            this.parentNode = e.target.closest('.input');
            this.isShow = !this.isShow;
            // Необходима небольшая задержка, т.к. Элемента Input еще нет в документе
            setTimeout(() => {
                let input = this.parentNode.querySelector('.input-changing');
                input.focus();
            }, 0);
            
            this.beforeChanging = this.value;
            
        },
        edited(){
            this.isShow = !this.isShow;
            setTimeout(() => {
                let text = this.parentNode.querySelector('.text-changing');
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
        position: relative;
        height: 38px;
        margin-bottom: 15px;
    }
    .text-changing{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        margin-bottom: 13px;
        cursor: pointer;
        &:hover{
            background-color: rgb(255, 255, 236);
        }
    }
    .input-changing{
        position: absolute;
        padding-left: 0;
        left: -1px;
    }
    .changed{
        animation: changeColor 2s ease-out;

    }
    @keyframes changeColor {
        from{
            background-color: rgb(245, 245, 153);
        }
        to{
            background-color: rgb(255, 255, 255);
        }
    }

    .v-leave{
        opacity: 1;
        
    }
    .v-leave-active{
        transition: opacity .65s ease;
        

    }
    .v-leave-to{
        opacity: 0;
        

    }
    .v-enter{
        opacity: 0;

    }
    .v-enter-active{
        transition: opacity .65s ease;

    }
</style>