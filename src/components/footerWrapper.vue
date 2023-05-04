<template>
  <footer class="bg-surface-variant">
    <div class="max-w-lg mx-auto py-10 w-11/12 grid gap-10 grid-cols-2">
      <div>
        <router-link to="/">{{ new Date().getFullYear() }}<i class='bx bx-copyright'></i>蝦英雄</router-link>
      </div>
      <div>
        <p class=" text-right">
          <a
            href="mailto:bobhus394@gmail.com"
            class="hover:underline"
            title="聯繫"
            target="_blank"
          ><i class="bx bx-mail-send"></i>聯繫</a>
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/record">紀錄</router-link>
          </li>
          <li>
            <router-link to="/disclaimer">免責聲明</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>