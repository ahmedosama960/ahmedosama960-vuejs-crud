<template>
<div class="container">
<form v-on:submit.prevent="deleteProduct()">
    

        <div class="alert alert-danger errors" style="display: none"></div>
        <div class="alert alert-success success" style="display: none"></div>
        <div class="sure">
            <p> you're going to remove <span class="text-info">{{product.name}}</span> </p>
            <p>price <span class="text-info">{{product.price}}</span> </p>
            <p>notes <span class="text-info">{{product.notes}}</span> </p>
        </div>
        <div style="text-align:center">
            <button type="submit" class="btn btn-danger w-50">Delete</button>
        </div>
</form>
</div>
</template>

<script>
export default {
props:['id'],

data(){
    return{
        product:{
            name: "",
            price: 0,
            notes: "",
        },
        result :"",
        errors:[]
    }
},
methods: {
    destroyMsg(){
        document.querySelector('div.success').style.display="none";
        document.querySelector('div.success').append(` `);
        document.querySelector('div.errors').style.display="none";
        document.querySelector('div.errors').append(` `);
    },
    getProducts() {
      let url = `http://3.18.75.167/public/api/product/${this.id}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //   console.log(data);
          if (data.response == 200) {
            this.product = {
              name: data.data.name,
              price: data.data.price,
              notes: data.data.notes,
            };
          } else {
            this.erorrs += data.message;
            document.querySelector("div.errors").style.display = "block";
            document.querySelector("div.errors").append(`${this.erorrs}`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteProduct(){
      this.destroyMsg()
      let url = `http://3.18.75.167/public/api/product/delete/${this.id}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.response == 200) {
            this.result = data.message;
            document.querySelector("div.success").style.display = "block";
            document.querySelector("div.success").append(`${this.result}`);

            setTimeout(()=>{
            this.$router.push('/');
            },3000);

          } else {
            this.erorrs += data.message;
            document.querySelector("div.errors").style.display = "block";
            document.querySelector("div.errors").append(`${this.erorrs}`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
        
    }
},
mounted(){
  this.destroyMsg()
    this.errors=[],
    this.result=""
    this.getProducts();
    
}
}
</script>

<style>
.sure{
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  color:red
}
</style>