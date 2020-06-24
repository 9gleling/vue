<template>
    <div id="app">
        <router-view>
        </router-view>
        <!-- <list v-bind:thema="thema" @parentChageThema="parentChageThema" /> -->
    </div>
</template>

<script>
// import List from '@/components/List.vue'
export default {
    name: 'App',
    data() {
        return {
            thema: 'purpleThema',
        }
    },
    created() {
        this.parentChageThema(this.thema);
    },
    components: {
        // 'list': List,
    },
    methods: {
        parentChageThema: function(themaType) {
            
            this.thema = themaType;

            if(this.thema !== themaType)
                import('./assets/css/'+this.thema+'.css');

        }   
    }
}
</script>

<style>


:root {
    --purple: #5b36ac;
    --white: #ffffff;
    --pale-grey: #f9f9fb;
    --charcoal-grey-two: #363a42;

}


/* 
body {
    margin: 0px;
    background:#f9f9fb;
} */

/* #app {
    background:#f9f9fb;
    min-height: 700px;
} */
</style>
