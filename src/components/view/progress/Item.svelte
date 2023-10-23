<script>
  import Progress from '../../base/TimeProgress.svelte';
  import clsx from 'clsx';
  import moment from 'moment';
  import { createEventDispatcher } from 'svelte';

  export let label = '';
  export let startTime;
  export let endTime;

  const dispatch = createEventDispatcher();

  function handleClickDone() {
    dispatch('done');
  }
</script>

<div class="border py-2 px-6 flex gap-4 items-center">
  <Progress {endTime} {startTime}>
    <div slot="label">
      <span class={clsx('badge', 'badge-outline', { 'badge-success': startTime.diff(moment(), 'seconds') < 0 })}
        >{startTime.format('HH:mm:ss')}</span
      >
      <span>{label}</span>
    </div>
  </Progress>
  <button class="btn btn-primary" on:click={handleClickDone}><span class="icon-[material-symbols--done]" />完成</button>
</div>
