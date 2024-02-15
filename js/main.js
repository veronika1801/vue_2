


let eventBus = new Vue()



Vue.component("todo", {
    template: `
    
<div class="todo">

<div class="form">
<form @submit.prevent="onSubmit">
<label for="name"></label> <input type="text" id="name" v-model="name" placeholder="название"> 

<label for="item1"></label> <input type="text" id="item1" v-model="item1" placeholder="задача 1"> 
<label for="item2"></label> <input type="text" id="item2" v-model="item2" placeholder="задача 2"> 
<label for="item3"></label> <input type="text" id="item3" v-model="item3" placeholder="задача 3"> 
<label for="item4"></label> <input type="text" id="item4" v-model="item4" placeholder="задача 4"> 
<label for="item5"></label> <input type="text" id="item5" v-model="item5" placeholder="задача 5"> 


<input class="but"type="submit" value="СОЗДАТЬ">





</form>

<ul>
<li class="error "v-for="error in errors">{{error}}</li>
</ul>
</div>

<ul  id="columns">
<li  class="column">
<h2>0% выполнено</h2>
<ul class="cards">
<li v-for="card in column1"><card @edit="EditCard" :name="card.name" :column=1 :block="blockOne"  :card_id="card.card_id" :count_of_checked="card.count_of_checked" :items="card.items" @to-two="toColumnTwo" ></card></li>
</ul>
</li>


<li class="column">
<h2>50% выполнено</h2>
<ul class="cards">
<li  v-for="card in column2"><card @edit="EditCard" :name="card.name" :column=2 :block=false :card_id="card.card_id" :count_of_checked="card.count_of_checked" :items="card.items" @to-three="toColumnThree" @to-one="toColumnOne" >  ></card></li>
</ul>
</li>



<li class="column">
<h2>100% выполнено</h2>
<ul class="cards">
<li  v-for="card in column3"><card class="done_card" :name="card.name" :pblock=true :dat="card.dat" :card_id="card.card_id" :column=3 :items="card.items" ></card></li>
</ul>
</li>



</ul>
</div>
    `,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],


            allColumns: [],
            cards: [],

            name: null,
            item1: null,
            item2: null,
            item3: null,
            item4: null,
            item5: null,

            items: [],

            errors: [],

            card_id: 0,

            blockOne: false,
        }
    },
    mounted() {
        if (localStorage.getItem('allColumns')) {
            try {
                this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
                this.column1 = this.allColumns[0]
                this.column2 = this.allColumns[1]
                this.column3 = this.allColumns[2]

                this.blockOne = this.allColumns[4]
            } catch (e) {
                localStorage.removeItem('allColumns');
            }
        }

        this.card_id = +localStorage.getItem("lastCardId", "0")
    },
    watch: {
        card_id() {
            localStorage.setItem("lastCardId", this.card_id.toString())
        },
        column1() {
            this.allColumns = [this.column1, this.column2, this.column3, this.blockOne]

            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);


        },
        column2() {
            allColumns = [this.column1, this.column2, this.column3, this.blockOne]


            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);

        },
        column3() {
            allColumns = [this.column1, this.column2, this.column3, this.blockOne]


            const parsed = JSON.stringify(this.allColumns);
            localStorage.setItem('allColumns', parsed);
        },

    },
    methods: {
        onSubmit() {
            this.errors = []
            this.items = []

            if (this.item1) {
                this.items.push([this.item1, false]) 
            }
            if (this.item2) {
                this.items.push([this.item2, false]) 
            }
            if (this.item3) {
                this.items.push([this.item3, false]) 
            }
            if (this.item4) {
                this.items.push([this.item4, false]) 
            }
            if (this.item5) {
                this.items.push([this.item5, false]) 
            }

            if (this.items.length < 3) {
                this.errors.push(" ОТ 3 ЗАДАЧ")
            }
            if (!this.name) {
                this.errors.push("ВВЕДИТЕ НАЗВАНИЕ")
            }
            if (this.column1.length >= 3) {
                this.errors.push("ВЫПОЛНИТЕ ЗАДАЧИ В 1 СТОЛБЦЕ")
            }
            if (this.blockOne) {
                this.errors.push("ВЫПОЛНИТЕ ЗАДАЧИ ВО 2 СТОЛБЦЕ")
            }
            if (this.errors.length == 0) {
                let info = {
                    name: this.name,
                    items: this.items,
                    card_id: this.card_id,
                    count_of_checked: 0,
                }
                this.card_id += 1;
                this.column1.push(info)

            }
        },
        toColumnOne(name, items, card_id, count_of_checked) {
            console.log("trigger one");
            if (this.column1.length < 3) {
                let info = {
                    name: name,
                    items: items,
                    card_id: card_id,
                    count_of_checked: count_of_checked,
                    edit: false
                }
                for (i in this.column2) {

                    if (this.column2[i].card_id == card_id) {
                        this.column2.splice(i, 1)
                        break
                    }
                }

                this.column1.push(info)
            }

        },
        toColumnTwo(name, items, card_id, count_of_checked) {
            console.log("trigger two");
            if (this.column2.length == 5) {
                this.blockOne = true;
            }
            else {
                let info = {
                    name: name,
                    items: items,
                    card_id: card_id,
                    count_of_checked: count_of_checked
                }
                for (i in this.column1) {

                    if (this.column1[i].card_id == card_id) {
                        this.column1.splice(i, 1)
                        break
                    }
                }

                this.column2.push(info)
            }
            let checks = 1;
            eventBus.$emit('checkTwo', checks)

        },
        toColumnThree(name, items, card_id, now) {
            console.log("trigger tree");
            let info = {
                name: name,
                items: items,
                card_id: card_id,
                dat: now,
            }
            for (i in this.column2) {

                if (this.column2[i].card_id == card_id) {
                    this.column2.splice(i, 1)
                    break
                }
            }

            this.column3.push(info)
            this.blockOne = false;
            let checks = 1;
            eventBus.$emit('checkOne', checks)
        },

        EditCard(card_id, namenew, item1new, item2new, item3new, item4new, item5new) {
            console.log(card_id);

            console.log(this.log);


            this.log += 1 

            for (let i = 0; i < this.column1.length; i++) {
                if (this.column1[i].card_id == card_id) {
                    this.column1[i].name = namenew
                    this.column1[i].items[0][0] = item1new
                    this.column1[i].items[1][0] = item2new
                    this.column1[i].items[2][0] = item3new
                    this.column1[i].items[3][0] = item4new
                    this.column1[i].items[4][0] = item5new
                }
            }
            for (let i = 0; i < this.column2.length; i++) {
                if (this.column2[i].card_id == card_id) {
                    this.column2[i].name = namenew
                    this.column2[i].items[0][0] = item1new
                    this.column2[i].items[1][0] = item2new
                    this.column2[i].items[2][0] = item3new
                    this.column2[i].items[3][0] = item4new
                    this.column2[i].items[4][0] = item5new

                }
            }

        }

    }
});



