
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { scaleLinear } from "d3-scale";
	export { default as Bar } from "./bar.svelte";


	/*interface Bar {
		Jan: number;
		Feb: number;
		Mar: number;
		April: number;
		May: number;
		June: number;
		Jul: number;
		Aug: number;
		Sept: number;
		Oct: number;
		Nov: number;
		Dec:number;
	}

	interface BarInfo {
		BarDetails: Bar;
	}

	let barDetails: Bar | null = null;

	  const fetchBardetails = async () => {
		try {
			const email = localStorage.getItem("mail");
			if (!email) {
				throw new Error("Email not found in localStorage");
			}

			const response = await fetch(`http://192.168.1.8:4000/barinfo?email=${encodeURIComponent(email)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errordata = await response.json();
				throw new Error(errordata.message);
			}

			const data: BarInfo = await response.json();
			barDetails = data.BarDetails;
			console.log('Bar details:', barDetails);

		} catch (error) {
			console.error('Error:', error);
		}
	};

	onMount(() => {
		fetchBardetails();
		const interval = setInterval(fetchBardetails, 600000); 
		return () => {
			clearInterval(interval);
		} 
	});*/


	let data = [];


		data = [
			{ name: "Jan", total: 100},//barDetails.Jan },
			{ name: "Feb", total: 1000},//barDetails.Feb },
			{ name: "Mar", total: 800},//barDetails.Mar },
			{ name: "Apr", total: 200},//barDetails.April },
			{ name: "May", total: 535},//barDetails.May },
			{ name: "Jun", total: 600},//barDetails.June },
			{ name: "Jul", total: 250},//barDetails.Jul },
			{ name: "Aug", total: 2000},//barDetails.Aug },
			{ name: "Sep", total: 750},//barDetails.Sept },
			{ name: "Oct", total: 1575},//barDetails.Oct },
			{ name: "Nov", total: 10},//barDetails.Nov },
			{ name: "Dec", total: 507},//barDetails.Dec },
		];


	const yTicks = [0, 50, 100, 200];
	const padding = { top: 20, right: 15, bottom: 20, left: 45 };

	let width = 500;
	let height = 200;

	function formatMobile(tick: number | string) {
		return "'" + tick.toString().slice(-2);
	}

	let xTicks = [];
	$: if (data.length) {
		xTicks = data.map((d) => d.name);
	}

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="text-xs" transform="translate(0, {yScale(tick)})">
					<text
						stroke="none"
						font-size="12"
						orientation="left"
						width="60"
						height="310"
						x="57"
						y="-4"
						fill="#888888"
						text-anchor="end"><tspan x="36" dy="0.355em">{tick}Gb</tspan></text
					>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i)},{height})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width="531"
						height="30"
						x={barWidth / 2}
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 2} dy="0.71em"
							>{width > 380 ? point.name : formatMobile(point.name)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					class="bg-primary-foreground"
					x={xScale(i) + 2}
					y={yScale(point.total)}
					width={barWidth - 8}
					height={yScale(0) - yScale(point.total)}
					fill="currentColor"
					rx="4"
					ry="4"
				/>
			{/each}
		</g>
	</svg>
</div>


<style>
	.chart {
		width: 100%;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 350px;
	}

	rect {
		max-width: 51px;
	}
</style>
