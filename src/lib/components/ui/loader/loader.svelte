
<section class="loader">
         <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        d="M50,5 L20,20 L20,40 Q20,75 50,95 Q80,75 80,40 L80,20 Z"
        fill="#D4AF37"
        stroke-width="1"
        
      />
      </svg> 
</section>
<style>
    .loader {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(to right,rgb(72, 67, 67),rgb(43, 40, 40),rgb(22, 21, 21),black);
        z-index: 999;
    }
    .loader svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 200px;
        width: 200px;
        fill-opacity: 0;
        stroke-dasharray: 250;
        stroke: white;
        animation:draw 2s linear infinite;
    }
    @keyframes draw {
        0% {
            stroke-dashoffset: 250;
        }
        100% {
            stroke-dashoffset: 0 ;
        }
    }
</style>