import platform from '../img/http://mariojs/img/platform.png'
console.log(platform)

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = .3

class Player {
	constructor() {
		this.position = {
			x: 200,
			y: 400
		}
		this.velocity = {
			x: 0,
			y: 10
		}
		this.width = 50
		this.height = 50
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update() {
		this.draw()
		this.position.y += this.velocity.y
		this.position.x += this.velocity.x

		if(this.position.y + this.velocity.y + this.height <= canvas.height)
			this.velocity.y += gravity
		else this.velocity.y = 0
	}
}

class Platform {
	constructor({ x, y }) {
		this.position = {
			x,
			y
		}
		this.width = 200
		this.height = 20
	}
	draw() {
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
		c.fillStyle = 'red'
	}
}


const player = new Player
// array created for multiple platforms
const platforms = [new Platform({ x: 200, y: 400 }), new Platform({ x: 400, y: 300 })]

const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	}
}

// needed to created win scenario
let scrollOffset = 0

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)
	player.update()
	platforms.forEach(platform => {
		platform.draw()
	})




	// scrolling background
	if(keys.right.pressed && player.position.x < 500) {
		player.velocity.x = 4
	}
	else if(keys.left.pressed && player.position.x > 50) {
		player.velocity.x = -4
	} else {
		player.velocity.x = 0
		if(keys.right.pressed) {
			scrollOffset += 5
			platforms.forEach(platform => {
				platform.position.x -= 5
			})
		} else if(keys.left.pressed) {
			scrollOffset -= 5
			platforms.forEach(platform => {
				platform.position.x += 5
			})
		}
	}
	console.log(scrollOffset)
	// forEach loop creating multiple platforms
	platforms.forEach(platform => {
		// platform collision detection
		if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x + player.width <= platform.position.x + platform.width)
			player.velocity.y = 0
	})
	if(scrollOffset > 1000) {
		console.log('you win')
	}
}
animate()

addEventListener('keydown', ({ keyCode }) => {
	switch(keyCode) {
		case 65:
			console.log('left')
			keys.left.pressed = true
			break

		case 68:
			console.log('right')
			keys.right.pressed = true
			break

		case 87:
			console.log('up')
			player.velocity.y = -10
			break

	}
	// console.log(keys.left.pressed)
})

addEventListener('keyup', ({ keyCode }) => {
	switch(keyCode) {
		case 65:
			keys.left.pressed = false
			break

		case 68:
			keys.right.pressed = false
			break

		case 87:
			player.velocity.y = 0
			break
	}
})