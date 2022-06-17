<script lang="ts">
  import { getCellsStore, setCell } from '@scripts'
  import { ObjectTyped } from 'object-typed'

  const cells = getCellsStore()

  let activeTabName = ''

  setCell('tab1', 0, 0, { value: 'hmm...' })
  setCell('tab1', 0, 1, { value: '' })
  setCell('tab1', 0, 2, { value: '' })
  setCell('tab1', 0, 3, { value: '' })
  setCell('tab1', 0, 4, { value: '' })

  setCell('tab1', 1, 0, { value: '' })
  setCell('tab1', 1, 1, { value: '' })
  setCell('tab1', 1, 2, { value: '' })
  setCell('tab1', 1, 3, { value: '' })
  setCell('tab1', 1, 4, { value: '' })

  setCell('tab2', 0, 0, { value: '' })
  setCell('tab2', 0, 1, { value: '' })
  setCell('tab2', 0, 2, { value: '' })
  setCell('tab2', 0, 3, { value: '' })
  setCell('tab2', 0, 4, { value: '' })
  // ####################################################
  // ####################################################
  // ####################################################
  // ####################################################
  // ############### reactivity goes here ###############

  // a cell that reacts to another cell in the same tab
  $: $cells['tab1'][1][4].value = $cells['tab1'][0][0].value + 'aaa'

  // a cell that reacts to another cell in a different tab
  $: $cells['tab2'][0][0].value = $cells['tab1'][0][0].value + 'bbb'

  // ############### reactivity goes here ###############
  // ####################################################
  // ####################################################
  // ####################################################
  // ####################################################
</script>

{#each ObjectTyped.keys($cells) as tabName}
  <button on:click={() => (activeTabName = tabName)}>{tabName}</button>
{/each}

<hr />

{#each ObjectTyped.keys($cells) as tabName}
  {@const tab = $cells[tabName]}
  {#if activeTabName === tabName}
    {#each ObjectTyped.keys(tab) as x}
      {@const row = tab[x]}
      {#each ObjectTyped.keys(row) as y}
        <input type="text" style="width:100px" bind:value={$cells[tabName][x][y].value} />
      {/each}
      <br />
    {/each}
  {/if}
{/each}
