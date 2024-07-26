<script setup>
import { $showType } from '../_store';
import { axios } from '@blog/utils';
import { ref, onBeforeMount, computed } from 'vue';
import dayjs from 'dayjs';
import Card from './Card.vue';
import { Rate, Cell, CellGroup, Tag, DelButton, PrimaryButton } from '@blog/ui';
import { useStore } from '@nanostores/vue';
import { produce } from 'immer';
const weatherNowData = ref();
const showType = useStore($showType);
const showTypeList = computed(() => {
  return weatherNowData.value?.daily?.filter((item) => {
    return showType.value.includes(Number(item.type));
  });
});
const hideTypeList = computed(() => {
  return weatherNowData.value?.daily?.filter((item) => {
    return !showType.value.includes(Number(item.type));
  });
});
const handleDelType = function (type) {
  $showType.set(
    produce($showType.get(), (draft) => {
      console.log(draft, type, draft.indexOf(type));
      draft.splice(draft.indexOf(type), 1);
    }),
  );
};
const handleShowType = function (type) {
  $showType.set(
    produce($showType.get(), (draft) => {
      draft.push(type);
    }),
  );
};
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

  weatherNowData.value = {
    ...now,
    daily: daily.map((item, index) => ({ ...item, count: [3, 4, 7, 3, 5, 5, 5, 7, 4, 5, 4, 5, 8, 6, 5, 5][index] })),
  };
});
</script>
<template>
  <div v-if="weatherNowData" class="grid h-full gap-1" style="grid-template-rows: min-content 1fr">
    <Card>
      <template #title>实时天气</template>
      <div>地址</div>
      <div>乐陵</div>
      <div>数据观测时间</div>
      <div>
        <Tag>{{ dayjs(weatherNowData?.obsTime).format('HH:mm') }}</Tag>
      </div>
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
      <Cell v-for="{ name, category, level, text, count, type } of showTypeList">
        <template #title
          ><Tag type="primary">{{ name }}</Tag></template
        >
        <div>
          <Tag>{{ category }}</Tag>
        </div>
        <div>{{ text }}</div>
        <template #operate>
          <Rate :modelValue="Number(level)" :count="count"></Rate>
        </template>
        <template #left>
          <DelButton class="h-full" @click="() => handleDelType(Number(type))">删除</DelButton>
        </template>
      </Cell>
      <Cell v-for="{ name, type } of hideTypeList">
        <template #title
          ><Tag>{{ name }}</Tag></template
        >
        <template #right>
          <PrimaryButton class="h-full" @click="handleShowType(Number(type))">展示</PrimaryButton>
        </template>
      </Cell>
    </CellGroup>
  </div>
  <div v-if="!weatherNowData">天气数据加载中……</div>
</template>
<style></style>
