<template>
<div class="component-demo1">
    <div ref="mainCont"></div>
</div>
</template>

<script>
/* message */
import p5 from "p5"

export default {
    name: "demo1",
  data() {
    return {
      createAt: new Date().toLocaleTimeString(),

      //p5
      myp5: null
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.myp5 = new p5(this.p5namespace, this.$refs.mainCont);
    });
  },
  methods: {
    p5namespace(sketch) {
      // sketch.preload = function(){}
      sketch.setup = function () {
        sketch.createCanvas(640, 480);
      };

      sketch.draw = function () {
        if (sketch.mouseIsPressed) {
          sketch.fill(0);
        } else {
          sketch.fill(255);
        }
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 20, 20);
      };
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-demo1{
    // 
}
</style>