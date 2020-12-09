<script lang="ts">
import { Duration, DurationUnit } from "./model/Duration";

const WORK_HOURS_PER_WEEK: number = 37.5;
const WORK_DAYS_PER_WEEK: number = 5;
const WEEKS_PER_MONTH: number = +(365 / 7 / 12).toFixed(1);

const WORK_HOURS_PER_MONTH: number = WORK_HOURS_PER_WEEK * WEEKS_PER_MONTH;
const WORK_HOURS_PER_DAY: number = WORK_HOURS_PER_WEEK / WORK_DAYS_PER_WEEK;

// input
let thingName: string = 'thing';
let monthlyIncome: number = 0;
let itemCost: number = 0;

// output
let result: Duration;
let hourlyIncome: number;
let showResults: boolean = false;

// Bound elements
$: {
	hourlyIncome = +(monthlyIncome / WORK_HOURS_PER_MONTH).toFixed(2);
	const hours = itemCost / hourlyIncome;
	result = new Duration(hours, WORK_HOURS_PER_DAY);
	showResults = monthlyIncome > 0 && itemCost > 0;
}

</script>

<style>
input[type=number] {
	width: 7em;
}
</style>

<h1>How long do you need to work to afford that {thingName}?</h1>

<h2>Your information</h2>
<p>
	<label for=monthlyIncome>What is your monthly net income?</label>
	<input name=monthlyIncome bind:value={monthlyIncome} type=number min=1 step=100 /> $
</p>

<p>
	<label for=itemCost>How much does that {thingName} cost?</label>
	<input bind:value={itemCost} type=number min=1 step=100 /> $
</p>

{#if showResults === true}
	<h2>Results</h2>

	{#if result.valid}
		<p>That {thingName} is worth {result.value} {result.unit} of your work time.</p>
		<p>You earn ${hourlyIncome} per hour</p>
	{:else}
		<p>Unable to calculate the results. Please review the information you provided.</p>
	{/if}
{/if}

<h2>Assumptions</h2>
<ul>
	<li>You work {WORK_HOURS_PER_DAY} hours per day, {WORK_DAYS_PER_WEEK} days a week so that's {WORK_HOURS_PER_WEEK} hours per week</li> 
	<li>There are {WEEKS_PER_MONTH} weeks in a month</li>
</ul> 

<p>
	<a href="https://github.com/vianneyfaivre/timost">Built with Svelte and Typescript</a>
</p>