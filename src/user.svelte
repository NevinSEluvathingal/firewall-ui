<script>
    import Bar from "$lib/components/ui/bar/bar.svelte"
    import Connected from "$lib/components/ui/hist/hist.svelte"
    import { onMount } from 'svelte';
    import io from 'socket.io-client';

    const socket = io('http://192.168.1.8:5000');
	let avg_speed=0;
   let user=localStorage.getItem('name')

   let username = 'hello';

   onMount(() => {
        username=user.toUpperCase();
        socket.on('average_speed',(data)=>{
			avg_speed=data.speed;
		})
        return () => {
        socket.disconnect();
        }
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
