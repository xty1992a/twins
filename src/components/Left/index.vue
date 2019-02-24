<template>
  <div class="left">
    <Scroll ref="scroll">
      <ul class="cate-list">
        <li class="cate-item"
            :class="index===value?'picked':''"
            @click="pickItem(it)"
            v-for="(it,index) in data"
            :key="it.categoryGuid">
          <span>{{it.categoryName}}</span>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from '../Scroll/index.vue'
  import Card from '../Card/index.vue'

  export default {
	name: 'left',
	components: {Scroll, Card},
	props: {
	  data: Array,
	  value: {
		type: Number
	  }
	},
	data () {
	  return {}
	},
	created() {
	},

	methods: {
	  pickItem(it) {
		let index = this.data.findIndex(i => i.categoryGuid === it.categoryGuid)
		this.$emit('input', index)
		this.$emit('pick', index)
	  }
	},
	computed: {},
	watch: {
	  value(index) {
		this.$refs.scroll.scrollTo(-37 * index)
	  }
	},

  }
</script>

<style rel="stylesheet/less" lang="less">
  .left {
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    .cate-item {
      border-bottom: 1px solid #e5e5e5;
      line-height: 36px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 6px;
      text-align: center;
      &.picked {
        color: #539bff;
      }
    }
  }

</style>
