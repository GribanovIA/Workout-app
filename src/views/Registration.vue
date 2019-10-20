<template>
    <b-row align-h='center'>
        <b-col align-self="center" cols="12" lg='6'>
            <div class="main">
                <h3>Registration</h3>
                <div class="input">
                    <b-form-input placeholder="Email"></b-form-input>
                    <b-form-text>We will convert your username to lowercase instantly</b-form-text>
                </div>
                <div class="input">
                    <b-form-input type='password' placeholder='Password'></b-form-input>
                    <b-form-text>We will convert your username to lowercase instantly</b-form-text>
                </div>
                <div class="input">
                    <b-form-input placeholder='Name'></b-form-input>
                    <b-form-text>We will convert your username to lowercase instantly</b-form-text>
                </div>
                <b-btn variant="primary">Зарегистрироваться</b-btn>
                <p>Уже есть аккаунт? <router-link to='/login'>Войти</router-link></p>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style scoped lang="scss">
    .row{
        height: 100vh;
    }
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        height: 535px;
        border-radius: 15px;
    }
    h3{
        padding-top: 54px;
        padding-bottom: 45px;
    }
    .input{
        margin-bottom: 35px;
    }
    .btn{
        width: 232px;
    }
    p{
        margin-top: 20px;
        a{
            color: #E3B02C;
            font-weight: bold;
            &:hover{
                color: rgb(211, 156, 16);
            }
        }
    }
    // На малых экранах
    @media screen and (max-width: 576px) {
        .main{
            height: 465px;
        }
        h3{
            padding-top: 40px;
            padding-bottom: 25px;
        }
        .input{
        margin-bottom: 15px;
            .form-control{
                
            }
        }
    }
    
    
</style>