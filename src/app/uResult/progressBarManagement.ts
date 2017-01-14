class Progress {
	private value: number;
	private color: string;
	private bar = document.querySelectorAll('#prog-bar > .progress-bar')[0];

	constructor (n: number, c: string) {
  	this.value = n;
	this.color = c;
    this.update();
	
  }
  private update() {
  	this.bar.style.width = this.value + '%';
	this.bar.setForeground(this.color);
  }  
  countup(v) {
  	if (this.value < 100) { this.value += v; }
    this.update();
  }
  getBarValue(){
    return this.value;
  }
}
