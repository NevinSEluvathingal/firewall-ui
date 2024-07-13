<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export { default as Userstab } from "./userstab.svelte";
    import { Button } from "$lib/registry/button/";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";
    import {ip} from "./store";
  
    interface Struct {
      type: string;
      action: string;
      arg: string[];
    }
  
    let newUrl = '';
    let newmac = '';
    let maclist = writable<string[]>([]);
    let urlList = writable<string[]>([]);
  
    const addUrl = async () => {
      const request: Struct = {
        type: 'dns',
        action: 'block',
        arg: [newUrl]
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        });
        if (response.ok) {
          urlList.update(list => [...list, newUrl]);
          newUrl = '';
        } else {
          console.error('Failed to add URL:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding URL:', error);
      }
    };
  
    const addmac = async () => {
      const req: Struct = {
        type: 'filter',
        action: 'block',
        arg: [newmac]
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req)
        });
        if (response.ok) {
          maclist.update(list => [...list, newmac]);
          newmac = '';
        } else {
          console.error('Failed to add MAC address:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding MAC address:', error);
      }
    };
  
    const removeUrl = async (url: string) => {
      const request: Struct = {
        type: 'dns',
        action: 'unblock',
        arg: [url]
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        });
        if (response.ok) {
          urlList.update(list => list.filter(item => item !== url));
        } else {
          console.error('Failed to remove URL:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing URL:', error);
      }
    };
  
    const removemac = async (mac: string) => {
      const request: Struct = {
        type: 'filter',
        action: 'unblock',
        arg: [mac]
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        });
        if (response.ok) {
          maclist.update(list => list.filter(item => item !== mac));
        } else {
          console.error('Failed to remove MAC address:', response.statusText);
        }
      } catch (error) {
        console.error('Error removing MAC address:', error);
      }
    };
  
    const fetchInitialUrls = async () => {
      const request: Struct = {
        type: 'dns',
        action: 'list',
        arg: []
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        });
        if (response.ok) {
          const data = await response.json();
          const urls = Object.keys(data);
          urlList.set(urls);
        } else {
          console.error('Failed to fetch URLs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    const fetchInitialMacs = async () => {
      const reques: Struct = {
        type: 'filter',
        action: 'list',
        arg: []
      };
      try {
        const response = await fetch(`http://${ip}/redq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reques)
        });
        if (response.ok) {
          const data = await response.json();
          const macs = Object.keys(data);
          maclist.set(macs);
        } else {
          console.error('Failed to fetch MAC addresses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching MAC addresses:', error);
      }
    };
  
    onMount(() => {
      fetchInitialUrls();
      fetchInitialMacs();
    });
  </script>
  
  <div class="flex items-center space-x-2">
    <Card.Root style="overflow:hidden">
      <Card.Header>
        <div>
          <Input
            type="search"
            placeholder="domain..."
            class="h-9 md:w-[100px] lg:w-[300px]"
            bind:value={newUrl}
          />
        </div>
        <Button size="sm" on:click={addUrl}>
          Add
        </Button>
      </Card.Header>
      <Card.Content>
        <div class="space-y-8">
          <div><h2>Rules Added</h2></div>
          {#each $urlList as url (url)}
            <div class="flex items-center">
              <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{url}</p>
              </div>
              <div class="ml-auto font-medium">
                <Button size="sm" on:click={() => removeUrl(url)}>Remove</Button>
              </div>
            </div>
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
    <Card.Root style="overflow:hidden">
      <Card.Header>
        <div>
          <Input
            type="search"
            placeholder="mac address..."
            class="h-9 md:w-[100px] lg:w-[300px]"
            bind:value={newmac}
          />
        </div>
        <Button size="sm" on:click={addmac}>
          Add
        </Button>
      </Card.Header>
      <Card.Content>
        <div class="space-y-8">
          <div><h2>Mac Blocked</h2></div>
          {#each $maclist as mac (mac)}
            <div class="flex items-center">
              <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{mac}</p>
              </div>
              <div class="ml-auto font-medium">
                <Button size="sm" on:click={() => removemac(mac)}>Remove</Button>
              </div>
            </div>
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
