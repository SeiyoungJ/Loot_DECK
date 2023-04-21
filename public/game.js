const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.Fit,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  }
  
  const game = new Phaser.Game(config)
  
  function preload() {
    // preload assets

    this.load.image('id_1', './assets/id_1.png');
    this.load.image('id_2', './assets/id_2.png');
    this.load.image('id_3', './assets/id_3.png');
    this.load.image('id_4', './assets/id_4.png');
    this.load.image('id_5', './assets/id_5.png');
    
  }
  
  function create() {
    // create game objects
    console.log("The game have been created")
    var image1 = this.add.sprite(100,200, 'id_1').setInteractive();
    var image2 = this.add.sprite(300,200, 'id_2').setInteractive();
    var image3 = this.add.sprite(500,200, 'id_3').setInteractive();
    var image4 = this.add.sprite(700,200, 'id_4').setInteractive();
    var image5 = this.add.sprite(900,200, 'id_5').setInteractive();

    image1.setScale(0.3);
    image2.setScale(0.3);
    image3.setScale(0.3);
    image4.setScale(0.3);
    image5.setScale(0.3);

    this.input.setDraggable([ image1, image2, image3, image4, image5 ]);
    
    this.input.on('gameobjectover', function (pointer, gameObject) {

        gameObject.setTint(0x00ff00);

    });

    this.input.on('gameobjectout', function (pointer, gameObject) {

        gameObject.clearTint();

    });

    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });
    
    }
  

  function update() {
    // update game logic
    }