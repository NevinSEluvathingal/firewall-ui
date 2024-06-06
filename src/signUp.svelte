
<script lang="ts">
  import { onMount } from 'svelte';

  let username: string = '';
  let mail: string = '';
  let password: string = '';

  const handleSubmit = async (event: Event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    const formData = {
      username: username,
      mail: mail,
      password: password
    };

    try {
      // Make a POST request to the Go server running on port 5173
      const response = await fetch('http://192.168.1.9:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Handle successful response
      console.log('Success:', data);
      // Optionally, redirect or perform other actions based on the response
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }

    
  };

  // Example of using onMount if needed
  onMount(() => {
    console.log('Component mounted');
  });
</script>

<style>
  .form-container {
    background-color: transparent;
    border-radius: 8px;
    backdrop-filter:blur(5px);
    text-align:center;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width: 250px;
    margin: 0 auto; /* Center horizontally */
  
  }
  .universe {
   background-image: url('./space.jpg');
    background-size: cover;
    background-position: center;
     background-attachment: fixed;
     height:100vh;
     width:100vw;
  }
  .form-group {
       position: relative;
    margin: 30px 0;
    max-width: 250px;
    border-bottom: 2px solid #fff;

  }
  .form-group input {
    background-color: transparent;
    max-width: 250px;
    outline:none;
  }
  .form-group label {
       position: absolute;
    top: -11px;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.5s ease-in-out;

  }
  #h {
    text-align:center;
    font-size : 30px
  }
  .form-button {
    padding:10px;  
    font-size:15px; 
     background-color:rgb(1,1,1,0.7); 
     color:white;
      border-radius:5px;
      text-align:center;
  }
  .form-button:hover {
    padding:10px;
    font-size:15px;
    color:white;
    border-radius:5px;
    background-color:black;
    text-align:center;
  }
.form-container {
   filter: drop-shadow(0px 4px 8px rgba(1, 1, 1, 1));
}

</style>
<section class="universe">
<div class="form-container">
  <h2 id="h">Create</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="username" class="form-label">Username:</label>
      <input type="text" id="username" class="form-input" bind:value={username} >
    </div>
    <div class="form-group">
      <label for="mail" class="form-label">Email:</label>
      <input type="text" id="mail" class="form-input" bind:value={mail} >
    </div>
    <div class="form-group">
      <label for="password" class="form-label">Password:</label>
      <input type="password" id="password" class="form-input" bind:value={password} >
    </div>
    <div class="butto"> 
    <button type="submit" class="form-button">Sign Up</button>
    </div>
  </form>
</div>
</section>
