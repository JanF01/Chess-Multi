<template>
  <div id="Chess" class="chess">
    <div class="board">
      <div
        class="draggable"
        v-for="square in squares"
        v-bind:key="square"
        v-bind:style="{ backgroundColor: square.color, color: square.owner }"
        draggable
        @mouseover="onDragOver($event)"
        @mousedown="startDrag($event)"
        @mouseout="
          evt.out = true;
          endDrag($event);
        "
        @mouseup="endDrag($event)"
        @mousemove="onDragMove($event)"
      >
        {{ square.type }}
      </div>
    </div>
  </div>
</template>

<script>
import Square from "../objects/Square";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      squares: []
    };
  },
  props: {
    msg: String
  },
  methods: {
    startDrag(evt) {
      evt.preventDefault();
      var clone = evt.target.cloneNode(true);
      evt.target.parentNode.appendChild(clone);
      clone.classList.add("dragging");
      var style = getComputedStyle(clone);
      clone.drag = {
        x:
          (evt.pageX || evt.clientX + document.body.scrollLeft) -
          clone.offsetLeft +
          parseInt(style.marginLeft),
        y:
          (evt.pageY || evt.clientY + document.body.scrollTop) -
          clone.offsetTop +
          parseInt(style.marginTop),
        source: evt.target
      };
    },
    onDragMove(evt) {
      if (!evt.target.drag) {
        return;
      }
      evt.target.style.left =
        (evt.pageX || evt.clientX + document.body.scrollLeft) -
        evt.target.drag.x +
        "px";
      evt.target.style.top =
        (evt.pageY || evt.clientY + document.body.scrollTop) -
        evt.target.drag.y +
        "px";
    },
    endDrag(evt) {
      if (!evt.target.drag) {
        return;
      }

      var persist = true;
      if (persist || evt.out) {
        evt.target.parentNode.removeChild(evt.target);
      } else {
        evt.target.parentNode.removeChild(evt.target.drag.source);
      }
      evt.target.classList.remove("dragging");
      evt.target.drag = null;
    },
    onDragOver(evt) {
      evt.preventDefault();
    }
  },
  mounted() {
    var sumOfCollored = 0;
    var color = "#223389";
    for (let i = 0; i < 64; i++) {
      color = "#223389";

      if (i % 2 != 0 && sumOfCollored < 4) {
        color = "#5555DD";
        sumOfCollored++;
      } else if (i % 2 == 0 && sumOfCollored < 8 && sumOfCollored >= 4) {
        color = "#5555DD";
        sumOfCollored++;
      }

      if ((i + 1) % 16 == 0) {
        sumOfCollored = 0;
      }

      var square;

      if ((i > 7 && i < 16) || (i > 47 && i < 56))
        square = new Square("p", true, color);
      else if (i == 0 || i == 56 || i == 63 || i == 7)
        square = new Square("t", true, color);
      else if (i == 2 || i == 58 || i == 5 || i == 61)
        square = new Square("b", true, color);
      else if (i == 1 || i == 57 || i == 6 || i == 62)
        square = new Square("n", true, color);
      else if (i == 60 || i == 4) square = new Square("k", true, color);
      else if (i == 59 || i == 3) square = new Square("q", true, color);
      else square = new Square("", true, color);

      if (i > 18) {
        square.setOwner("white");
      } else {
        square.setOwner("black");
      }

      this.squares.push(square);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@font-face {
  font-family: "Chess";
  src: url("../assets/MAGNFONT.TTF");
}
.chess {
  font-family: "Chess";
  font-size: 5em;
  font-weight: bold;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.board {
  width: 10em;
  height: 10em;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;

  div {
    width: calc(10em / 8);
    height: calc(10em / 8);
    color: black;
    text-shadow: 0em 0.02em 0.2em rgb(109, 204, 248);
    transition: filter 0.2s;
    &:hover {
      filter: brightness(115%) hue-rotate(2deg);
    }
  }
}

.draggable {
  cursor: pointer; /* IE */
  cursor: -webkit-grab;
  cursor: grab;
}

.dragging {
  cursor: -webkit-grabbing;
  cursor: grabbing;
  background-color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
