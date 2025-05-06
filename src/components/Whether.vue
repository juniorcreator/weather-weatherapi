<script setup lang="ts">
import { computed, onUpdated, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useWhetherStore } from '@/stores/whether.js';
import { formatDate } from '@/utils/formatDate.js';
import WeatherPerDay from '@/components/WeatherPerDay.vue';
import WeatherIcon from '@/components/UI/WeatherIcon.vue';
import { formatLocalTime } from '@/utils/getLocalTime.js';
import SunDetails from '@/components/SunDetails.vue';

const { state } = useWhetherStore();
const route = useRoute();

const index = computed(() => {
  const param = route.params.index;
  const idx = state.dayOfWeek.lastIndexOf(param);
  return idx !== -1 ? idx : 0;
});

console.log(route.params.index, ' route.params.index', typeof route.params.index);

// Выбранный прогноз на день
// const selectedItem = computed(() =>
//   state.dataDaily.length ? state.dataDaily[index.value] : state.dataDaily[0],
// );

// Детали по времени суток (если есть)
const selectedDetail = computed(() =>
  state.oneCallData.daily?.length ? state.oneCallData.daily[index.value] : null,
);

// console.log(selectedItem.value, ' selectedItem');
// console.log(state.dataDaily, '  state.dataDaily');

onUpdated(() => {
  // console.log(selectedItem.value, ' selectedItem 2');
  console.log(index.value, ' index.value');
});
onMounted(() => {});

console.log(selectedDetail.value, 'selectedDetail');

const day = computed(() => selectedDetail.value?.day || null);
const morning = computed(() => selectedDetail.value?.morning || null);
const evening = computed(() => selectedDetail.value?.evening || null);
const night = computed(() => selectedDetail.value?.night || null);
</script>

<template>
  <div class="flex justify-center mt-2 w-full text-[18px]" v-if="state.data">
    <div class="bg-white/70 rounded-2xl overflow-hidden relative w-full max-w-[825px]">
      <div class="flex items-center py-[10px] bg-[#bbd4fd]/60 shadow p-4">
        <div>
          <div class="font-bold text-3xl">
            {{ state.data.city.name }}, {{ state.data.city.country }},
            <span>{{ state.oneCallData.daily[index].weather[0].description }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-top w-full py-2 px-2">
        <div v-if="!index" class="text-left text-6xl font-bold mr-10 w-[152px]">
          <WeatherIcon :data="state.oneCallData.daily[index]" width="150" />
          <div class="pl-4">{{ Math.round(state.dataDaily[0].main.temp) }}°C</div>
        </div>
        <div v-else class="text-left text-5xl font-bold mr-10 w-[152px]">
          <WeatherIcon :data="state.oneCallData.daily[index]" width="150" />
        </div>

        <div class="w-1/6 mt-[7px]">
          <div class="text-[12px] space-y-1">
            <div class="flex justify-between text-sm mb-1">
              <span>Temperature °C</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>Feels like</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>Wind</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>Humidity</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>Pressure</span>
            </div>
          </div>
          <SunDetails
            :data="state.oneCallData.daily"
            :timezone="state.oneCallData.timezone_offset"
            :index="index"
          />
        </div>

        <div class="w-1/2 flex justify-start text-xs ml-5">
          <WeatherPerDay
            v-if="selectedDetail"
            :day-time-data="selectedDetail"
            day-text-time="00:00 - 3:00"
            day-text="night"
            day-period="night"
            day-icon="🌙"
            mix="w-1/4"
          />
          <WeatherPerDay
            v-if="selectedDetail"
            :day-time-data="selectedDetail"
            day-text-time="6:00 - 9:00"
            day-text="morning"
            day-period="morn"
            day-icon="🌅"
            mix="w-1/4"
          />
          <WeatherPerDay
            v-if="selectedDetail"
            :day-time-data="selectedDetail"
            day-text-time="12:00 - 15:00"
            day-text="day"
            day-period="day"
            day-icon="🌞"
            mix="w-1/4"
          />
          <WeatherPerDay
            v-if="selectedDetail"
            :day-time-data="selectedDetail"
            day-text-time="18:00 - 21:00"
            day-text="evening"
            day-period="eve"
            day-icon="🌆"
            mix="w-1/4"
          />
          <!--          <WeatherPerDay-->
          <!--            v-if="evening"-->
          <!--            :day-time-data="evening"-->
          <!--            day-time="21:00"-->
          <!--            day-text="Evening"-->
          <!--            day-icon="🌆"-->
          <!--          />-->
        </div>
      </div>

      <div class="bg-[#bbd4fd]/60 py-1 text-center">
        <span v-if="!index">🕒 {{ state.time }}</span
        >&nbsp;
        <span>{{ formatDate(state.oneCallData.daily[index].dt) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
