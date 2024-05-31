<template>
  <footer class="bg-surface-variant text-sm text-main/80">
    <div class="max-w-lg mx-auto py-10 w-5/6">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div>
          <h3 class="mb-3">
            <router-link class="group" to="/">
              <img class="w-6 grayscale group-hover:grayscale-0 inline-block align-middle" src="../assets/icon.png" alt="website logo">
              <span class=" inline-block align-middle ml-3">蝦英雄</span>
            </router-link>
          </h3>
          <ul>
            <li>
              <a class="text-stone-500" href="mailto:contact@nosegates.com" target="_blank">
                <i class='bx bx-envelope bx-sm'></i>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4"><i class='bx bx-globe'></i>頁面</h3>
          <ul>
            <li v-for="page in navs">
              <router-link class="text-stone-500 hover:underline text-sm/loose" :to="page.url">{{ page.name }}</router-link>
            </li>
            <li>
              <a class="text-stone-500 hover:underline text-sm/loose" href="https://blog.justlikeboss.com/product/shopee-short-link/" target="_blank">使用說明<i class='bx bx-link-external'></i></a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4"><i class='bx bx-desktop'></i>品牌</h3>
          <ul>
            <li class="text-stone-500" v-for="link in brands">
              <a class="hover:underline text-sm/loose" :href="link.url" target="_blank">{{ link.name }}<i class='bx bx-link-external'></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h4>
          <router-link  class="text-sm text-stone-500" to="/">
            Copyright <i class='bx bx-copyright align-middle'></i> 2024 蝦英雄
          </router-link>
        </h4>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navs = [
  {
    url: '/record',
    name: '紀錄'
  },
  {
    url: '/disclaimer',
    name: '免責聲明'
  }
]

const brands = [
  {
    url: 'https://exchange-rate.justlikeboss.com/',
    name: '匯星'
  },
  {
    url: 'https://blog.justlikeboss.com/',
    name: '小資族FIRE攻略'
  },
  {
    url: 'https://kfc.justlikeboss.com/',
    name: '酷碰獅'
  },
  {
    url: 'https://studio.justlikeboss.com/',
    name: 'NS工作室'
  }
]
</script>