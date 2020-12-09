<script lang="ts">
import type { UserInfo } from "../model/UserInfo";

export let userInfo: UserInfo;
</script>

<div class="forminfo">
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
</div>