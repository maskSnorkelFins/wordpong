function Ball() {
	this.start = 0;
	this.word;
	this.speed = -0.33;
	this.x = 360;
	this.bindLeft = 160;
	this.bindRight = 530;
	this.animID;
	this.atBorder = false;
	this.scoreRising = 0;
	this.ballScoreInterval;
}