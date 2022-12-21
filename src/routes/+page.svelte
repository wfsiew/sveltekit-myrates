<script lang="ts">
	import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data: any;

  let selected = data.result[0];
  let rates:any[] = [];
  let isloading = false;

  onMount(() => {
    loadRates();
  });

  async function loadRates() {
    isloading = true;
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
    isloading = false;
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
    {#if isloading}
    <div class="text-center">
      <div role="status">
        <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    {:else}
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
    {/if}
  </table>
</div>