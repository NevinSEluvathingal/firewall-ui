<script lang="ts">
    import { onMount } from 'svelte';
	import { currentPage } from "./store";
	import Overview from "./content.svelte"
	import Rules from "./rule.svelte"
	import Userstab from "./userstab.svelte"
	import AvatarImgs from "$lib/registry/avatar/index.js";
	import * as Avatar from "$lib/registry/avatarUI/index.js";
    import { createNightowl } from '@bufferhead/nightowl'
    let user=localStorage.getItem('name');
    createNightowl({
        defaultMode: 'dark',
        toggleButtonMode: 'newState'
    })
	import {
		DashboardMainNav,
	} from "./dashboard/";
    let username = 'hello';

onMount(() => {
     username=user;
    /* socket.on('curr_speed',(data)=>{
         speed_up=data.up;
		speed-down=data.down;
         console.log(avg_speed);
     })
     return () => {
     socket.disconnect();
     }*/
 });
 let page;
  currentPage.subscribe(value => {
    page = value;
  });
</script>

<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<div class="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
			<Avatar.Root class="h-7 w-7 gap-2 ">
				<Avatar.Image src={AvatarImgs[0]} alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
            <div>{username}</div>
			</div>
            
			<DashboardMainNav class="mx-6" />
            <div class="ml-auto flex items-center space-x-4"></div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		{#if page === 'overview'}
		<Overview />
	  {:else if page === 'rules'}
		<Rules />
	  {:else if page === 'users'}
		<Userstab />
	  {/if}
	</div>
</div>