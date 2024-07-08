<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import AvatarImgs from "$lib/registry/avatar/index.js";
	import * as Avatar from "$lib/registry/avatarUI/index.js";

	let macAddresses = [];
	let keys=[];
	let update;

	const token = localStorage.getItem('Token');
  console.log(token);

  interface Bandwidth {
    type: string,
    action: string,
    arg: string[],
  }

  const resp: Bandwidth = {
    type: 'bandwidth',
    action: '',
    arg: [],
  };

  async function fetchData() {
  try {
    const response = await fetch('http://192.168.1.38:3333/redq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tokenstring': `${token}`,
      },
      body: JSON.stringify(resp),
    });

    if (response.ok) {
      const dataResponse = await response.json();
	   keys = Object.keys(dataResponse);
	   macAddresses=keys.filter(keys=>keys!=="total"&&keys!="totalraw")
	   console.log(macAddresses);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMount(() => {
    update=setInterval(fetchData,5000);
 });
</script>

<div class="space-y-8">
	{#each macAddresses as macaddress, index}
		<div class="flex items-center">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Image src={AvatarImgs[index % AvatarImgs.length]} alt="Avatar" />
				<Avatar.Fallback>{user.initials}</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{macaddress}</p>
			</div>
		</div>
	{/each}
</div>
