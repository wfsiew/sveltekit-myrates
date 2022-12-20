<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data: any;

  let selected = data.result[0];
  let rates:any[] = [];

  onMount(() => {
    loadRates();
  });

  async function loadRates() {
    const res = await fetch('https://fx.tajmuhabath.com.my/rbapi/WebRbService.svc/json/getdailyratesapi/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        branch_id: selected.BranchID,
        pass_word: "Password@RB1234",
        user_name: "rateboard"
      })
    });
    const { dailyBoardRates } = await res.json();
    rates = dailyBoardRates;
    console.log(dailyBoardRates)
  }
</script>

<select bind:value={selected} on:change={loadRates} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option>Select a Branch</option>
{#each data.result as b}
  <option value={b}>{b.name}</option>
{/each}
</select>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="py-3 px-6">Flag</th>
        <th scope="col" class="py-3 px-6">Unit</th>
        <th scope="col" class="py-3 px-6">Code</th>
        <th scope="col" class="py-3 px-6">Currency</th>
        <th scope="col" class="py-3 px-6">We Buy</th>
        <th scope="col" class="py-3 px-6">We Sell</th>
        <th scope="col" class="py-3 px-6">Last Updated</th>
      </tr>
    </thead>
    <tbody>
      {#each rates as rate}
        <tr class="odd:bg-white even:bg-gray-50 border-b dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td><img src={`https://www.tajmuhabath.com.my/web/images/Flags/${rate.CurrCode}.png`} alt={rate.CurrCode}></td>
          <td class="py-4 px-6">{rate.CurrUOM}</td>
          <td class="py-4 px-6">{rate.CurrCode}</td>
          <td class="py-4 px-6">{rate.CurrDesc}</td>
          <td class="py-4 px-6">{rate.BuyRate}</td>
          <td class="py-4 px-6">{rate.SellRate}</td>
          <td class="py-4 px-6">{rate.UpdatedOn}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>