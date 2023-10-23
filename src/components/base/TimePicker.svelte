<script>
  import clsx from 'clsx';
  import { clickOutside } from './../../action/clickOutside.js';
  import { createEventDispatcher } from 'svelte';

  const itemStyle = clsx(
    'w-full',
    'h-6',
    'hover:bg-primary',
    'hover:text-primary-content',
    'text-center',
    'rounded',
    'cursor-pointer',
  );
  export let hour = 0;
  export let minute = 0;
  export let second = 0;
  export let isUp = false;

  let isShow = false;
  const dispatch = createEventDispatcher();

  $: {
    dispatch('change', { hour, minute, second });
  }

  const handleChange = function (type, value, e) {
    e.target.scrollIntoView({ behavior: 'smooth' });
    if (type === 'hour') {
      hour = value;
    }
    if (type === 'minute') {
      minute = value;
    }
    if (type === 'second') {
      second = value;
    }
  };
  const handleClickOutside = function () {
    isShow = false;
  };
  const handleClick = function (e) {
    const { y } = e.target.getBoundingClientRect();
    isUp = window.innerHeight - y < 400;
    isShow = true;
  };
</script>

<div class="inline-block w-full relative">
  <input
    class="input input-bordered w-full"
    on:click={handleClick}
    placeholder="选择时间"
    readonly
    type="text"
    value={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second
      .toString()
      .padStart(2, '0')}`}
  />
  {#if isShow}
    <div
      use:clickOutside
      on:click-outside={handleClickOutside}
      class={clsx('grid h-80 shadow-md select-none bg-base-100 absolute', { 'bottom-[52px]': isUp })}
      style="grid-template-columns: 1fr 1fr 1fr"
    >
      <div class="overflow-auto h-full w-full">
        {#each Array(24).keys() as item}
          <button
            on:click={(e) => handleChange('hour', item, e)}
            class={clsx(itemStyle, { 'bg-primary-focus text-primary-content': hour === item })}
          >
            {item}
          </button>
        {/each}
        <div class="h-[18.5rem]" />
      </div>
      <div class="overflow-auto h-full">
        {#each Array(60).keys() as item}
          <button
            on:click={(e) => handleChange('minute', item, e)}
            class={clsx(itemStyle, { 'bg-primary-focus text-primary-content': minute === item })}
          >
            {item}
          </button>
        {/each}
        <div class="h-[18.5rem]" />
      </div>
      <div class="overflow-auto h-full">
        {#each Array(60).keys() as item}
          <button
            on:click={(e) => handleChange('second', item, e)}
            class={clsx(itemStyle, { 'bg-primary-focus text-primary-content': second === item })}
          >
            {item}
          </button>
        {/each}
        <div class="h-[18.5rem]" />
      </div>
    </div>
  {/if}
</div>

<style>
</style>
