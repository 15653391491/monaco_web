<template>
  <div class="s-container">
    <div class="title">Message</div>
    <div class="list">
      <div class="item">
        <div class="avatar"></div>
        <div class="bd">
          <div class="name">Suqinglong</div>
          <div class="msg">okay</div>
        </div>
        <div class="date">10-14</div>
      </div>

      <div class="item">
        <div class="avatar"></div>
        <div class="bd">
          <div class="name">Suqinglong</div>
          <div class="msg">okay</div>
        </div>
        <div class="date">10-14</div>
      </div>

      <div class="item">
        <div class="avatar"></div>
        <div class="bd">
          <div class="name">Suqinglong</div>
          <div class="msg">okay</div>
        </div>
        <div class="date">10-14</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.s-container {
  font-family: 'Poppins', sans-serif;
  .title {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    letter-spacing: 0.4px;
    color: #bda28d;
    padding: 0 20px;
    line-height: 56px;
    height: 56px;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 14px 18px 14px 30px;
    border-top: 0.5px solid #2a2a2a;
    cursor: pointer;
    &:hover {
      background: #222222;
    }
    &:last-child {
      border-bottom: 0.5px solid #2a2a2a;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      background: url("~@/assets/page/Avatar.png") center center no-repeat;
      background-size: contain;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .bd {
      flex-grow: 1;

      .name {
        font-size: 18px;
        color: white;
      }
      .msg {
        font-size: 12px;
        color: #9f9d9d;
      }
    }
    .date {
      font-size: 12px;
      color: #9f9d9d;
    }
  }
}
</style>

