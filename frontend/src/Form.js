import React, {Component } from 'react'
import axios from 'axios';


class Form extends Component {
	constructor(props){
		super(props)

		this.state = {
			num1: '',
			num2: '',
			num3: '',
			result: 0
		}
	};

	handleNum1Change = (event) => {
		this.setState({
			num1: event.target.value
		})
	};
	handleNum2Change = (event) => {
		this.setState({
			num2: event.target.value
		})
	};
	handleNum3Change = (event) => {
		this.setState({
			num3: event.target.value
		})
	};
	handleSubmit = async (event) => {
		event.preventDefault();
		const helloResponse = await axios.get(`/api/calculate/${this.state.num1}/${this.state.num2}/${this.state.num3}`);
		this.state.result = helloResponse.data;
		this.setState({
			result: this.state.result + 1
		})
		console.log(helloResponse);
	};


	render() {
		const {result} = this.state
		return(
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Number 1</label>
					<input
					type="text"
					value={this.state.num1}
					onChange={this.handleNum1Change}
					/>
					<label>Number 2</label>
					<input
					type="text"
					value={this.state.num2}
					onChange={this.handleNum2Change}
					/>
					<label>Number 3</label>
					<input
					type="text"
					value={this.state.num3}
					onChange={this.handleNum3Change}
					/>

					<button type="submit"> Calculate </button>
					<br/>
					Result: {result}
				</div>
			</form>
		)
	}
	componentDidMount(){
		this.myInterval = setInterval(()=>{
			// this.setState({
				// result: this.state.result + 1
			// });
		}, 1000);

	}

}

export default Form
