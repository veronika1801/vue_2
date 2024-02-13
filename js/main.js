Vue.component("todo",{
    template:`
    <div class="todo">
    <div class="form">
        <form @submit.prevent="onSubmit">
            <label for="name">название</label>
            <input type="text" id="name" >
            <label for="point_1">задача 1</label>
            <input type="text" id="point_1" >
            <label for="point_2">задача 2</label>
            <input type="text" id="point_2" >
            <label for="point_3">задача 3</label>
            <input type="text" id="point_3" 
            <label for="point_4">задача 4</label>
            <input type="text" id="point_4" >
            <label for="point_5">задача 5</label>
            <input type="text" id="point_5" >
            <button type="submit" class="btr" value="sabmit">создать</button>
        </form>
        
    </div>
        
    </div>
    `,
    


});

let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});