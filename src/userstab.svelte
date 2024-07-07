<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export { default as Userstab } from "./userstab.svelte";
    import { Button } from "$lib/registry/button/";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card";
  
    interface Struct {
      type: string;
      action: string;
      arg: string[];
    }
  
    let newUrl = '';
    let urlList = writable<string[]>([]);
  

    const addUrl = async () => {
      const request: Struct = {
        type: 'dns',
        action: 'block',
        arg: [newUrl]
      };
      try {
        const response = await fetch('http://192.168.1.48:3333/redq', {
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
  
    const removeUrl = async (url: string) => {
      const request: Struct = {
        type: 'dns',
        action: 'unblock',
        arg: [url]
      };
      try {
        const response = await fetch('http://192.168.1.48:3333/redq', {
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
  </div>
  