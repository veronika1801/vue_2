let eventBus = new Vue()



Vue.component("todo", {
    template: `
    
<div class="board">

<div class="form">
<form @submit.prevent="onSubmit">
<label for="name"></label> <input type="text" id="name" placeholder="название " > 
<label for="item_1"></label> <input type="text" id="item_1" placeholder="задача 1"> 
<label for="item_2"></label> <input type="text" id="item_2" placeholder="задача 2" > 
<label for="item_3"></label> <input type="text" id="item_3" placeholder="задача 3"> 
<label for="item_4"></label> <input type="text" id="item_4" placeholder="задача 4"> 
<label for="item_5"></label> <input type="text" id="item_5" placeholder="задача 5"> 

<button type="submit" class="btr" value="Submit">ДОБАВИТЬ</button>

</form>
<ul>
<li class="error" v-for="error in errors">{{error}}</li>
</ul>
</div>

<ul  id="cols">
<li  class="col">
<ul class="cards">
<li class="col_1">dbcjkSBjkb</li>
</ul>
</li>

<li class="col">
<ul>
<li class="col_2">efwaef</li>
</ul>
</li>

<li class="col">
<ul>
<li  class="col_3">awefwaef</li>
</ul>
</li>

</ul>
</div>
    `,
    data(){
        return{
            col_1:[],
            col_2:[],
            col_3:[],
            allCols:[],
            cards:[],
            name:[],
            item_1:[],
            item_2:[],
            item_3:[],
            item_4:[],
            item_5:[],
            items:[],
            errors:[],
            card_id:0,
            blockOne:false

        }
    },
    mounted(){
        if(localStorage.getItem('allCols')){
            try{
                this.allCols=JSON.parse(localStorage.getItem('allCols'));
                this.col_1=this.allCols[0]
                this.col_2=this.allCols[1]
                this.col_3=this.allCols[2]
            }
            catch(e){
                localStorage.removeItem('allCols');
            }
        }
    },
    watch:{
        col_1(){
            allCols=[this.col_1, this,col_2, this.col_3, this.blockOne]
            const parsed=JSON.stringify(this.allCols);
            localStorage.setItem('allCols', parsed);
        },
        col_2(){
            allCols=[this.col_1, this,col_2, this.col_3, this.blockOne]
            const parsed=JSON.stringify(this.allCols);
            localStorage.setItem('allCols', parsed);
        },
        col_3(){
            allCols=[this.col_1, this,col_2, this.col_3, this.blockOne]
            const parsed=JSON.stringify(this.allCols);
            localStorage.setItem('allCols', parsed);
        }
    },
    methods:{
        onSubmit(){
            this.errors=[]
            this.items=[]
            if(this.item_1){
                this.items.push([this.item_1, false])
            }
            if(this.item_2){
                this.items.push([this.item_2, false])
            }
            if(this.item_3){
                this.items.push([this.item_3, false])
            }
            if(this.item_4){
                this.items.push([this.item_4, false])
            }
            if(this.item_5){
                this.items.push([this.item_5, false])
            }
            if(this.items < 3){
                this.errors.push("ОТ 3 ЗАДАЧ")
            }
            if(!this.name){
                this.errors.push("ВВЕДИТЕ НАЗВАНИЕ")
            }
            if(this.col_1.lenght>=3){
                this.errors.push("ВЫПОЛНИТЕ ЗАДАЧИ В 1 СТОЛБЦЕ")
            }
            if(this.blockOne){
                this.errors.push("ВЫПОЛНИТЕ ЗАДАЧИ ВО 2 СТОЛБЦЕ")
            }
            if(this.errors.lenght==0){
                let info={
                    name:this.name,
                    items:this.items,
                    card_id:card_id,
                    count_of_cheked:0,
                }
                this.card+=1;
                this.col_1.push(info)
            }
        }
    },
    toColOne(name,items, card_id,count_of_checked){
        if(this.col_1.length<3){
            let info = {
                name:name,
                items:items,
                card_id:card_id,
                count_of_checked:count_of_checked
            }
            for(i in this.col_2){
                
                if(this.col_2[i].card_id==card_id){
                    this.col_2.splice(i, 1)
                    break
                }
            }

            this.col_1.push(info)
        }

    },
    toColTwo(name,items, card_id,count_of_checked){
        if(this.col_2.length==5){
            this.blockOne = true;
        }
        else{
            let info = {
                name:name,
                items:items,
                card_id:card_id,
                count_of_checked:count_of_checked
            }
            for(i in this.col_1){
                
                if(this.col_1[i].card_id==card_id){
                    this.col_1.splice(i, 1)
                    break
                }
            }

            this.col_2.push(info)
        }
        let checks = 1;
        eventBus.$emit('checkTwo',checks) 

    },
    toColThree(name, items, card_id, now){
        let info={
            name:name,
            card_id:card_id,
            items:items,
            date:now
        }
        for(i in this.col_2){
            if(this.col_2[i].card_id==card_id){
                this.col_2.splice(i, 1)
                break
            }
        }
        this.col_3.push(info)
        this.blockOne=false;
        let checks=1;
        eventBus.$emit('checkOne', checks)
    }
    
 
});




let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});