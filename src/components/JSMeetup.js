import React, { Component } from 'react';
import './Style.scss';

class JSMeetup extends Component {
	state = {
		messageFromComponent: ''
	}
	setRef = (ref) => this.webComponentRef = ref;

	animateButton = (button) => {
		var duration = 0.3,
			delay = 0.08;
		window.TweenMax.to(button, duration, { scaleY: 1.6, ease: window.Expo.easeOut });
		window.TweenMax.to(button, duration, { scaleX: 1.2, scaleY: 1, ease: window.Back.easeOut, easeParams: [3], delay: delay });
		window.TweenMax.to(button, duration * 1.25, { scaleX: 1, scaleY: 1, ease: window.Back.easeOut, easeParams: [6], delay: delay * 3 });
	}

	componentDidMount() {
		this.webComponentRef.onData = this.onDataFromComponent;
	}

	onDataFromComponent = (data) => {
		this.setState({ messageFromComponent: data })
	};

	toggleSideDrawer = () => {
		if (!this.webComponentRef.opened) {

			setTimeout(() => {
				this.webComponentRef.open();
			}, 500);

			let button = document.querySelector('.button');
			this.animateButton(button);
		}
	};

	onTitleChange = () => {
		const textInput = document.getElementById('text-input').value;
		this.webComponentRef.setTitle(textInput);
	}


	render() {
		return (
			<React.Fragment>

				<h2>{this.state.messageFromComponent}</h2>
				<button className="button" onClick={this.toggleSideDrawer}><p>React Button</p></button>
				<uc-side-drawer ref={this.setRef}>
					<nav className='side-nav'>
						<ul>
							<li><a href="/">First Link</a></li>
							<li><a href="/">Second Link</a></li>
							<li><a href="/">Third Link</a></li>
						</ul>
					</nav>
					<div>
						<input type="text" id="text-input"></input>
						<button className="button" onClick={this.onTitleChange}><p>Click to change title from React</p></button>

					</div>
				</uc-side-drawer>


			</React.Fragment>
		);
	}
}

export default JSMeetup;