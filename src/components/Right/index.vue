<template>
  <Scroll class="right" ref="scroll" @scroll-end="viewCheck">
    <ul class="goods-list">
      <li class="goods-item" v-for="it in cate" :key="it.categoryGuid" ref="cate">
        <h3 class="cate-title">{{it.categoryName}}</h3>
        <ul class="card-list">
          <li class="card-item" v-for="i in it.goodsCount">
            <Card :guid="it.categoryGuid" :index="i-1"/>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from '../Scroll/index.vue'
  import Card from '../Card/index.vue'

  export default {
	name: 'right',
	components: {Scroll, Card},
	props: {
	  cate: Array,
	  value: {
		type: Number
	  },
	},
	data () {
	  return {
		offsetList: [],
		rectList: [],
	  }
	},
	created() {
	  this.initOffsetList()
	},

	mounted() {
	  setTimeout(() => {
		this.height = this.$el.clientHeight
		setTimeout(() => {
		  this.viewCheck(0);
		}, 50)
	  }, 20)
	},

	methods: {
	  initOffsetList() {
		let list = [0]
		let offset = 0

		this.cate.forEach(c => {
		  offset += c.goodsCount * 91 + 40
		  list.push(offset)
		});

		this.offsetList = list
		this.rectList = this.cate.map((n, i) => ({
		  top: this.offsetList[i],
		  bottom: this.offsetList[i + 1],
		  guid: n.categoryGuid
		}));

	  },
	  getData(guid, index) {
		let list = this.goods[guid]
		console.log(list, guid, index);
		if (!list) return
		return list[index]
	  },
	  viewCheck(value) {
		let top = -value, bottom = -value + this.height

		let viewGuids = this.rectList.filter(rect => {
		  return rect.bottom < bottom && rect.bottom > top ||
			  rect.top > top && rect.top < bottom
		})

		if (viewGuids.length) {
		  let index = this.offsetList.findIndex(o => o === viewGuids[0].top)
		  if (index !== -1) {
			this.$emit('input', index);
		  }
		}

		console.log(viewGuids);


		viewGuids.forEach(({guid}) => {
		  this.$store.dispatch('getGoodsByGuid', guid)
		})
	  },
	  scroll(index) {
		this.$refs.scroll.scrollTo(-this.offsetList[index])
	  }
	},
	computed: {},
	watch: {
	  cate() {
		this.initOffsetList();
	  }
	},
  }
</script>

<style rel="stylesheet/less" lang="less">
  .right {
    .goods-list {
      .goods-item {
        .cate-title {
          height: 40px;
          padding-top: 14px;
          padding-left: 10px;
          font-weight: 500;
          font-size: 17px;
          margin: 0;
        }
      }
    }
    .card-list {
      padding-left: 10px;
      .card-item {
        padding: 10px 10px 10px 0;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }

</style>
