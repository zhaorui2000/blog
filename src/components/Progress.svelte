<script>
  import dayjs from "dayjs";

  export let endTime = dayjs().endOf("day");

  let value = 0;

  $: max = dayjs(endTime).diff(dayjs());

  setInterval(() => {
    value = max - dayjs(endTime).diff(dayjs());
  });
</script>

<progress class={"progress"} {value} {max} />
