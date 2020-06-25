import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			products: ["NETGEAR", "TPLINK", "ACER"],
			markets: ["EBAY", "AMAZON"],
			csv_headers:
				<tr>
					<th>SKU</th>
					<th>Title</th>
					<th>Price</th>
					<th>Currency</th>
					<th>Shipping Cost</th>
					<th>Total Sold</th>
					<th>Shop Name</th>
					<th>URL</th>
					<th>UPC</th>
				</tr>,
			csv:
				<table className="csv">
					<tr>
						<th>SKU</th>
						<th>Title</th>
						<th>Price</th>
						<th>Currency</th>
						<th>Shipping Cost</th>
						<th>Total Sold</th>
						<th>Shop Name</th>
						<th>URL</th>
						<th>UPC</th>
					</tr>
				</table>,
			data: []
        };
	}
	
    render() {
		return(
			<div className="App">
				<form id="submitForm" className="Submit"
					onSubmit={this.sendInput}>
					{this.productInput()}
					{this.marketInput()}
					{this.submitInput()}
				</form>
				{this.state.csv}
        	</div>
		);
	}

	productInput = () => {
        var options = [];
        options.push(<option 
                    value="" 
                    selected disabled hidden
                    >
                    Select Product
                    </option>);

        for(var i = 0; i < this.state.products.length; i++){
            options.push(<option
                        value={this.state.products[i]}
                        >
                        {this.state.products[i]}  
                        </option>);
        }

        return(
            <select name='products' id='productSelect' className='Select'>
                {options}
            </select>
        )
	}
	
	marketInput = () => {
        var options = [];
        options.push(<option 
                    value="" 
                    selected disabled hidden
                    >
                    Select Market
                    </option>);

        for(var i = 0; i < this.state.markets.length; i++){
            options.push(<option
                        value={this.state.markets[i]}
                        >
                        {this.state.markets[i]}  
                        </option>);
        }

        return(
            <select name='markets' id='marketsSelect' className='Select'>
                {options}
            </select>
        )
	}
	
	submitInput = () => {
		return(
			<button type="submit" id="submitInput" form="submitForm" className='Button'>
				SUBMIT
			</button>
		)
	}

	sendInput = (e) => {
		e.preventDefault();
		const product = e.target.products.value;
		const market = e.target.markets.value;

		const options = {
			method: "GET",
			headers: {'Content-Type':'application/json'},
			crossDomain:true
		}

		fetch("http://127.0.0.1:5000/compute" + 
			"?product=" + 
			product +
			"&market=" +
			market, options).then(res=>res.json()).then(json=>{
				this.setState({data : json});
				var output = [];
				for(var i = 0; i < this.state.data.length; i++){
					var data = [];
		
					//temp check
					if(this.state.data[i].length != 9) continue;
		
					for(var j = 0; j < this.state.data[i].length; j++){
						data.push(<td>
							{this.state.data[i][j]}
						</td>);
					}
		
					output.push(<tr>
						{data}
					</tr>);
				}
		
				this.setState({
					csv: <table className="csv">
						{this.state.csv_headers}
						{output}
					</table>
				});
			});
		
	}
}

export default App;
