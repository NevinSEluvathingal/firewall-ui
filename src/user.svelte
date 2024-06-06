<script>
    import Bar from "$lib/components/ui/bar/bar.svelte"
    import Connected from "$lib/components/ui/hist/hist.svelte"
    import { onMount } from 'svelte';
   let user=localStorage.getItem('name')

   let username = 'hello';

   onMount(() => {
        username=user.toUpperCase();
    });


    

</script>
<style>
    .bar {
        width:500px;
    }
    .con {
        width:500px; 
    }
    .flex {
        display:flex;
        flex-direction:row;
        height:100vh;
        width:100vw;
        align-items:center;
        justify-content:space-around;
    }
    .top {
        position: absolute;
        top: 20px;
        font-size: xx-large;
        font-weight: bold;
    }
</style>

<section class="flex">
    <div class="bar">
        <h1 class="top" id="name">Hello {username}</h1>
        <Bar/>
    </div>
    <div class="con">
        <Connected />
    </div>
</section>
