<template>
  <div class="scroll">
    <div class="slider" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import AlloyTouch from 'alloytouch'

  export default {
	name: 'scroll',
	components: {},
	props: {
	  data: {
		type: Array
	  }
	},
	data () {
	  return {
		offsetY: 0,
		touch: null,
	  }
	},
	mounted() {
	  setTimeout(() => {
		this.touch = new AlloyTouch({
		  touch: this.$el,//反馈触摸的dom
		  vertical: true,//不必需，默认是true代表监听竖直方向touch
		  property: "translateY",  //被运动的属性
		  min: 0, //不必需,运动属性的最小值
		  max: 0, //不必需,滚动属性的最大值
		  sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
		  factor: 1,//不必需,表示触摸位移运动位移与被运动属性映射关系，默认值是1
		  moveFactor: 1,//不必需,表示touchmove位移与被运动属性映射关系，默认值是1
		  step: 45,//用于校正到step的整数倍
		  bindSelf: false,
		  maxSpeed: 2, //不必需，触摸反馈的最大速度限制
		  initialValue: 0,
		  change: (value) => {
			this.offsetY = value
			this.$emit('scroll', value);
		  },
		  touchStart: (evt, value) => {
		  },
		  touchMove: (evt, value) => {
		  },
		  touchEnd: (evt, value) => {
		  },
		  tap: (evt, value) => {
		  },
		  pressMove: (evt, value) => {
		  },
		  animationEnd: (value) => {
			this.$emit('scroll-end', value)
		  } //运动结束
		})
		this.fresh()
	  }, 20)
	},
	methods: {
	  fresh() {
		let el = this.$el
		let child = el.children[0]
		this.touch.min = el.clientHeight - child.clientHeight
	  },
	  scrollTo(value, time) {
		let val = Math.min(this.touch.max, Math.max(this.touch.min, value))
		console.log(this.touch.min, val);
		this.touch && this.touch.to(val, time)
	  }
	},
	computed: {
	  style() {
		return `transform: translate3d(0,${this.offsetY}px, 0)`
	  }
	},
	watch: {
	  data() {
		setTimeout(() => {
		  this.fresh()
		}, 20)
	  }
	}
  }
</script>

<style type="less">

  .scroll {
    height: 100%;
    position: relative;
  }
</style>
