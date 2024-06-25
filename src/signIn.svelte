<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Loader from "$lib/components/ui/loader/loader.svelte";
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
  let mail: string = '';
  let password: string = '';
  let userType: string = '';
  let emailerror: string = '';

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!validate(mail)) {
      console.log(mail);
      emailerror = 'Please enter a valid email';
      return;
    } else {
      emailerror = '';
    }

    const formData = {
      username: username,
      mail: mail,
      password: password
    };
    localStorage.setItem('name', username);

    try {
      isloading = true;
      ise = false;
      invalid = false;
      const response = await fetch('http://192.168.1.8:4000/signin', {
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

      const token = data.token;

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
    background-color: white;
    border-radius: 8px;
    backdrop-filter: blur(5px);
    text-align: center;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 250px;
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
  .form-group {
    position: relative;
    margin: 30px 0;
    max-width: 250px;
    border-bottom: 2px solid #000000;
  }
  .form-group input {
    background-color: transparent;
    max-width: 400px;
    outline: auto;
  }
  .form-group label {
    position: absolute;
    top: -11px;
    left: 5px;
    transform: translateY(-50%);
    color: #000000;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.5s ease-in-out;
  }
  #h {
    text-align: center;
    font-size: 30px;
  }
  .form-button {
    padding: 10px;
    font-size: 15px;
    background-color: rgba(49, 48, 48, 0.7);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    text-align: center;
  }
  .form-button:hover {
    padding: 10px;
    font-size: 15px;
    color: rgb(255, 255, 255);
    border-radius: 5px;
    background-color: rgb(0, 0, 0);
    text-align: center;
  }
  .form-container {
    filter: drop-shadow(0px 4px 8px rgba(1, 1, 1, 1));
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
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 0 rgb(255, 255, 255) inset;
    box-shadow: none;
    -webkit-text-fill-color: black; 
    background-color: white;
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
    <h2 id="h">Sign in</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="username" class="form-label">Username:</label>
        <input type="text" id="username" class="form-input" bind:value={username} required>
      </div>
      <div class="form-group">
        <label for="mail" class="form-label">Email:</label>
        <input type="text" id="mail" class="form-input" bind:value={mail} required>
      </div>
      {#if emailerror} 
      <div class="error"><p>{emailerror}</p></div>
      {/if}
      <div class="form-group">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" class="form-input" bind:value={password} required>
      </div>
      <div class="butto">
        <button type="submit" class="form-button">Sign In</button>
      </div>
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
