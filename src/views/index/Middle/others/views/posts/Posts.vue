<template>
  <div>
    <Message
        :info="info"
        :userid="info.uid"
        @likeflush="flush"
        :like-status="info.like_status"
        :message-id="info.id"
        :key="index"
        v-for="(info,index) in artical"
        class="message"
        :like-artical="info.like_num"
        :comment-artical="info.copy_num"
        :share-artical="info.share_num"
        share-num="48"
        :is-v="true"
        :need-picture="handsPicture(info.image_url)"
    >
      <img slot="profile" src="../../../../../../assets/page/Avatar.png" alt=""/>
      <span slot="name">{{ info.username }}</span>
      <span slot="time">{{ info.create_time }}</span>
      <!--   文章   -->
      <span slot="artical" v-html="info.content">
       {{ info.content }}
        <a>@AliansiSeniNFT #NFTCommunity</a>
      </span>
      <img slot="picture" :src="info.image_url[0]" alt="图"/>
    </Message>

  </div>
</template>

<script>
import Message from '../../../../../../utils/components/Message'
// ---------------------------- axios --------------------------------
import {allArticleList} from '@/api/monico/home'

export default {
  name: 'Posts',
  components: {
    Message
  },
  data() {
    return {
      artical: []
    }
  },
  methods: {
    flush() {
      this.$emit('flush')
    },
    handsPicture(img) {
      return img.length !== 0
    },
    //   ---------------------------- axios ----------------------------------
    /**
     * 获取文章列表
     * @param pd
     */
    allArticleList(pd) {
      allArticleList(this.$qs.stringify(pd))
          .then(res => {
            this.artical = res.data.data.list
          })
    }
  },
  mounted() {
    const pd = {
      uid: this.$route.query.uid,
      page: 1,
      limit: 10
    }
    this.allArticleList(pd)
  }
}
</script>
<style>
body {
  background-color: rgba(22, 22, 22, 1);
}
</style>
<style scoped>
.picture {
  width: 504px;
  height: 275px
}

.message {
  margin-top: 14px;
}
</style>
