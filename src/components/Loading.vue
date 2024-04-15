<template>
  <div class="flex flex-1 items-center justify-center">
    <div>
      <div>
        <div class="dot-typing"></div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
  .dot-typing {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #374151;
    color: #374151;
    box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    animation: dotTyping 1.5s infinite linear;
  }

  @keyframes dotTyping {
    0% {
      box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    }
    16.667% {
      box-shadow: 9984px -10px 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    }
    33.333% {
      box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    }
    50% {
      box-shadow: 9984px 0 0 0 #374151, 9999px -10px 0 0 #374151, 10014px 0 0 0 #374151;
    }
    66.667% {
      box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    }
    83.333% {
      box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px -10px 0 0 #374151;
    }
    100% {
      box-shadow: 9984px 0 0 0 #374151, 9999px 0 0 0 #374151, 10014px 0 0 0 #374151;
    }
  }
</style>
