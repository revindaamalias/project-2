import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";

class Product extends Component {
  // pengambilan data dari firebase
  constructor(props) {
    super(props);

    this.state = {
      listProduk: [],
      listCart: [],
    };
  }

  simpanDataKeServerAPI = () => {
    firebase.database().ref("/").set(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.simpanDataKeServerAPI();
    }
  }

  componentDidMount() {
    this._getProduct();
    console.log(this.state);
  }

  // Bagian bawah ini menggunakan fake api

  _getProduct = () => {
    let ref = firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  _onClickBeliProduct = (product) => {
    let nama = product.nama;
    let img = product.img;
    let harga = product.harga;
    let stok = product.stok;
    let id = product.id;
    let id_cart = new Date().getTime().toString();
    let qty = 1;
    let total = harga * qty;
    let status = true;

    console.log(product);

    if (product.stok === 0) {
      let { listProduk } = this.state;
      listProduk = listProduk.filter(function () {
        return true;
      });
      const indeksProduk = listProduk.findIndex((data) => {
        return data.id === id;
      });

      listProduk[indeksProduk].nama = nama;
      listProduk[indeksProduk].img = img;
      listProduk[indeksProduk].harga = harga;
      listProduk[indeksProduk].stok = stok;
      listProduk[indeksProduk].status = false;
      this.setState({ listProduk });
      alert("Stok Kosong");
      return;
    }

    //Update Produk
    if (id && nama && img && harga && stok) {
      let { listProduk } = this.state;
      listProduk = listProduk.filter(function () {
        return true;
      });
      const indeksProduk = listProduk.findIndex((data) => {
        return data.id === id;
      });
      listProduk[indeksProduk].nama = nama;
      listProduk[indeksProduk].img = img;
      listProduk[indeksProduk].harga = harga;
      listProduk[indeksProduk].stok = stok - 1;
      listProduk[indeksProduk].status = true;
      this.setState({ listProduk });
    } else if (nama && img && harga && stok) {
      const id = new Date().getTime().toString();
      const { listProduk } = this.state;
      listProduk.push({ id, nama, img, harga, stok, status });
      this.setState({ listProduk });
    }
    const { listCart } = this.state;
    const indeksCart = listCart.findIndex((data) => {
      return data.id == id && data.status == true;
    });
    console.log(indeksCart);
    console.log(listCart);
    if (indeksCart >= 0) {
      listCart[indeksCart].nama = nama;
      listCart[indeksCart].harga = harga;
      listCart[indeksCart].id = id;
      listCart[indeksCart].qty += 1;
      listCart[indeksCart].total = harga * listCart[indeksCart].qty;
      listCart[indeksCart].status = true;
      this.setState({ listCart });
    } else {
      listCart.push({ id_cart, nama, id, harga, qty, total, status });
      this.setState({ listCart });
    }

    //Update Cart
    alert("Berhasil menambahkan ke keranjang!");
  };
  listProduk() {
    return this.state.listProduk.map((product) => {
      return (
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="table-responsive">
              <div class="list-group">
                <div class="card h-1" height="10%">
                  <div class="card-body">
                    <div>
                      <img src={product.img} width="50%" />
                      <h4 class="card-title">
                        <a>{product.nama}</a>
                      </h4>
                      <h5>
                        Rp {product.harga.toLocaleString().replaceAll(",", ".")}
                      </h5>
                      <p class="card-text">
                        {product.stok} - {product.id}
                      </p>
                      <button
                        class="btn btn-sm btn-warning"
                        onClick={() => {
                          this._onClickBeliProduct(product);
                        }}
                      >
                        Buy
                      </button>
                      <br />
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div class="container">{this.listProduk()}</div>;
  }
}

export default Product;
