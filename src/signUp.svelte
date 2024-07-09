
<script lang="ts">
  import { onMount } from 'svelte';
  import Loader from "$lib/components/ui/loader/loader.svelte";
  import Scs from "$lib/components/ui/success/success.svelte";
  import {Button} from "$lib/components/ui/button/index";
  import {Label} from "$lib/components/ui/label/index";
  import {Input} from "$lib/components/ui/input/index";
  import Exist from "$lib/components/ui/exist/exist.svelte";
  import { LogIn } from 'lucide-svelte';
  import { createNightowl } from '@bufferhead/nightowl'

createNightowl({
    defaultMode: 'dark',
    toggleButtonMode: 'newState'
})

  let isloading=false;
  let success=false;
  let exist=false;
  

  let username: string = '';
  let firstname: string = '';
  let lastname: string = '';
  let mail: string = '';
  let password: string = '';
  let emailerror: string= '';

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if(!validate(mail)) {
      console.log(mail)
      emailerror='please enter valid email';
      return;
    }
    else {
      emailerror='';
    }

    // Get form data
    const formData = {
      username: username,
      Email: mail,
      passwd: password,
      firstname:firstname,
      lastname:lastname,
    };

    try {
      isloading=true;
      exist=false;
      const response = await fetch('http://192.168.1.1:3333/account/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errmes=await response.json();
        throw new Error(errmes.message);
      }

      const data = await response.json();
 
      console.log('Success:', data);
    success=true;
    setTimeout(()=>{
      window.location.href='/sign-in'
    },4000);
    } catch (error) {
        console.error('Error:', error.message);
        if(error.message=="existing"){
          exist=true;
        }
    }
  
    isloading=false;
  };
  const validate=(email:string):boolean =>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test((email).toLowerCase());  
  }

  function goToSignIn(){
    window.location.href="./sign-in"
  }

 
  onMount(() => {
    console.log('Component mounted');
    isloading=false;
    success=false;
  });
</script>

<style>
  .form-container {
    background-color: white;
    border-radius: 8px;
    text-align:center;
    padding: 20px;
    position:absolute;
    top:50%;
    left:75%;
    transform:translate(-50%,-50%);
    width: 400px;
    margin: 0 auto; /* Center horizontally */
  
  }
  .universe {
   background-image: url('./pxfuel.jpg');
    background-size: cover;
    background-position: center;
     background-attachment: inherit;
     height:100vh;
     width:50vw;
  }
.error {
  margin-top: -30px;
}
.error p {
  color: red;
}
</style>

{#if isloading}
  <Loader />
{/if}
{#if success}
  <Scs />
{/if}
{#if exist} 
  <Exist />
{/if}
<section class="universe">
  <div class="form-container">
    <div class="flex flex-col space-y-5 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Username</Label>
          <Input
            id="username"
            placeholder="xyz"
            type="name"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={username}
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autocapitalize="none"
            autocomplete="email"
            autocorrect="off"
            bind:value={mail}
          />
        </div>
        {#if emailerror} 
        <div class="error"><p>{emailerror}</p></div>
        {/if}
        <div class="grid gap-1">
          <Label class="sr-only" for="password">Password</Label>
          <Input
            id="password"
            placeholder=""
            type="password"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={password}
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="firstname">firstname</Label>
          <Input
            id="firstname"
            placeholder="firstname"
            type="name"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={firstname}
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="lastname">lastname</Label>
          <Input
            id="lastname"
            placeholder="lastname"
            type="name"
            autocapitalize="none"
            autocomplete="none"
            autocorrect="off"
            bind:value={lastname}
          />
        </div>
        <Button type="submit">
          Sign Up
        </Button>
        <Button on:click={goToSignIn}>
          LogIn
        </Button>
    </form>
  </div>
</section>

