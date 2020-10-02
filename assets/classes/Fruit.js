class Fruit {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }
    render() {
        return `
        <div class=fruit style="display: inline-block; background-color: red; width: 20px; height: 20px; position: relative; top: ${this.yPos}; left: ${this.xPos}"></div>
        `;
    }
    set setXCoordinate(xCoord) {
        this.xPos = xCoord;
    }
    set setYCoordinate(yCoord) {
        this.yPos = yCoord;
    }
}
export default Fruit;