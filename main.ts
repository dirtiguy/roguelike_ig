namespace SpriteKind {
    export const pbject = SpriteKind.create()
    export const Weapon = SpriteKind.create()
}
// good end
info.onScore(96, function () {
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.setGameOverMessage(true, "test")
    game.gameOver(true)
})
// projectile
info.onCountdownEnd(function () {
    projectile = sprites.createProjectileFromSprite(assets.image`projectile`, myEnemy, 30, 30)
    projectile.follow(mySprite)
    info.startCountdown(10)
    if (mySprite.isHittingTile(CollisionDirection.Left) || (mySprite.isHittingTile(CollisionDirection.Top) || (mySprite.isHittingTile(CollisionDirection.Right) || mySprite.isHittingTile(CollisionDirection.Bottom)))) {
        sprites.destroy(projectile)
    }
})
// bad end proj
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(myEnemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
// bad end enemy
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
/**
 * Binding of Isaac but Pacman, cyclops enemy follows player, shoots homing tears that break on contact with wall. collect coins to win, shop with upgrades?
 */
/**
 * food
 */
// starting block, contains player, coins,wall objects
let sword: Sprite = null
let myEnemy: Sprite = null
let projectile: Sprite = null
let otherSprite: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level`)
mySprite = sprites.create(assets.image`test sprite`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setPosition(randint(0, 48), randint(0, 48))
scene.cameraFollowSprite(mySprite)
for (let index = 0; index < 128; index++) {
    tiles.setTileAt(tiles.getTileLocation(randint(0, 48), randint(0, 48)), assets.tile`myTile0`)
}
let object = sprites.create(assets.image`testobject`, SpriteKind.pbject)
for (let index = 0; index < 96; index++) {
    otherSprite = sprites.create(assets.image`myImage0`, SpriteKind.Food)
    tiles.placeOnRandomTile(otherSprite, sprites.dungeon.darkGroundCenter)
}
let IsMonsterAlive = 0
let weapon_seathed = 1
game.onUpdateInterval(1, function () {
    if (weapon_seathed == 0) {
        if (controller.up.isPressed()) {
            sword.setPosition(mySprite.x, mySprite.y - 30)
        } else if (controller.down.isPressed()) {
            sword.setPosition(mySprite.x, mySprite.y + 30)
        } else if (controller.left.isPressed()) {
            sword.setPosition(mySprite.x - 30, mySprite.y)
        } else if (controller.right.isPressed()) {
            sword.setPosition(mySprite.x + 30, mySprite.y)
        }
    }
})
// inf calcs
forever(function () {
    tiles.placeOnRandomTile(object, assets.tile`myTile0`)
    // wall spawning
    if (tiles.tileAtLocationIsWall(object.tilemapLocation())) {
    	
    } else {
        tiles.setWallAt(object.tilemapLocation(), true)
    }
    // enemy spawning
    // 
    if (IsMonsterAlive == 0) {
        myEnemy = sprites.create(assets.image`enemystart`, SpriteKind.Enemy)
        scaling.scaleByPercent(myEnemy, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        animation.runImageAnimation(
        myEnemy,
        assets.animation`enemy`,
        200,
        true
        )
        tiles.placeOnRandomTile(myEnemy, sprites.dungeon.darkGroundCenter)
        myEnemy.follow(mySprite, 75)
        info.startCountdown(10)
        IsMonsterAlive = 1
    }
    // weapons/mechsnics
    if (controller.B.isPressed() && controller.up.isPressed()) {
        sword = sprites.create(assets.image`sword up`, SpriteKind.Weapon)
        sword.setPosition(mySprite.x, mySprite.y - 30)
        weapon_seathed = 0
        pause(500)
        weapon_seathed = 1
        sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
    } else if (controller.B.isPressed() && controller.left.isPressed()) {
        sword = sprites.create(assets.image`sword left`, SpriteKind.Weapon)
        sword.setPosition(mySprite.x - 30, mySprite.y)
        weapon_seathed = 0
        pause(500)
        weapon_seathed = 1
        sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
    } else if (controller.B.isPressed() && controller.right.isPressed()) {
        sword = sprites.create(assets.image`sword right`, SpriteKind.Weapon)
        sword.setPosition(mySprite.x + 30, mySprite.y)
        weapon_seathed = 0
        pause(500)
        weapon_seathed = 1
        sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
    } else if (controller.B.isPressed() && controller.down.isPressed()) {
        sword = sprites.create(assets.image`sword down`, SpriteKind.Weapon)
        sword.setPosition(mySprite.x, mySprite.y + 30)
        weapon_seathed = 0
        pause(500)
        weapon_seathed = 1
        sprites.destroyAllSpritesOfKind(SpriteKind.Weapon)
    }
})
