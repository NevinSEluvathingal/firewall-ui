<script>
    export { default as  Rules} from "./rule.svelte";
    import * as Card from "$lib/components/ui/card/";
    import * as Card2 from "$lib/components/ui/card2/";
    import Mem from "./lib/components/mem.svelte"
    import Temp from "./lib/components/temp.svelte"  
  import Specs from "$lib/components/ui/specs/specs.svelte";
  import { onMount } from 'svelte';
  import { startFetching } from './store';

  onMount(() => {
    startFetching();
  });
</script>
<div class="flex items-center justify-between space-y-2">
    <h2 class="text-3xl font-bold tracking-tight">Hardware Diagnosis</h2>
</div>
        <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            <Card.Root>
                <Card.Header
                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                    <Card.Title class="text-sm font-medium">Memory Usage</Card.Title>
                </Card.Header>
                <Card.Content class="flex align-center justify-center">
                    <Mem />
                </Card.Content>
            </Card.Root>
            <Card.Root>
                <Card.Header
                    class="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                    <Card.Title class="text-sm font-medium">Temperature</Card.Title>
                </Card.Header>
                <Card.Content class="flex align-center justify-center">
                   <Temp />
                </Card.Content>
            </Card.Root>
            <Card2.Root class="col-span-1 overflow-hidden">
                <Card2.Header>
                    <Card2.Title>Specs</Card2.Title>
                </Card2.Header>
                <Card2.Content>
                    <Specs />
                </Card2.Content>
            </Card2.Root>
            
        </div>