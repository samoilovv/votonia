
//import {Card} from '../Card'
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
		

	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		this.openedFirstCard = null;
		this.openedSecondCard = null;
        this.isFirstOpen = false;
		this.isSecondOpen = false;
		this.isLose = false;
		this.openPairsCount = 6;
		this.score = 20;
		this.input.on('gameobjectdown', this.onCardClick, this);
		this.startCardPosition();
		this.showScore();

	}

	update() {
	}
	
	startCardPosition() {
        const cardTextures = ["card1", "card2", "card3", "card4", "card5", "card6"];
		const x1 = 130, x2 = 360, x3 = 590;
		const y1 = 250, y2 = 540, y3 = 830, y4 = 1120;
        const cardPositions = [
            { x: x1, y: y1 }, { x: x1, y: y2 }, { x: x1, y: y3 }, { x: x1, y: y4 }, 
			{ x: x2, y: y1 }, { x: x2, y: y2 }, { x: x2, y: y3 }, { x: x2, y: y4 },
            { x: x3, y: y1 }, { x: x3, y: y2 }, { x: x3, y: y3 }, { x: x3, y: y4 }
        ];

        // Создаем массив с парами текстур для карточек
        const cardPairs = Phaser.Utils.Array.Shuffle([...cardTextures, ...cardTextures]);

        cardPositions.forEach((position, index) => {
            const card = this.add.image(position.x, position.y, "textures", "card")
                .setInteractive();

            // Добавляем текстуру для лицевой стороны
            card.frontTexture = cardPairs[index];
        });
    }

    onCardClick(pointer, gameObject) {
        if (!this.isLose && gameObject.frame.name === "card") {

            // Проверяем, открыта ли первая карточка
            if (!this.isFirstOpen) {
                this.firstCardOpen(gameObject);
			// Проверяем, открыта ли вторая карточка
            } else if (!this.isSecondOpen){
				this.secondCardOpen(gameObject);
			}
        }

		if (gameObject.frame.name === "restart") {
			this.scene.restart();
		}
    }

    firstCardOpen(card) {
        // Открываем первую карточку
        card.setTexture("textures", card.frontTexture);
        this.isFirstOpen = true;
        this.openedFirstCard = card;
    }

	secondCardOpen(card) {
		// Открываем вторую карточку
		card.setTexture("textures", card.frontTexture);
		this.isSecondOpen = true;
		this.openedSecondCard = card;
		this.score--;
		this.updateScoreText();
		
		// Если карточки не совпадают
		if (this.openedFirstCard.frame.name != this.openedSecondCard.frame.name) {
		// Задержка перед закрытием карточек (1000 милисек)
        this.time.delayedCall(1000, this.cardClose, [], this);
		} else {
			this.isFirstOpen = false;
			this.isSecondOpen = false;
			this.openPairsCount--;
		}
		
		if (this.openPairsCount === 0) {
			this.playerWin();
		}
	}

    cardClose() {
        // Закрываем карточки
        this.openedFirstCard.setTexture("textures", "card");
		this.openedSecondCard.setTexture("textures", "card");
        this.isFirstOpen = false;
        this.openedFirstCard = null;
		this.isSecondOpen = false;
        this.openedSecondCard = null;
    }

	showScore() {
		var style = {font: "50px Arial", fill: "#fff"}
		this.scoreText = this.add.text(238, 21, this.score + ' попыток', style);
	}
	
	updateScoreText() {
		this.scoreText.setText(this.score + ' попыток');
		if (this.score === 0) {
			//this.scoreText.setText('ЛОШАРА!!!');
			this.playerLose();
			return;
		}
	}
	
	playerWin() {
		var win = this.add.image(360, 640, "textures", "win");
		this.fWin = win.setScale(1.2, 1.2);
	}
	
	playerLose() {
		this.isLose = true;
		var lose = this.add.image(360, 640, "textures", "lose");
		this.fLose = lose.setScale(1.2, 1.2);
		const restart = this.add.image(360, 900, "textures", "restart")
                .setInteractive();
	}
	


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
