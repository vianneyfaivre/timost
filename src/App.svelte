<script lang="ts">
import { Duration, WEEKS_PER_MONTH } from "./model/Duration";
import { UserInfo } from "./model/UserInfo";

// input
const userInfo: UserInfo = new UserInfo();

// output
let result: Duration;
let hourlyIncome: number;
let showResults: boolean = false;

// Bound elements
$: {
	const WORK_HOURS_PER_MONTH: number = userInfo.dailyWorkHours * 7 * WEEKS_PER_MONTH;

	hourlyIncome = +(userInfo.monthlyIncome / WORK_HOURS_PER_MONTH).toFixed(2);
	
	const hours = userInfo.itemCost / hourlyIncome;
	
	result = new Duration(hours, userInfo.dailyWorkHours);
	showResults = userInfo.monthlyIncome > 0 && userInfo.itemCost > 0;
}

</script>

<style>
input[type=number] {
	width: 7em;
}
</style>

<h1>How long do you need to work to afford that <input bind:value={userInfo.thingName} />?</h1>

<h2>Your information</h2>

<p>
	<label for=dailyWorkHours>How many hours do you work in a day?</label>
	<input name=dailyWorkHours bind:value={userInfo.dailyWorkHours} type=number min=1 max=24 /> hours
</p>

<p>
	<label for=weeklyWorkDays>How many days do you work in a week?</label>
	<input name=weeklyWorkDays bind:value={userInfo.weeklyWorkDays} type=number min=1 max=7 /> days
</p>

<p>
	<label for=monthlyIncome>What is your monthly net income?</label>
	<input name=monthlyIncome bind:value={userInfo.monthlyIncome} type=number min=1 step=100 /> $
</p>

<p>
	<label for=itemCost>How much does that {userInfo.thingName} cost?</label>
	<input bind:value={userInfo.itemCost} type=number min=1 step=100 /> $
</p>

{#if showResults === true}
	<h2>Results</h2>

	{#if result.valid}
		<p>For you, that {userInfo.thingName} is worth {result.value} {result.unit} of your work time.</p>
		<p>You earn ${hourlyIncome} per hour</p>
	{:else}
		<p>Unable to calculate the results. Please review the information you provided.</p>
	{/if}
{/if}

<p>
	<a href="https://github.com/vianneyfaivre/timost">Built with Svelte and Typescript</a>
</p>