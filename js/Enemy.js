class Enemy {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.enemy = createSprite(x, y);
        this.enemy.shapeColor = "white";
    }
    
}