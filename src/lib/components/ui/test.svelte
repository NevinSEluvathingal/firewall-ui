<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Chart } from 'chart.js/auto';
  import { deviceno } from "../../../store";
  export { default as Test } from './test.svelte';
  import { downstreamMap } from '../../../store';
  let chart;
  let ctx;
  let data = []; 
  let updateInterval;
  let strEgr = '';

  let totalBytes = 0;

  function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(2)} ${units[i]}`;
}


function updateChart(){
   totalBytes = 0;
    $downstreamMap.forEach((value) => {
      totalBytes += value.bytes;
    });
        let speedValue = totalBytes;
        strEgr = formatBytes(totalBytes);
        const prev = speedValue;

    
        if (prev > chart.options.scales.y.max) {
          chart.options.scales.y.max = prev + 1000; 
        }

        if (data.length >= 50) {
          data.shift();
        }

        data.forEach((point, index) => point.x = index);
        data.push({ x: data.length, y: prev });

        chart.data.datasets[0].label = strEgr;

        chart.update()
}
   ;

  onMount(() => {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: strEgr,
            borderColor: 'red',
            borderWidth: 2,
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
              return ctx.index * 20;
            }
          },
          y: {
            type: 'number',
            easing: 'easeOutQuad',
            duration: 0,
            from: 100,
            delay(ctx) {
              if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
              }
              ctx.yStarted = true;
              return ctx.index * 20;
            }
          }
        },
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            display: false, 
            type: 'linear',
            min: 0,
            max: 49,
            duration: 100,
          },
          y: {
            display: false,
            duration: 100,
            min: 0,
            max: 10000,
          },
        },
      },
    });
     updateInterval = setInterval(updateChart, 1000);
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
