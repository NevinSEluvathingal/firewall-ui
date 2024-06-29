<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
    import { onMount } from 'svelte';
    import Bar from "$lib/components/ui/bar/bar.svelte"
    import Test from "$lib/components/ui/test.svelte"
    import {Button} from "$lib/components/ui/button/index";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Users from "lucide-svelte/icons/users";
    import * as Avatar from "$lib/registry/avatar/index.js";
    import { cn } from "$lib/utils.js";
    import RecentSales from "$lib/components/ui/hist/hist.svelte"
    import { createNightowl } from '@bufferhead/nightowl'
    let user=localStorage.getItem('name');
    let className="nevin";
    createNightowl({
        defaultMode: 'dark',
        toggleButtonMode: 'newState'
    })
	import {
		DashboardMainNav,
		Search,
	} from "./dashboard/";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
    let username = 'hello';

onMount(() => {
     username=user;
    /* socket.on('average_speed',(data)=>{
         avg_speed=data.speed;
         console.log(avg_speed);
     })
     return () => {
     socket.disconnect();
     }*/
 });
</script>

<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
            <div>{username}</div>
            
			<DashboardMainNav class="mx-6" />
            <div class="ml-auto flex items-center space-x-4"></div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
		</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Speed Graph</Card.Title>
						</Card.Header>
						<Card.Content>
                            <Test />
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Peek Bandwidth</Card.Title>
							<Users class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">50Mb/s</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Active hours</Card.Title>
							<CreditCard class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+128Hrs</div>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Users Connected</Card.Title>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">73</div>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Overview</Card.Title>
						</Card.Header>
						<Card.Content>
							<Bar />
						</Card.Content>
					</Card.Root>
					<Card.Root class="col-span-3">
						<Card.Header>
							<Card.Title>Connected Devices</Card.Title>
							<Card.Description>user and their ip's</Card.Description>
						</Card.Header>
						<Card.Content>
							<RecentSales />
						</Card.Content>
					</Card.Root>
				</div>

	</div>
</div>