<script setup>
import { axios } from '@blog/utils';
import { ref, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
const weatherNowData = ref();
onBeforeMount(async () => {
  const { data } = await axios.get(
    'https://devapi.qweather.com/v7/weather/now?key=6e4385bb47a24cccad7558e07bc45fa2&location=101120406',
  );
  weatherNowData.value = data;
  console.log(weatherNowData.value);
});
</script>
<template>
  <div v-if="weatherNowData" class="grid text-nowrap gap-4" style="grid-template-columns: min-content 1fr">
    <div>地点</div>
    <div>乐陵</div>
    <div>数据观测时间</div>
    <div>{{ dayjs(weatherNowData?.now?.obsTime).format('【MM-DD】HH:mm:ss') }}</div>
    <div>温度</div>
    <div>{{ weatherNowData?.now?.temp }}</div>
    <div>体感温度</div>
    <div>{{ weatherNowData?.now?.feelsLike }}</div>
    <div>天气状况</div>
    <div>{{ weatherNowData?.now?.text }}</div>
    <div>风向</div>
    <div>{{ weatherNowData?.now?.windDir }}</div>
    <div>风力等级</div>
    <div>{{ weatherNowData?.now?.windScale }}</div>
    <div>风速</div>
    <div>{{ weatherNowData?.now?.windSpeed }}</div>
  </div>
  <div v-else>天气数据加载中……</div>
</template>
<style></style>
