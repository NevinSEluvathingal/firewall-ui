<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { currentPage } from "../store";
	let className: string | undefined | null = undefined;
	export { className as class };


	function navigate(page) {
    currentPage.set(page);
  }
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	<a href="#top" on:click={() => navigate('overview')} class="text-sm font-medium transition-colors hover:text-primary">Overview</a>
	<a href="#top" on:click={() => navigate('users')} class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Rules</a>
	<a href="#top" on:click={() => navigate('rules')} class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Hardware</a>
</nav>
