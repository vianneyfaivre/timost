<script lang="ts">
import type { UserInfo } from "../model/UserInfo";
import { Duration, WEEKS_PER_MONTH } from "../model/Duration";

export let userInfo: UserInfo;

let result: Duration;
let hourlyIncome: number;
let showResults: boolean = false;

$: {
    const WORK_HOURS_PER_MONTH: number = userInfo.dailyWorkHours * 7 * WEEKS_PER_MONTH;

    hourlyIncome = +(userInfo.monthlyIncome / WORK_HOURS_PER_MONTH).toFixed(2);
    
    const hours = userInfo.itemCost / hourlyIncome;
    
    result = new Duration(hours, userInfo.dailyWorkHours);
    showResults = userInfo.monthlyIncome > 0 && userInfo.itemCost > 0;
}

</script>

{#if showResults === true}
<h2>Results</h2>

    {#if result.valid}
        <p>For you, that {userInfo.thingName} is worth {result.value} {result.unit} of work.</p>
        <p>You earn ${hourlyIncome} per hour</p>
    {:else}
        <p>Unable to calculate the results. Please review the information you provided.</p>
    {/if}
{/if}