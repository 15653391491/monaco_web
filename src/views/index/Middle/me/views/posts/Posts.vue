<template>
  <div>
    <Message
        :info="info"
        :userid="info.uid"
        @flush="flush"
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
import {articleList} from '@/api/monico/home'
import qs from 'qs'

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
      const pd = {}
      let postData = qs.stringify(pd)
      this.articleList(postData)
    },
    articleList(pd) {
      articleList(pd)
          .then(res => {
            this.artical = res.data.data.list
          })
    },

    handsPicture(img) {
      return img.length !== 0
    }
  },
  mounted() {
    const pd = {}
    let postData = qs.stringify(pd)
    this.articleList(postData)
  }
}
</script>

<style scoped>
.message {
  margin-top: 14px;
}

a {
  color: rgba(49, 184, 240, 1);
}
</style>
