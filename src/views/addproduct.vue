<template>
<div class="container">
        <div class="card  w-50" style="margin:50px auto">
            <div class="card-header ">
                <h5> ADD New product</h5>
            </div>
            <div class="card-body ">    
                <div class="alert alert-success success" style="display:none" ></div>
                <div class="alert alert-danger errors" style="display:none" ></div>
                <form v-on:submit.prevent="addproduct">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Product name</label>
                        <input type="text" v-model="name" class="form-control">
                        <div class="alert alert-danger errors name" style="display:none"></div>
                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" v-model="desc" class="form-control">
                        <div class="alert alert-danger errors notes" style="display:none" ></div>
                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">price</label>
                        <input type="number" v-model="price" class="form-control"  >
                        <div class="alert alert-danger errors price" style="display:none" ></div>
                    </div>
                    <button type="submit" class="btn btn-primary">add product</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
data(){
    return{
        name:"",
        desc:"",
        price:0,
        errors:[],
        result:""
    }
    
},mounted(){
    this.destroyMsg()
    this.name=""
    this.desc=""
    this.price=0
    this.errors=[]
    this.result=""
},
methods:{
    destroyMsg(){
        document.querySelector('div.success').style.display="none";
        document.querySelector('div.price').style.display="none"
        document.querySelector('div.name').style.display="none"
        document.querySelector('div.notes').style.display="none"
    },
    addproduct(){
        this.destroyMsg()
        var url="http://3.18.75.167/public/api/product/store"
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                "name": this.name,
                "price": this.price,
                "notes": this.desc
                }),
                })
                .then(response =>{
                    return response.json()
                })
                .then(data =>{
                if(data.response == 201 ){
                    this.result = data.message;
                    document.querySelector('div.success').style.display="block";
                    document.querySelector('div.success').innerText=data.message;
                    setTimeout(()=>{
                        this.$router.push('/');
                },4000);
                }
                else{
                    this.errors=JSON.parse(data.message)
                    if(this.errors.price){
                        document.querySelector('div.price').style.display="block"
                        document.querySelector('div.price').innerText=this.errors.price
                    }
                    if(this.errors.name){
                        document.querySelector('div.name').style.display="block"
                        document.querySelector('div.name').innerText=this.errors.name
                    }
                    if(this.errors.notes){
                        document.querySelector('div.notes').style.display="block"
                        document.querySelector('div.notes').innerText=this.errors.notes
                    }
                }
                })
                
            },
}

}
</script>
<style>
</style>