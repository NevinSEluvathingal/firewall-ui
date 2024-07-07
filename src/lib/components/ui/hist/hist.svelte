<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import AvatarImgs from "$lib/registry/avatar/index.js";
	import * as Avatar from "$lib/registry/avatarUI/index.js";

	let users = [];

	const fetchUsers = async () => {
		try {
			const response = await fetch('http://192.168.1.4/users');
			if (response.ok) {
				const data = await response.json();
				users = data;
			} else {
				console.error('Failed to fetch users:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	onMount(() => {
		//fetchUsers();

		//const interval = setInterval(fetchUsers, 10000);

		//onDestroy(() => clearInterval(interval));
	});
</script>

<div class="space-y-8">
	{#each users as user, index}
		<div class="flex items-center">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Image src={AvatarImgs[index % AvatarImgs.length]} alt="Avatar" />
				<Avatar.Fallback>{user.initials}</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{user.name}</p>
			</div>
		</div>
	{/each}
</div>
