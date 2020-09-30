class SnakeBodyPart {
    constructor(xPos, yPos, count) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.count = count;
    }
    render() {
        return `
        <div class=snake-body-part-${this.count} style="border-radius: 50%; display: inline-block; background-color: #96be62; width: 30px; height: 30px; position: absolute; top: ${this.yPos}; left: ${this.xPos}"></div>
        `;
    }
    set xCoordinate(xCoord) {
        this.xPos = xCoord;
    }
    set yCoordinate(yCoord) {
        this.yPos = yCoord;
    }
}
export default SnakeBodyPart;