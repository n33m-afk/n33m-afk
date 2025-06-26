class LoadingBar {
	constructor(options) {
		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
		this.domElement.style.background = '#fff'; // White background
		this.domElement.style.border = '5px solid black'; // Black border
		this.domElement.style.boxSizing = 'border-box'; // Include border in sizing
		this.domElement.style.display = 'flex';
		this.domElement.style.flexDirection = 'column';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = '1111';

		// Loading text
		const loadingText = document.createElement("div");
		loadingText.innerText = "Loading...";
		loadingText.style.color = '#000'; // Black text
		loadingText.style.fontSize = '18px';
		loadingText.style.marginBottom = '20px';
		this.domElement.appendChild(loadingText);

		// Bar container
		const barBase = document.createElement("div");
		barBase.style.background = '#ccc'; // Slightly lighter gray
		barBase.style.width = '50%';
		barBase.style.minWidth = '250px';
		barBase.style.height = '15px';
		barBase.style.borderRadius = '0'; // Rectangle shape
		this.domElement.appendChild(barBase);

		// Progress bar
		const bar = document.createElement("div");
		bar.style.background = '#800080'; // Purple
		bar.style.width = '0';
		bar.style.height = '100%';
		bar.style.borderRadius = '0'; // Rectangle shape
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
