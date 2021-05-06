import React, { Component } from "react";
import Post from "./Post";
import firebase from "firebase";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listProduk: [],
    };
  }

  ambilDataDariServerAPI = () => {
    let ref = firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  simpanDataKeServerAPI = () => {
    firebase.database().ref("/").set(this.state);
  };

  componentDidMount() {
    // komponen untuk mengecek ketika compnent telah di-mount-ing, maka panggil API
    this.ambilDataDariServerAPI(); // ambil data dari server API lokal
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.simpanDataKeServerAPI();
    }
  }

  handleHapusProduk = (id) => {
    // fungsi yang meng-handle button action hapus data
    const { listProduk } = this.state;
    const newState = listProduk.filter((data) => {
      return data.id !== id;
    });
    this.setState({ listProduk: newState });
  };

  handleTombolSimpan = (event) => {
    // fungsi untuk meng-handle tombol simpan
    let nama = this.refs.namaProduk.value;
    let img = this.refs.imgProduk.value;
    let harga = this.refs.hargaProduk.value;
    let stok = this.refs.stokProduk.value;
    let id = this.refs.id.value;

    if (id && nama && img && harga && stok) {
      const { listProduk } = this.state;
      const indeksProduk = listProduk.findIndex((data) => {
        return data.id === id;
      });

      listProduk[indeksProduk].nama = nama;
      listProduk[indeksProduk].img = img;
      listProduk[indeksProduk].harga = harga;
      listProduk[indeksProduk].stok = stok;
      this.setState({ listProduk });
    } else if (nama && img && harga && stok) {
      const id = new Date().getTime().toString();
      const { listProduk } = this.state;
      listProduk.push({ id, nama, img, harga, stok });
      this.setState({ listProduk });
    }
    this.refs.namaProduk.value = "";
    this.refs.imgProduk.value = "";
    this.refs.hargaProduk.value = "";
    this.refs.stokProduk.value = "";
    this.refs.id.value = "";
  };

  render() {
    return (
      <div className="post-product mt-3 col-sm-12 my-5">
        <div className="form pb-2 border-bottom">
          <div className="form-group row">
            <label htmlFor="nama" className="col-sm-2 col-form-label">
              Nama
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                ref="namaProduk"
                placeholder="Masukkkan nama produk..."
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="img" className="col-sm-2 col-form-label">
              Gambar
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="img"
                name="img"
                rows="3"
                ref="imgProduk"
                placeholder="Masukkan Link gambar..."
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="harga" className="col-sm-2 col-form-label">
              Harga
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="harga"
                name="harga"
                ref="hargaProduk"
                placeholder="Masukkan harga produk..."
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="stok" className="col-sm-2 col-form-label">
              Stok
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="stok"
                name="stok"
                ref="stokProduk"
                placeholder="Masukkan stok produk..."
              />
            </div>
          </div>
          <input type="hidden" name="id" ref="id" />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.handleTombolSimpan}
          >
            Simpan
          </button>
        </div>
        <h2 className="text-center my-5">Daftar Produk</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">Harga</th>
                <th scope="col">Stok</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listProduk.map((produk) => {
                return (
                  <Post
                    key={produk.id}
                    nama={produk.nama}
                    harga={produk.harga}
                    stok={produk.stok}
                    hapusProduk={() => this.handleHapusProduk(produk.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AddProduct;
