<script>
  import moment from 'moment';
  import clsx from 'clsx';

  export let endTime = moment().endOf('day');
  export let startTime = moment().startOf('day');
  export let label = '';

  let value = 0;
  const oneDaySecond = moment().endOf('day').diff(moment().startOf('day'), 'second') + 1;

  $: max = ((moment(endTime).diff(moment(startTime), 'second') + oneDaySecond) % oneDaySecond) + 1;
  $: percentage = ((value / max) * 100).toFixed(2);
  setInterval(() => {
    value = (moment().diff(moment(startTime), 'second') + oneDaySecond) % oneDaySecond;
    if (value > max) {
      value = 0;
    }
  });
</script>

<div class="form-control w-full">
  <label class="label">
    <span class="label-text"><slot name="top-left">{label}</slot></span>
    <span class="label-text-alt"><slot name="top-right">{percentage}</slot></span>
  </label>
  <progress
    class={clsx('progress h-3', {
      'progress-info': percentage <= 33.33,
      'progress-warning': percentage < 66.66 && percentage > 33.33,
      'progress-error': percentage >= 66.66,
    })}
    {max}
    {value}
  />
  <label class="label">
    <span class="label-text-alt badge badge-primary text-primary-content"
      ><slot name="bottom-left">{moment(startTime).format('HH:mm:ss')}</slot></span
    >
    <span class="label-text-alt badge badge-success text-success-content"
      ><slot name="bottom-right">{moment(endTime).format('HH:mm:ss')}</slot></span
    >
  </label>
</div>
