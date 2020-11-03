import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
	state = {
		stocks: [],
		myStocks: [],
		sortSelection: "null",
	};

	componentDidMount() {
		fetch("http://localhost:3000/stocks")
			.then((res) => res.json())
			.then((stocks) => this.setState({ stocks }));
	}

	// handleClick = (stock) => {
	//   if (!this.state.myStocks.includes(stock)) {
	//     this.setState({
	//       myStocks: [...this.state.myStocks, stock]
	//     })}
	//   else {this.setState({
	//     myStocks: [...this.state.myStocks.filter(s => s !== stock)]
	//   })}
	// }

	addStock = (stock) => {
		if (!this.state.myStocks.includes(stock)) {
			this.setState({
				myStocks: [...this.state.myStocks, stock],
			});
		}
	};

	sellStock = (stock) => {
		this.setState({
			myStocks: [...this.state.myStocks.filter((s) => s !== stock)],
		});
	};

	changeSort = (e) => {
		this.setState({
			sortSelection: e.target.value,
		});
		this.sortStocks();
	};

	sortStocks = () => {
		if (this.state.sortSelection === "Alphabetically") {
			return this.state.stocks.sort((a, b) => (a.name > b.name ? 1 : -1));
		} else if (this.state.sortSelection === "Price") {
			return this.state.stocks.sort((a, b) => (a.price > b.price ? 1 : -1));
		}
	};

	render() {
		return (
			<div>
				<SearchBar changeSort={this.changeSort} />

				<div className="row">
					<div className="col-8">
						<StockContainer
							stocks={this.state.stocks}
							addStock={this.addStock}
						/>
					</div>
					<div className="col-4">
						<PortfolioContainer
							myStocks={this.state.myStocks}
							sellStock={this.sellStock}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContainer;
