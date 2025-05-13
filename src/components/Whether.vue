<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/stores/weather.js';
import { formatTextDateDt, getLocalTimeNow } from '@/utils/formatDate.js';
import SunDetails from '@/components/SunDetails.vue';
import { useI18n } from 'vue-i18n';
import HourlyForecast from '@/components/HourlyForecast.vue';

const { state } = useWeatherStore();
const route = useRoute();
const { locale } = useI18n();

const index = computed(() => {
  const param = route.params.index;
  const idx = state.dayOfWeek.indexOf(param);
  return idx !== -1 ? idx : 0;
});
const isToday = computed(() => index.value === 0);
const forecastDay = computed(() => state.oneCallData?.daily[index.value] || {});
const cityData = computed(() => state.cityData?.city || {});
const current = computed(() => state.oneCallData?.current || {});
</script>

<template>
  <div class="flex justify-center mt-2 w-full text-[18px] max-md:scale-95 max-sm:scale-90">
    <div class="bg-white/70 rounded-2xl overflow-hidden relative w-full max-w-[930px]">
      <div class="flex items-center py-[10px] bg-[#bbd4fd]/60 shadow p-4">
        <div>
          <div class="font-bold text-3xl max-sm:text-xl">
            {{ cityData.name }}, {{ cityData.country }}
          </div>
        </div>
      </div>

      <div v-if="forecastDay" class="flex items-top w-full py-2 px-2 max-lg:overflow-x-scroll">
        <div
          v-if="isToday"
          class="flex flex-wrap items-center max-w-[320px] text-left text-4xl font-bold mr-5 max-lg:min-w-[310px]"
        >
          <div class="pl-4 w-full text-2xl">{{ current.weather[0].description }}</div>
          <div class="w-[115px]">
            <img
              :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`"
              class="w-[115px]"
              alt=""
            />
          </div>
          <div class="">{{ Math.round(current.temp) }}°C</div>

          <div class="flex items-center">
            <div class="pl-4 text-sm font-medium">
              {{ $t('feels') }} {{ Math.round(current.feels_like) }}°C
            </div>
            <div class="pl-4 text-sm font-medium">
              {{ $t('humidity') }} {{ Math.round(current.humidity) }}%
            </div>
          </div>
          <div class="flex items-center w-full">
            <div class="pl-4 text-sm font-medium">
              {{ $t('pressure') }} {{ Math.round(current.pressure) }}hPa
            </div>
            <div class="pl-4 text-sm font-medium">
              {{ $t('dewPoint') }} {{ Math.round(current.dew_point) }}°C
            </div>
          </div>
          <div class="flex items-center w-full">
            <div class="pl-4 text-sm font-medium">
              {{ $t('visibility') }} {{ Math.round(current.visibility) }}km
            </div>
            <div class="pl-4 text-sm font-medium">
              {{ $t('wind') }} {{ Math.round(current.wind_speed) }}
            </div>
          </div>
          <SunDetails :data="state.oneCallData" :index="index" />
        </div>

        <div
          v-else
          class="flex flex-wrap items-center min-h-[236px] max-w-[320px] text-left text-4xl font-bold mr-5 max-lg:min-w-[310px]"
        >
          <div class="pl-4 w-full text-2xl">{{ forecastDay.weather[0].description }}</div>
          <div class="w-[115px]">
            <img
              :src="`https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@4x.png`"
              class="w-[115px]"
              alt=""
            />
          </div>
          <div>
            <div class="text-base">{{ $t('max') }} {{ Math.round(forecastDay.temp.max) }}°C</div>
            <div class="text-base">{{ $t('min') }} {{ Math.round(forecastDay.temp.min) }}°C</div>
          </div>

          <div class="flex items-center w-full">
            <div class="pl-4 text-sm font-medium">
              {{ $t('humidity') }} {{ Math.round(forecastDay.humidity) }}%
            </div>
            <div class="pl-4 text-sm font-medium">
              {{ $t('wind') }} {{ Math.round(forecastDay.wind_speed) }}
            </div>
          </div>
          <div class="flex items-center w-full">
            <div class="pl-4 text-sm font-medium">
              {{ $t('pressure') }} {{ Math.round(forecastDay.pressure) }}hPa
            </div>
            <div class="pl-4 text-sm font-medium">
              {{ $t('dewPoint') }} {{ Math.round(forecastDay.dew_point) }}°C
            </div>
          </div>
          <SunDetails :data="state.oneCallData" :index="index" />
        </div>

        <div
          class="w-[550px] min-w-[550px] flex flex-wrap justify-start text-xs max-md:min-w-[445px] max-md:overflow-x-scroll"
        >
          <HourlyForecast
            v-if="index < 2"
            :hourly="state.oneCallData.hourly"
            :timezone="state.oneCallData.timezone_offset"
          />
          <div v-else class="22 w-full">
            <div class="overflow-x-auto rounded-xl shadow-md bg-[#bbd4fd]/40 backdrop-blur-md mb-2">
              <table class="w-full table-auto text-sm md:text-base">
                <thead>
                  <tr class="bg-white/20">
                    <th class="p-2 text-left"></th>
                    <th class="p-2 text-center">{{ $t('morn') }}</th>
                    <th class="p-2 text-center">{{ $t('day') }}</th>
                    <th class="p-2 text-center">{{ $t('eve') }}</th>
                    <th class="p-2 text-center">{{ $t('night') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-t border-white/20">
                    <td class="p-2 font-semibold">{{ $t('temp') }}</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.temp.morn) }}°C</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.temp.day) }}°C</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.temp.eve) }}°C</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.temp.night) }}°C</td>
                  </tr>
                  <tr class="border-t border-white/20">
                    <td class="p-2 font-semibold">{{ $t('feels') }}</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.feels_like.morn) }}°C</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.feels_like.day) }}°C</td>
                    <td class="p-2 text-center">{{ Math.round(forecastDay.feels_like.eve) }}°C</td>
                    <td class="p-2 text-center">
                      {{ Math.round(forecastDay.feels_like.night) }}°C
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="font-medium text-base">{{ $t('pop') }} {{ forecastDay.pop }}0%</div>
            <div class="font-medium text-base">{{ $t('rain') }} {{ forecastDay.rain }}</div>
            <div class="font-medium text-base">{{ $t('summary') }}: {{ forecastDay.summary }}</div>
          </div>
        </div>
      </div>
      <div class="bg-[#bbd4fd]/60 py-1 text-center">
        <span
          >📅
          {{
            formatTextDateDt(
              forecastDay.dt,
              state.oneCallData.timezone_offset,
              'long',
              'long',
              locale,
            )
          }}
          &nbsp;</span
        >
        <span v-if="isToday">🕒 {{ getLocalTimeNow() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
