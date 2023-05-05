<template>
  <footer class="bg-surface-variant text-sm text-main/80">
    <div class="max-w-lg mx-auto py-10 w-5/6 grid gap-10">
      <div>
        <router-link to="/">{{ new Date().getFullYear() }}<i class='bx bx-copyright'></i>蝦英雄</router-link>
      </div>
      <div>
        <p>
          <a
            href="mailto:bobhus394@gmail.com"
            class="hover:underline"
            title="聯繫"
            target="_blank"
          >聯繫<i class="bx bx-mail-send"></i></a>
        </p>
      </div>
      <nav>
        <ul>
          <li class="mb-3">
            <router-link class="hover:underline" to="/record">紀錄</router-link>
          </li>
          <li class="mb-3">
            <router-link class="hover:underline" to="/disclaimer">免責聲明</router-link>
          </li>
          <li>
            <a class="hover:underline" href="https://blog.justlikeboss.com/product/shopee-short-link/" target="_blank" rel="noopener">使用說明<i class='bx bx-link-external'></i></a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>