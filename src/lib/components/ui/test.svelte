<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Chart } from 'chart.js/auto';
    export {default as Test} from './test.svelte';

    let chart;
    let ctx;
    let data = [];
    let updateInterval;
  
    function fetchData() {
      // Simulate fetching data from the backend
      let prev = data.length > 0 ? data[data.length - 1].y : 20;
  
      prev = Math.random() * 50;
  
      if (data.length >= 10) {
        data.shift();
      }
  
      // Update x values to be within the range 0-9
      data.forEach((point, index) => point.x = index);
      data.push({ x: data.length, y: prev });
  
      chart.update();
    }
  
    onMount(() => {
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              borderColor: 'black',
              borderWidth: 1,
              radius: 0,
              data: data,
            },
          ],
        },
        options: {
          animation: {
            x: {
              type: 'number',
              easing: 'easeOutQuad',
              duration: 0,
              from: NaN,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                  return 0;
                }
                ctx.xStarted = true;
                return ctx.index*20;
              }
            },
            y: {
              type: 'number',
              easing: 'easeOutQuad',
              duration: 0,
              from: 100, // Example static value, adjust as per your requirement
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index*20;
              }
            }
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: false,
          },
          scales: {
            x: {
              display: false, // Hide the x-axis
              type: 'linear',
              min: 0,
              max: 9,
              duration: 100,
            },
            y: {
              display: false, // Hide the y-axis
              duration: 100,
              min: 0,
              max: 50,
            },
          },
        },
      });
  
      updateInterval = setInterval(fetchData, 1000);
    });
  
    onDestroy(() => {
      clearInterval(updateInterval);
    });
</script>

<div class="chart-container">
  <canvas bind:this={ctx} width="300" height="100"></canvas>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
