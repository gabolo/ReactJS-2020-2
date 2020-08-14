class Box {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    getTopBox(){
        if(this.y === 0) return null;
        return new Box(this.x, this.y -1);
    }
    getRightBox(){
        if(this.x === 2) return null;
        return new Box(this.x + 1, this.y);
    }
    getBottomBox(){
        if(this.y === 2) return null;
        return new Box(this.x, this.y + 1);
    }
    getLeftBox(){
        if(this.x === 0) return null;
        return new Box(this.x - 1, this.y);
    }
    getNextBox(){
        return [
            this.getTopBox(),
            this.getRightBox(),
            this.getBottomBox(),
            this.getLeftBox()
        ].filter(box => box !== null);
    }
    getRandomNextBox(){
        const nextBox = this.getNextBox();
        return nextBox[Math.floor(Math.random() * nextBox.length)];
    }
}
const moveBoxes = (grid,box1,box2) => {
    const temp = grid[box1.y][box1.x];
    grid[box1.y][box1.x] = grid[box2.y][box2.x];
    grid[box2.y][box2.x] = temp;
}
const resuelto = grid => {
    return (
        grid[0][0] === document.getElementsByClassName('tile1') &&
        grid[0][1] === document.getElementsByClassName('tile2') &&
        grid[0][2] === document.getElementsByClassName('tile3') &&
        grid[1][0] === document.getElementsByClassName('tile4') &&
        grid[1][1] === document.getElementsByClassName('tile5') &&
        grid[1][2] === document.getElementsByClassName('tile6') &&
        grid[2][0] === document.getElementsByClassName('tile7') &&
        grid[2][1] === document.getElementsByClassName('tile8') &&
        grid[2][2] === document.getElementsByClassName('tile9')
    );
};
const getMallaRandom = () => {
    let grid =[[document.getElementsByClassName('tile1'),document.getElementsByClassName('tile2'),document.getElementsByClassName('tile3')],
        [document.getElementsByClassName('tile4'),document.getElementsByClassName('tile5'),document.getElementsByClassName('tile6')],
        [document.getElementsByClassName('tile7'),document.getElementsByClassName('tile8'),document.getElementsByClassName('tile9') ]];
    let blankbox = new Box(2,2);
    for(let i = 0; i < 1000; i++){
        const randomNextBox = blankbox.getRandomNextBox();
        moveBoxes(grid,blankbox,randomNextBox);
        blankbox = randomNextBox;
    }
    if (resuelto(grid)) return getMallaRandom();
    return grid;
}
class State{
    constructor(grid, status) {
        this.grid = grid;
        this.status = status;
    }
    static ready(){
        return new State(
            [[0,0,0], [0,0,0], [0,0,0]],
            'ready'
        );
    }

    static start(){
        return new State(getMallaRandom(), 'playing');
    }
}
class Game {
    constructor(state) {
        this.state = state;
        this.render();
        this.handleClickBox = this.handleClickBox().bind(this)
    }
    static ready(){
        return new Game(State.ready());
    }
    tick(){
        this.setState()
    }
    setState(newState){
        this.state = {...this.state, ...newState};
        this.render();
    }

    handleClickBox(box){
        return function(){
            const nextbox = box.getNextBox();
            const blankbox = nextbox.find(
                nextBox => this.state.grid[nextBox.y][nextBox.x] === document.getElementsByClassName('tile9')
            );
            if(blankbox){
                const newGrid = [...this.state.grid];
                moveBoxes(newGrid, box, blankbox);
                if (resuelto(newGrid)){
                    this.setState({
                        status: 'won',
                        grid: newGrid
                    });
                } else {
                    this.setState({
                        grid: newGrid
                    });
                }
            }
        }.bind(this);
    }

    render(){
        const {grid, status} = this.state;
        const newGrid = document.createElement('div');

        newGrid.className = 'grid';
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                const button = document.createElement('button');

                if(status === 'playing') {
                    button.addEventListener('click',this.handleClickBox(new Box(j,i)));
                }

                button.textContent = grid[i][j] === 0 ? '' : grid[i][j].toString();
                newGrid.appendChild(button)
            }
        }
        document.querySelector('.malla').replaceWith(newGrid);

        const newButton = document.createElement('button');
        if(status === 'ready') {
            newButton.textContent = 'Play';
        }
        if(status === 'playing') {
            newButton.textContent = 'Reset';
        }
        if(status === 'won') {
            newButton.textContent = 'Play';
        }
        newButton.addEventListener('click', () => {
            this.setState(State.start());
        });
        document.querySelector('.footer button').replaceWith(newButton);
    }
}
const GAME = Game.ready();