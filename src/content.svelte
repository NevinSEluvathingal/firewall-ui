<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
    import { onMount } from 'svelte';
    import {writable} from 'svelte/store';
    import Bar from "$lib/components/ui/bar/bar.svelte"
    import Test from "$lib/components/ui/test.svelte"
	import CreditCard from "lucide-svelte/icons/credit-card";
    import * as Card2 from "$lib/components/ui/card2/";
	import Users from "lucide-svelte/icons/users";
	import * as Avatar from "$lib/registry/avatarUI/index.js";
    import RecentSales from "$lib/components/ui/hist/hist.svelte"
    export { default as Overview } from "./content.svelte";
    import {ip} from "./store";
    import {deviceno} from "./store";

    let deviceNo;
    let str1=writable<string>('');
    let str2=writable<string>('');
    deviceno.subscribe($value=>{
    deviceNo=$value-2;
    }
    );
    let update;

    let user=localStorage.getItem('name');
	const Imgs=[
		'/public/up.png',
		'/public/down.png'
	]
	import * as Card from "$lib/components/ui/card/index.js";
    let username = 'hello';

  const token = localStorage.getItem('Token');
  console.log(token);

  interface Bandwidth {
    type: string,
    action: string,
    arg: string[],
  }

  const resp: Bandwidth = {
    type: 'usage',
    action: '',
    arg: [],
  };

  async function fetchData() {
  try {
    const response = await fetch(`http://${ip}/redq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tokenstring': `${token}`,
      },
      body: JSON.stringify(resp),
    });

    if (response.ok) {
      const dataResponse = await response.json();
      const val = dataResponse.total;
      console.log('Data Response:', val);
      str1.set(val.ingress);
      console.log(str1+"hello");
      str2.set(val.egress);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

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
    update=setInterval(fetchData,1000);
 });
 </script>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <Card.Title class="text-sm font-medium">Data Usage</Card.Title>
                    <Users class="h-4 w-4 text-muted-foreground" />
                </Card.Header>
                <Card.Content class="pt-0">
                </Card.Content>
                <Card.Content>
                   <div class="flex flex-row items-center justify-center gap-3">
                    <div class="flex flex-row items-center gap-1">
                        <Avatar.Root class="h-8 w-8">
                            <Avatar.Image src={Imgs[0]} alt="Avatar" />
                            <Avatar.Fallback>OM</Avatar.Fallback>
                          </Avatar.Root>
                          <h1 class="text-2xl font-bold">{$str1}</h1>
                    </div>
                    <div class="flex flex-row items-center gap-1">
                        <Avatar.Root class="h-8 w-8">
                            <Avatar.Image src={Imgs[1]} alt="Avatar" />
                            <Avatar.Fallback>OM</Avatar.Fallback>
                          </Avatar.Root>
                          <h1 class="text-2xl font-bold">{$str2}</h1>
                    </div>								
                   </div>
                </Card.Content>
            </Card.Root>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card.Root>
                <Card.Header
                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                    <Card.Title class="text-sm font-medium">Uptime</Card.Title>
                    <CreditCard class="h-4 w-4 text-muted-foreground" />
                </Card.Header>
                <Card.Content>
                        <div class="flex  justify-center text-2xl font-bold items-center">30Hrs+</div>
                    
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
                    <div class="flex text-2xl font-bold items-center justify-center">{deviceNo}</div>
                </Card.Content>
            </Card.Root>
         </div>
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
            <Card2.Root class="col-span-3" style="height:30rem;overflow-y:auto;">
                <Card2.Header>
                    <Card2.Title>Connected Devices</Card2.Title>
                    <Card2.Description>mac addresses</Card2.Description>
                </Card2.Header>
                <Card2.Content>
                    <RecentSales />
                </Card2.Content>
            </Card2.Root>
        </div>