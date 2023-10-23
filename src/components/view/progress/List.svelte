<script>
  import Item from './Item.svelte';
  import { list } from '../../../store/listStore.js';
  import { produce } from 'immer';
  import moment from 'moment';
  const handleDone = function (i) {
    list.set(
      produce($list, (draft) => {
        let deletedItem = draft.splice(i, 1)[0];
        let hour = (moment().get('hour') - deletedItem.startTime[0] + 24) % 24;
        let minute = (moment().get('minute') - deletedItem.startTime[0] + 60) % 60;
        let secode = (moment().get('secode') - deletedItem.startTime[0] + 60) % 60;
        for (; i < draft.length; ++i) {
          const { startTime, endTime } = draft[i];
          draft[i].startTime = [startTime[0] - hour, startTime[1] - minute, startTime[2] - secode];
          draft[i].endTime = [endTime[0] - hour, endTime[1] - minute, endTime[2] - secode];
        }
      }),
    );
  };
</script>

<div class="h-full overflow-y-auto">
  <Item startTime={moment().startOf('day')} endTime={moment().endOf('day')} />
  {#each $list as item, i}
    <Item
      label={item.label}
      on:done={() => handleDone(i)}
      startTime={moment().hour(item.startTime[0]).minute(item.startTime[1]).second(item.startTime[2])}
      endTime={moment().hour(item.endTime[0]).minute(item.endTime[1]).second(item.endTime[2])}
    />
  {/each}
</div>
