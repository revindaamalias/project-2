import React, { Component } from "react";
import "./Product.css";
import 'bootstrap/dist/css/bootstrap.css';

import firebase from "firebase";

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listProduk: []
        }
    } ambilDataDariServerAPI = () => { 
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        })
    }

    simpanDataKeServerAPI = () => {
        firebase.database()
            .ref("/")
            .set(this.state);
    }

    componentDidMount() { // komponen untuk mengecek ketika compnent telah di-mount-ing, maka panggil API 
        this.ambilDataDariServerAPI() // ambil data dari server API lokal 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.simpanDataKeServerAPI();
        }
    }

    listProduk() {
        return (
            this.state.listProduk.map(lp => {
                return (
                    <div className="starter-template" key={lp.id}>
                        <div className="row">
                            <div className="gambar-produk col-2">
                                <img src={lp.img} width="150px" height="150px" />
                            </div>
                            <div className="konten-produk col-10">
                                <h4>{lp.nama}</h4>
                                <p>{lp.ket}</p>
                                <p>Harga : Rp {lp.harga}</p>
                                <p>Stok : {lp.stok}</p>
                            </div>
                        </div>
                        <hr />
                        <br />
                    </div>
                )
            })
        )
    }
    render() {
        return (
            <div className="post-kulkas">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <h1 className="title-list">Product List</h1>
                    </div>
                </div>
                <hr />
                <br />
                {this.listProduk()}
            </div>
        )
    }
}
export default Product;