<script lang="ts">
import { UserInfo } from "./model/UserInfo";
import FormInfo from "./components/FormInfo.svelte";
import Results from "./components/Results.svelte";

let userInfo: UserInfo = new UserInfo();
</script>

<div class="app">

	<h1>How long do you need to work to afford that <input bind:value={userInfo.thingName} />?</h1>
	
	<FormInfo bind:userInfo={userInfo} />
	
	<Results {userInfo} />
	
	<p>
		<a href="https://github.com/vianneyfaivre/timost">Built with Svelte and Typescript</a>
	</p>
</div>
