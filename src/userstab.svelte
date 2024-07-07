<script lang="ts">
export { default as  Userstab} from "./userstab.svelte";
import {Button} from "$lib/registry/button/"
import {
		Search,
	} from "./dashboard/";
</script>
<div class="flex items-center space-x-2">
    <Search />
    <Button size="sm">
        Add
    </Button>
</div>