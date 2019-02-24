<template>
  <div class="card" :class="data?'':'mock'">
    <div class="img-block">
      <img :src="data.goodsImage" alt="" v-if="data">
    </div>
    <div class="text-block">
      <p class="name"><span v-if="data">{{data.goodsName}}</span></p>
      <p class="sell"><span v-if="data">已售: {{data.sellCount}}</span></p>
      <p class="price"><span v-if="data">￥{{data.goodsPrice}}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'card',
	components: {},
	props: {
	  index: Number,
	  guid: String
	},

	data () {
	  return {
		data: null
	  }
	},
	created() {
	  this.$store.subscribe((mutation, state) => {
		this.setGoods()
	  })
	},
	methods: {
	  setGoods() {
		let data = null
		if (this.goods[this.guid]) {
		  data = this.goods[this.guid][this.index]
		}
		this.data = data
	  }
	},
	computed: {
	  goods() {
		return this.$store.state.goodsMap
	  },
	},
	watch: {
	  goods: {
		handler() {
		  console.log('change');
		}, deep: true
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less">

  .card {
    height: 70px;
    display: flex;
    &.mock {
      .img-block {
        background-color: #f3f3f3;
      }
      .name {
        background-color: #f3f3f3;
      }
    }
    .img-block {
      width: 70px;
      height: 70px;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
    .text-block {
      flex: 1;
      height: 70px;
      padding-left: 10px;
      .name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 20px;
        height: 20px;
        margin-bottom: 10px;
      }
      .sell {
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
