<template>
<section class="p-10">
  <h2 class="mb-16 text-2xl" title="免責聲明">免責聲明</h2>
  <p class="leading-normal mb-8">蝦英雄（以下簡稱「本網站」）為一個提供網路連結縮短服務的網站，旨在協助使用者便捷地分享連結。使用者在使用本網站之前，應仔細閱讀以下免責聲明的內容。使用本網站即表示您同意以下條款：</p>
  <p class="leading-normal mb-8">連結縮短功能僅提供便利，並不擔保連結縮短後的可靠性、準確性或完整性。本網站不對任何因使用本網站而產生的任何錯誤或疏漏負責。</p>
  <p class="leading-normal mb-8">本網站不擔保連結縮短後的連結、內容、廣告或其他資訊的準確性、完整性、合法性、可靠性、適用性、有效性、安全性或可靠性。使用者因使用本網站產生的任何損失或損害，本網站均不負任何責任。</p>
  <p class="leading-normal mb-8">使用者在使用本網站時，應遵守適用的法律法規和本網站的使用規範，並且不得以任何方式損害本網站的利益或破壞本網站的正常運作。</p>
  <p class="leading-normal mb-8">本網站會收取使用者使用本網站所產生的分潤費用作為網站營運成本。</p>
  <p class="leading-normal mb-8">本網站有權在任何時間修改本免責聲明，並且此類修改將在網站上公佈。使用者應該定期查閱本免責聲明，以確定對使用者的法律責任所造成的任何變更。</p>
</section>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
definePage({
  name: 'disclaimer',
  meta: {
    title: '免責聲明'
  }
})
</script>