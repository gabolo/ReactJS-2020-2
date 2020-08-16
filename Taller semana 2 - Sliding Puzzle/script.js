class box {
  construtor(x, y) {
    this.x = x;
    this.y = y;
  }

  getUpbox() {
    if (this.y === 0) return null;
    return new box(this.x, this.y - 1);
  }
  getdownbox() {
    if (this.y === 2) return null;
    return new box(this.x, this.y + 1);
  }
  getleftbox() {
    if (this.y === 0) return null;
    return new box(this.x - 1, this.y);
  }
  getrightbox() {
    if (this.y === 2) return null;
    return new box(this.x + 1, this.y - 1);
  }

  getNextbox() {
    return [
      this.getUpbox(),
      this.getdownbox(),
      this.getleftbox(),
      this.getrightbox(),
    ].filter((box) => box !== null);
  }

  getRandomNextbox() {
    const Nextbox = this.getNextbox();
    return Nextbox[Math.floor(Math.random() * Nextbox.lenght)];
  }
}

const swapbox = (grid, box1, box2) => {
  const t = grid[box1.y][box1.x];
  grid[box1.y][box1.x] = grid[box2.y][box2.x];
  grid[box2.y][box2.x] = t;
};

const solved = (grid) => {
  return (
    grid[0][0] === 1 &&
    grid[0][1] === 2 &&
    grid[0][2] === 3 &&
    grid[1][0] === 4 &&
    grid[1][1] === 5 &&
    grid[1][2] === 6 &&
    grid[2][0] === 7 &&
    grid[2][1] === 8 &&
    grid[2][2] === 0
  );
};

const getRandom = () => {
  let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  let whitebox = new box(2, 2);
  for (let i = 0; i < 1000; i++) {
    const randomNextbox = whitebox.getRandomNextbox();
    swapbox(grid, whitebox, randomNextbox);
    whitebox = randomNextbox;
  }

  if (solved(grid)) return getRandom();
  return grid;
};

class State {
  constructor(grid, move, status) {
    this.status = status;
    this.grid = grid;
    this.move = move;
  }

  static ready() {
    return new State(
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      0,
      0,
      "Ready"
    );
  }

  static start() {
    return new State(getRandom(), 0, 0, "Playing");
  }
}


class Game{
    constructor(state) {
        this.state = state;
        this.tickId = null;
        this.tick = this.tick.bi(this);
        this.render();
        this.handleClickBox = this.handleClickBox.bind(this);
      }

      static ready() {
        return new Game(State.ready());
      }
    
    
      setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
      }

      handleClickBox(box) {
        return function() {
          const nextbox = box.getNextBox();
          const whitebox = nextbox.find(
            nextbox => this.state.grid[nextbox.y][nextbox.x] === 0
          );
          if (whitebox) {
            const newGrid = [...this.state.grid];
            swapbox(newGrid, box, whiteBox);
            if (solved(newGrid)) {
              clearInterval(this.tickId);
              this.setState({
                status: "won",
                grid: newGrid,
                move: this.state.move + 1
              });
            } else {
              this.setState({
                grid: newGrid,
                move: this.state.move + 1
              });
            }
          }
        }.bind(this);
      }

      render() {
        const { grid, move,status } = this.state;
    
        // Render grid
        const newGrid = document.createElement("div");
        newGrid.className = "grid";
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const button = document.createElement("button");
    
            if (status === "playing") {
              button.addEventListener("click", this.handleClickBox(new Box(j, i)));
            }
    
            button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
            newGrid.appendChild(button);
          }
        }
        document.querySelector(".grid").replaceWith(newGrid);
    
        // Render button
        const newButton = document.createElement("button");
        if (status === "ready") newButton.textContent = "Jugar";
        if (status === "playing") newButton.textContent = "Reset";
        if (status === "won") newButton.textContent = "Jugar";
        newButton.addEventListener("click", () => {
          clearInterval(this.tickId);
          this.tickId = setInterval(this.tick, 1000);
          this.setState(State.start());
        });
        document.querySelector(".footer button").replaceWith(newButton);
    
        // Render move
        document.getElementById("move").textContent = `Move: ${move}`;
    
     
       
      }


}
const GAME = Game.ready();
