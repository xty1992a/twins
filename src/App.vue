<template>
  <div class="app">
    <Left :data="cateList" v-model="currentCate" @pick="pickLeft"/>
    <Right ref="right" :cate="cateList" v-model="currentCate"/>
  </div>
</template>

<script>
  import {getCategory, getGoodsList} from './api/index'
  import Left from './components/Left/index.vue'
  import Right from './components/Right/index.vue'

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  export default {
	name: 'app',
	components: {Left, Right},
	data () {
	  return {
		currentCate: 0,
	  }
	},
	async created() {
	  await this.$store.dispatch('getCategory')
	},

	methods: {
	  getGoods() {
		let guid = this.cateList[this.currentCate].categoryGuid
		this.$store.dispatch('getGoodsByGuid', guid)
	  },
	  pickLeft(index) {
		this.$refs.right.scroll(index)
	  }
	},
	computed: {
	  cateList() {
		return this.$store.state.categoryList
	  },
	  goodsMap() {
		return this.$store.state.goodsMap
	  },
	},
	watch: {
	  currentCate() {
		this.getGoods()
	  }
	},
  }
</script>

<style rel="stylesheet/less" lang="less">

  .app {
    height: 100%;
    display: flex;
    overflow: hidden;
    .left {
      width: 20%;
    }
    .right {
      flex: 1;
    }
  }
</style>
