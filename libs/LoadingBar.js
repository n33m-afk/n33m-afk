class LoadingBar {
	constructor(options) {
		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
		this.domElement.style.background = 'rgba(255, 165, 0, 0.7)'; // orange with 70% opacitybackground
		this.domElement.style.display = 'flex';
		this.domElement.style.flexDirection = 'column';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = '1111';

		// Loading text
		const loadingText = document.createElement("div");
		loadingText.innerText = "Loading...";
		loadingText.style.color = '#ffffff'; // white text
		loadingText.style.fontSize = '18px';
		loadingText.style.fontWeight = 'bold';
		loadingText.style.marginBottom = '20px';
		this.domElement.appendChild(loadingText);

		// Bar container
		const barBase = document.createElement("div");
		barBase.style.background = '#aaa';
		barBase.style.width = '50%';
		barBase.style.minWidth = '250px';
		barBase.style.height = '15px';
		barBase.style.borderRadius = '0';
		this.domElement.appendChild(barBase);

		// Progress bar
		const bar = document.createElement("div");
		bar.style.background = '#800080';
		bar.style.width = '0';
		bar.style.height = '100%';
		bar.style.borderRadius = '0';
		barBase.appendChild(bar);

		this.progressBar = bar;

		document.body.appendChild(this.domElement);
	}

	set progress(delta) {
		const percent = delta * 100;
		this.progressBar.style.width = `${percent}%`;
	}

	set visible(value) {
		this.domElement.style.display = value ? 'flex' : 'none';
	}
}

export { LoadingBar };