Vue.component("card", {
    template: `
    <div class="card">
    <h3>{{name}}</h3>
    
    <ul class="card_ul">
        <li v-for="item in items"><task :block="block" :item="item[0]" :pblock="pblock" :done="item[1]" @checked="updatechecked" @updatetwo="updatetwo"></task></li>
    </ul>

    <div>
    <button v-if="column==1||column==2" v-on:click="editable">Редактировать</button>
    <form v-if="edit">
    <div id="redact">
        <input type="text" placeholder="Название" v-model="namenew">
        <input type="text" placeholder="задача 1" v-model="item1new" >
        <input type="text" placeholder="задача 2" v-model="item2new" >
        <input type="text" placeholder="задача 3" v-model="item3new" >
        <input type="text" placeholder="задача 4" v-model="item4new" >
        <input type="text" placeholder="задача 5" v-model="item5new" >
    <div>
    <input type="submit" @click.prevent="RedCard" value="Редактировать карточку"> 
    </div>
    
    </div>
    </form>
    <p class="date">{{dat}}</p>
    </div>
    </div>
    `,
    data() {
        return {
            edit: false,
            namenew: null,
            item1new: null,
            item2new: null,
            item3new: null,
            item4new: null,
            item5new: null,
        }
    },
    methods: {
        
        updatechecked(item) {
            console.log(item);
            this.count_of_checked += 1;

            for (i in this.items) {
                if (this.items[i][0] == item && this.items[i][1] != true) {
                    this.items[i][1] = true
                    break
                }
            }
            if ((this.count_of_tasks) == (this.count_of_checked)) {
                var now = new Date()

                console.log(this.name, this.items, this.card_id, now)
                this.$emit("to-three", this.name, this.items, this.card_id, now);
            }
            else if ((this.count_of_tasks / 2) <= (this.count_of_checked)) {
                this.$emit("to-two", this.name, this.items, this.card_id, this.count_of_checked);
            }
        },
        editable() {
            this.edit = !this.edit
        },
        RedCard() {
            if (this.namenew && this.item1new && this.item2new && this.item3new && this.item4new && this.item5new) {
                this.edit = false
                this.$emit("edit", this.card_id, this.namenew, this.item1new, this.item2new, this.item3new, this.item4new, this.item5new);
            }
        },
        
        updatetwo(item) {
            this.count_of_checked -= 1;
            if (this.column == 2 || this.column == 1) {
                for (i in this.items) {
                    if (this.items[i][0] == item && this.items[i][1] == true) {
                        this.items[i][1] = false
                        break
                    }
                }
                if (this.column == 2) {
                    if ((this.count_of_tasks / 2) > (this.count_of_checked)) {
                        this.$emit("to-one", this.name, this.items, this.card_id, this.count_of_checked);
                    }
                }
            }
        },
    },
    mounted() {
        eventBus.$on('checkOne', checks => {
            this.count_of_checked = 0
            for (i in this.items) {
                if (this.items[i][1] == true) {
                    this.count_of_checked += 1
                }
            }

            if ((this.count_of_tasks / 2) <= (this.count_of_checked) && (this.count_of_tasks) != (this.count_of_checked)) {
                this.$emit("to-two", this.name, this.items, this.card_id, this.count_of_checked);
            }

        })

        eventBus.$on('checkTwo', checks => {
            this.count_of_checked = 0
            for (i in this.items) {
                if (this.items[i][1] == true) {
                    this.count_of_checked += 1
                }
            }

            if ((this.count_of_tasks / 2) > (this.count_of_checked)) {
                this.$emit("to-one", this.name, this.items, this.card_id, this.count_of_checked);
            }
        })


    },


    props: {
        name: {
            type: String,
            required: false, 
        },
        items: {
            type: Array,
            required: false, 
        },
        card_id: {
            type: Number,
            required: false, 
        },
        count_of_checked: {
            type: Number,
            required: false, 
        },
        dat: {
            type: String,
            required: false, 
        },
        block: {
            type: Boolean,
            required: false 
        },
        column: {
            type: Number,
            required: false, 
        },
        pblock: {
            type: Boolean,
            required: false 
        }

    },
    computed: {
        count_of_tasks() {
            return this.items.length;
        },
    }
});



Vue.component("task", {
    template: `
<div class="task"
@click="check"
:class="{done:done}">{{item}}</div>
    `,
    data() {
        return {
            
        }
    },
    props: {
        item: {
            type: String,
            required: false, 
        },
        done: {
            type: Boolean,
            required: false,
        },
        block: {
            type: Boolean,
            required: false, 
        },
        pblock: {
            tupe: Boolean,
            required: false 
        }
    },
    methods: {
        check() {
            if (!this.pblock) {
                if (!this.done) {
                    if (!this.block) {
                        this.done = true
                        this.$emit("checked", this.item); 
                    }
                }
                else {
                    if (!this.block) {
                        this.done = false
                        this.$emit("updatetwo", this.item);
                    }
                }
            }
        }
    }
});


let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});


