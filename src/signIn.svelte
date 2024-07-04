<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Loader from "$lib/components/ui/loader/loader.svelte";
  import {Button} from "$lib/components/ui/button/index";
  import {Label} from "$lib/components/ui/label/index";
  import {Input} from "$lib/components/ui/input/index";
  import Invalid from "$lib/components/ui/invalid/invalid.svelte";
  import Ise from "$lib/components/ui/ise/ise.svelte";
    import { createNightowl } from '@bufferhead/nightowl'

    createNightowl({
        defaultMode: 'dark',
        toggleButtonMode: 'newState'
    })


  let isloading = false;
  let invalid = false;
  let ise = false;

  interface UserClaims {
    Mail: string;
    Usertype: string;
  }

  interface UserInfoResponse {
    userinfo: UserClaims;
  }

  let username: string = '';
  let password: string = '';
  let userType: string = '';
  let emailerror: string = '';

  const handleSubmit = async (event: Event) => {

    event.preventDefault();
 localStorage.setItem('name', username);
 window.location.href='/admin';
    const formData = {
      username: username,
      passwd: password,
    };
   
   
    try {
      isloading = true;
      ise = false;
      invalid = false;
      const response = await fetch('http://192.168.1.48:3333/account/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        isloading = false;
        const errordata = await response.json();
        throw new Error(errordata.message);
      }
      const data = await response.json();

      const token = data.Tokenstring;
      console.log(token);
      const userInfoResponse = await fetch('http://192.168.1.8:4000/getuser', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfoData: UserInfoResponse = await userInfoResponse.json();
      console.log('UserInfo Response:', userInfoData);
      const userinfo = userInfoData.userinfo;
      mail = userinfo.Mail;
      userType = userinfo.Usertype;
      localStorage.setItem("mail", mail);

      if (userinfo.Usertype == 'user') {
        window.location.href = '/Bar';
      } else {
        window.location.href = '/admin';
      }

    } catch (error) {
      console.error('Error:', error.message);
      
      if (error.message == "invalid") {
        invalid = true;
      } else {
        ise = true;
      }
    } finally {
      isloading = false;
    }
  };

  const validate = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test((email).toLowerCase());
  }

  onMount(() => {
    const isDisplayed = sessionStorage.getItem('loadershown');
    console.log('Component mounted');
    isloading = false;

    const loader = document.querySelector('.loader') as HTMLDivElement;

    if (isDisplayed !== 'true') {
      gsap.fromTo(
        '.loader',
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1,
          delay: 5,
          onComplete: () => {
            if (loader) {
              loader.style.display = 'none';
            }
            sessionStorage.setItem('loadershown', 'true');
          }
        }
      );
    } else {
      if (loader) {
        loader.style.display = 'none';
      }
    }
  });
</script>



<style>
   .form-container {
    border-radius: 8px;
    text-align: center;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 400px;
    margin: 0 auto; /* Center horizontally */
  } 
  
  .universe {
    background-image: url('./pxfuel.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: inherit;
    height: 100vh;
    width: 50vw;
  }





  .svg {
    stroke: white;
    stroke-width: 10px;
    fill-opacity: 0;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .svg svg {
    height: 200px;
    width: 200px;
    stroke-dasharray: 4500;
    animation: draw 5s ease-in;
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: 4500;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes brand {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .error {
    margin-top: -30px;
  }

  .error p {
    color: red;
  }

  .svg h3 {
    color: white;
    font-size: larger;
    font-family: "Rajdhani", sans-serif;
    font-weight: 300;
    font-style: normal;
    stroke-dasharray: 4500;
    animation: brand 4s ease-in;
  }

  .loader {
    position: absolute;
    align-items: center;
    top: 0;
    left: 0;
    background: linear-gradient(to right, rgb(72, 67, 67), rgb(43, 40, 40), rgb(22, 21, 21), black);
    height: 100%;
    width: 100%;
  }

  .dont {
    color: #3e3d3d;
  }

  .dont:hover {
    color: #000000;
  }
</style>



{#if isloading}
  <Loader />
{/if}
{#if invalid} 
  <Invalid />
{/if}
{#if ise} 
  <Ise />
{/if}
<section class="universe">
  <div class="form-container">
    <div class="flex flex-col space-y-5 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Username</Label>
          <Input
            id="username"
            placeholder="Name"
            type="name"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={username}
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={password}
          />
        </div>
        <Button type="submit">
          Sign In
        </Button>
      <div>
        <a href="./sign-up" class="dont"> Don't have an account </a>
      </div>
    </form>
  </div>
</section>

<div class="loader">
  <div class="svg">
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
    <h3>FortiGuard</h3>
  </div>
</div>