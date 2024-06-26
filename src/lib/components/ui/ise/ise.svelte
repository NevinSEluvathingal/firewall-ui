<script lang="ts">
    import {gsap} from 'gsap';
    import { onMount } from 'svelte';

    onMount(() => {
     gsap.fromTo(
    '.message',
    { opacity: 1 },
    {
      opacity: 0,
      duration: 1,
      delay: 3,
      onComplete: () => {
        const mssg = document.querySelector('.message') as HTMLDivElement;
        if (mssg) {
          mssg.style.display = 'none';
        }
      }
    }
  );
});
</script>

<div class="message">
    <h3>oops !! something went wrong..please try again later</h3>
</div>

<style>
    .message {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 30vw;
        display: flex;
        justify-content: center;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        align-items: center;
        background-color: black;
        color: white;
    }
</style>