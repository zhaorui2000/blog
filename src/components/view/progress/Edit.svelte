<script>
  import TimePicker from '../../base/TimePicker.svelte';
  import { list } from '../../../store/listStore.js';
  import { produce } from 'immer';

  let startHour = 0;
  let startMinute = 0;
  let startSecond = 0;
  let durationHour = 0;
  let durationMinute = 0;
  let durationSecond = 0;
  let label = '';

  const handleAdd = () => {
    list.set(
      produce($list, (draft) => {
        draft.push({
          label,
          startTime: [startHour, startMinute, startSecond],
          endTime: [startHour + durationHour, startMinute + durationMinute, startSecond + durationSecond],
        });
        draft.sort((a, b) => {
          return (
            a.startTime[0] * 3600 +
            a.startTime[1] * 60 +
            a.startTime[2] -
            b.startTime[0] * 3600 -
            b.startTime[1] * 60 -
            b.startTime[2]
          );
        });
      }),
    );
  };
  const handleClickLast = function () {
    startHour = $list.at(-1).endTime[0];
    startMinute = $list.at(-1).endTime[1];
    startSecond = $list.at(-1).endTime[2];
  };
</script>

<div class="grid gap-2 bg-base-200 w-full" style="grid-template-columns: 1fr 1fr">
  <div class="form-control">
    <div class="label">
      <span class="label-text">标签名</span>
      <span class="label-text-alt" />
    </div>
    <input bind:value={label} class="input input-bordered w-full" placeholder="标签名" type="text" />
  </div>
  <div class="form-control">
    <div class="label">
      <span class="label-text">开始时间</span>
      <span class="label-text-alt" />
    </div>
    <div class="join">
      <TimePicker bind:hour={startHour} bind:minute={startMinute} bind:second={startSecond} />
      <button class="btn btn-primary inline-block" on:click={handleClickLast}>最后</button>
    </div>
  </div>
  <div class="form-control">
    <div class="label">
      <span class="label-text">持续时间</span>
      <span class="label-text-alt" />
    </div>
    <TimePicker bind:hour={durationHour} bind:minute={durationMinute} bind:second={durationSecond} />
  </div>
  <button class="btn btn-primary" style="grid-column: 1/3;" on:click={handleAdd}
    ><span class="icon-[material-symbols--add]" />新增
  </button>
</div>
