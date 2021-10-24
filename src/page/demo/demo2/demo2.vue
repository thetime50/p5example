<template>
<div class="component-demo2">
    <div class="info">
        <a href="https://www.openprocessing.org/sketch/849430">LightPainting</a>
    </div>
    <div class="content" ref="content">
        <!--  -->
    </div>
</div>
</template>

<script>
/* message */
// import p5 from "p5"

export default {
  name: 'LightPainting',
  data() {
    return {
      createAt: new Date().toLocaleTimeString(),

      // p5
      _myp5: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this._myp5 = new p5(this.p5namespace, this.$refs.content);
    });
  },
  beforeDestroy() {
    this._myp5 && this._myp5.remove();
  },
  methods: {
    p5namespace(sketch) {
      const cells = [];
      const cellW = 15;
      const cellH = 15;
      let nbCellW;
      let nbCellH;
      // sketch.preload = function(){}
      sketch.setup = function () {
        sketch.createCanvas(600, 600);
        sketch.rectMode(sketch.CENTER);
        sketch.colorMode(sketch.HSB, 1);

        nbCellW = sketch.floor(sketch.width / cellW);
        nbCellH = sketch.floor(sketch.height / cellH);

        for (let i = 0; i < nbCellW * nbCellH; i += 1) {
          cells.push(sketch.createVector(0, 0));
        }
      };

      sketch.draw = function () {
        // 鼠标变化量
        const deltaMouse = sketch.createVector(sketch.mouseX - sketch.pmouseX, sketch.mouseY - sketch.pmouseY);
        for (let i = 0; i < nbCellW; i += 1) {
          for (let j = 0; j < nbCellH; j += 1) {
            const k = i + j * nbCellW;
            const x = cellW * i + cellW / 2;
            const y = cellH * j + cellH / 2;
            const d = Math.max(1, sketch.dist(sketch.mouseX, sketch.mouseY, x, y));// 鼠标相对cell的距离

            deltaMouse.normalize();// 归一化
            deltaMouse.mult(1 / (d * 30)); // 相对鼠标距离衰减
            cells[k].add(deltaMouse); // 累加到单元格
            cells[k].limit(10); // 极值限制

            const h = sketch.map(cells[k].heading(), -sketch.PI, sketch.PI, 0, 1);
            const b = sketch.min(cells[k].mag() * 100, 10);
            sketch.fill(h, 1, b);// 累加后的向量获取色彩空间

            sketch.rect(x, y, cellW, cellH);// 画cell

            cells[k].mult(0.98);// 时间衰减
          }
        }
      };
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$back:#424242;
.component-demo2{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;//.class1 .class2
    >*{
        min-width: 0;
        min-height: 0;
    }
}
</style>
