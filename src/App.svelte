<script lang="ts">
	const WORK_HOURS_PER_WEEK: number = 37.5;
	const WORK_DAYS_PER_WEEK: number = 5;
	const WEEKS_PER_MONTH: number = 4;

	const WORK_HOURS_PER_MONTH: number = WORK_HOURS_PER_WEEK * WEEKS_PER_MONTH;
	const WORK_HOURS_PER_DAY: number = WORK_HOURS_PER_WEEK / WORK_DAYS_PER_WEEK;

	let thingName: string = 'thing';
	let monthlyIncome: number = 0;
	let itemCost: number = 0;
	let result: Duration;
	let hourlyIncome: number;
	let init: boolean = false;

	class Duration {

		value: number;
		unit: DurationUnit;
		valid: boolean;
	}

	enum DurationUnit {
		SECONDS = "seconds",
		MINUTES = "minutes",
		HOURS = "hours",
		DAYS = "days",
		MONTHS = "months",
		YEARS = "years"
	}

	// TODO: Move to Duration#constructor
	function getDuration(hours: number): Duration {
		let value: number;
		let unit: DurationUnit;

		// Seconds or minutes
		if(hours <= 1) {

			const minutes: number = hours * 60;

			if(+(minutes.toFixed(0)) > 0) {
				value = Math.ceil(minutes);
				unit = DurationUnit.MINUTES;
			} else {
				value = Math.ceil(minutes * 60);
				unit = DurationUnit.SECONDS;
			}
		}
		// Hours
		else if (hours < WORK_HOURS_PER_DAY) {
			value = Math.ceil(hours)
			unit = DurationUnit.HOURS;
		}
		// Days, months or years
		else {

			const days = +(hours / WORK_HOURS_PER_DAY).toFixed(1);

			// Days
			if(days <= 30) {

				value = days;
				unit = DurationUnit.DAYS;
			} 
			// Months
			else {

				value = +(days / 30).toFixed(2);
				unit = DurationUnit.MONTHS;
			}
		}

		return {
			value: value,
			unit: unit,
			valid: value > 0 && value != Infinity
		};
	}

	$: {
		hourlyIncome = +(monthlyIncome / WORK_HOURS_PER_MONTH).toFixed(2);
		const hours = itemCost / hourlyIncome;
		result = getDuration(hours);
		init = monthlyIncome > 0 && itemCost > 0;
	}

</script>

<style>
	input[type=number] {
		width: 7em;
	}
</style>

<h1>How long do you need to work to afford that {thingName}?</h1>
<p>
	<label for=monthlyIncome>What is your monthly net income?</label>
	<input name=monthlyIncome bind:value={monthlyIncome} type=number min=1 step=100 /> $
</p>

<p>
	<label for=itemCost>How much does that {thingName} cost?</label>
	<input bind:value={itemCost} type=number min=1 step=100 /> $
</p>

{#if init === true}
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