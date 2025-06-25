/**
 * @author mrdoob
 * Modified by ChatGPT for circular VR button with icon
 */

class VRButton {

	constructor(renderer, options) {
		this.renderer = renderer;

		if (options !== undefined) {
			this.onSessionStart = options.onSessionStart;
			this.onSessionEnd = options.onSessionEnd;
			this.sessionInit = options.sessionInit;
			this.sessionMode = (options.inline !== undefined && options.inline) ? 'inline' : 'immersive-vr';
		} else {
			this.sessionMode = 'immersive-vr';
		}

		if (this.sessionInit === undefined)
			this.sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] };

		if ('xr' in navigator) {

			const button = document.createElement('button');
			button.style.display = 'none';
			button.style.height = '50px';

			navigator.xr.isSessionSupported(this.sessionMode).then((supported) => {
				supported ? this.showEnterVR(button) : this.showWebXRNotFound(button);
				if (options && options.vrStatus) options.vrStatus(supported);
			});

			document.body.appendChild(button);

		} else {

			const message = document.createElement('a');

			if (window.isSecureContext === false) {
				message.href = document.location.href.replace(/^http:/, 'https:');
				message.innerHTML = 'WEBXR NEEDS HTTPS';
			} else {
				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';
			}

			message.style.left = '0px';
			message.style.width = '100%';
			message.style.textDecoration = 'none';

			this.stylizeElement(message, false);
			message.style.bottom = '0px';
			message.style.opacity = '1';

			document.body.appendChild(message);

			if (options && options.vrStatus) options.vrStatus(false);
		}
	}

	showEnterVR(button) {

		let currentSession = null;
		const self = this;

		this.stylizeElement(button, true);

		function onSessionStarted(session) {
			session.addEventListener('end', onSessionEnded);

			self.renderer.xr.setSession(session);
			button.style.background = 'rgba(180,20,20,1)';
			button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';

			currentSession = session;

			if (self.onSessionStart !== undefined) self.onSessionStart();
		}

		function onSessionEnded() {
			currentSession.removeEventListener('end', onSessionEnded);

			button.style.background = 'rgba(20,150,80,1)';
			button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';

			currentSession = null;

			if (self.onSessionEnd !== undefined) self.onSessionEnd();
		}

		button.style.display = '';
		button.style.right = '20px';
		button.style.width = '50px';
		button.style.height = '50px';
		button.style.cursor = 'pointer';
		button.style.fontSize = '20px';
		button.style.lineHeight = '50px';
		button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';

		button.onmouseenter = function () {
			button.style.opacity = '1.0';
		};

		button.onmouseleave = function () {
			button.style.opacity = '0.5';
		};

		button.onclick = function () {
			if (currentSession === null) {
				navigator.xr.requestSession(self.sessionMode, self.sessionInit).then(onSessionStarted);
			} else {
				currentSession.end();
			}
		};
	}

	disableButton(button) {
		button.style.cursor = 'auto';
		button.style.opacity = '0.5';
		button.onmouseenter = null;
		button.onmouseleave = null;
		button.onclick = null;
	}

	showWebXRNotFound(button) {
		this.stylizeElement(button, false);
		this.disableButton(button);

		button.style.display = '';
		button.style.width = '100%';
		button.style.right = '0px';
		button.style.bottom = '0px';
		button.style.border = '';
		button.style.opacity = '1';
		button.style.fontSize = '13px';
		button.textContent = 'VR NOT SUPPORTED';
	}

	stylizeElement(element, active = true) {
		element.style.position = 'absolute';
		element.style.bottom = '20px';
		element.style.width = '50px';
		element.style.height = '50px';
		element.style.borderRadius = '50%';
		element.style.border = '2px solid #fff';
		element.style.background = active ? 'rgba(20,150,80,1)' : 'rgba(180,20,20,1)';
		element.style.color = '#fff';
		element.style.display = 'flex';
		element.style.alignItems = 'center';
		element.style.justifyContent = 'center';
		element.style.fontSize = '20px';
		element.style.opacity = '0.5';
		element.style.cursor = 'pointer';
		element.style.outline = 'none';
		element.style.zIndex = '999';
	}
}

export { VRButton };
