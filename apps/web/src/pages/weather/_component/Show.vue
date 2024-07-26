<script setup>
import { axios } from '@blog/utils';
import { ref, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import Card from './Card.vue';
import { Rate, Cell, CellGroup, Tag } from '@blog/ui';
const weatherNowData = ref();
onBeforeMount(async () => {
  const {
    data: { now },
  } = await axios.get(
    'https://devapi.qweather.com/v7/weather/now?key=6e4385bb47a24cccad7558e07bc45fa2&location=101120406',
  );
  const {
    data: { daily },
  } = await axios.get(
    'https://devapi.qweather.com/v7/indices/1d?key=6e4385bb47a24cccad7558e07bc45fa2&location=101120406&type=0',
  );
  weatherNowData.value = { ...now, daily };
  console.log(weatherNowData.value);
});
</script>
<template>
  <div v-if="weatherNowData" class="grid h-full gap-1" style="grid-template-rows: min-content 1fr">
    <Card>
      <template #title>实时天气</template>
      <div>地址</div>
      <div>乐陵</div>
      <div>数据观测时间</div>
      <div>{{ dayjs(weatherNowData?.obsTime).format('【MM-DD】HH:mm:ss') }}</div>
      <div>温度</div>
      <div>{{ weatherNowData?.temp }}</div>
      <div>体感温度</div>
      <div>{{ weatherNowData?.feelsLike }}</div>
      <div>天气状况</div>
      <div class="flex gap-2"><i :class="`qi-${weatherNowData?.icon}`"></i>{{ weatherNowData?.text }}</div>
      <div>风向</div>
      <div>{{ weatherNowData?.windDir }}</div>
      <div>风力等级</div>
      <div>{{ weatherNowData?.windScale }}</div>
      <div>风速</div>
      <div class="flex gap-2">
        <span>{{ weatherNowData?.windSpeed }}</span>
        <span>公里/小时</span>
      </div>
    </Card>
    <CellGroup>
      <Cell v-for="{ name, category, level, text } of weatherNowData.daily">
        <template #title
          ><Tag>{{ name }}</Tag></template
        >
        {{ text }}
        <template #operate>
          <Rate :modelValue="Number(level)"></Rate>
        </template>
      </Cell>
    </CellGroup>
  </div>
  <div v-if="!weatherNowData">天气数据加载中……</div>
</template>
<style></style>
