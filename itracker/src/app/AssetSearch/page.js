"use client"
import React, { Component } from "react";
import axios from "axios";

class Activities extends Component {
    state = {
        assets: [],
        loading: false,
        empty: true
    };

    async componentDidMount() {
        const { data: assets } = await axios.get(
            `https://65f8f806df151452461037b3.mockapi.io/Asset`
        );
        this.setState({ assets });
    }
    searchChanged = event => {
        this.setState({ search: event.target.value })
    }
    render() {
        return (
            <div>
                <input type='text' placeholder="Search" onChange={this.searchChanged} value={this.state.search} />
                <div>
                    {this.state.assets
                        .filter(asset => asset.assetName.includes(this.state.search))
                        .map(asset => (

                            <div key={asset.id} class="">
                                <p class="">{asset.assetName}</p>
                            </div>
                        )
                        )}
                </div>
            </div>
        );
    }
}

export default Activities;