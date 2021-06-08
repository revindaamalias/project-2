import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import mesin from "../assets/mesin_.jpg";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  withRouter,
} from "react-router-dom";

class Keranjang extends Component {
  state = {
    listCart: [],
    listProduk: []
  };

  simpanDataKeServerAPI = () => {
    firebase.database().ref("/").set(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.simpanDataKeServerAPI();
    }
  }


  componentDidMount() {
    let ref = firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  }

  _onClickCheckout() {
    const {listCart} = this.state;
    let itunganCheckout = 0;
    let totalCheckout = 0;
    const showCart = listCart.filter((data) => {
      return data.status == true;
    });
    console.log(showCart.length);
    if (showCart.length > 0){
      for (const Cartitem of listCart){
        if(Cartitem.status == true){
          itunganCheckout += 1;
          totalCheckout += Cartitem.total;
        }
      }
      this._onClickClearCart();
        alert('Checkout Berhasil\nTotal Item : '+itunganCheckout+'\nTotal Bayar : Rp.'+totalCheckout);
      }
    else {
      alert('Tidak ada Item untuk Checkout');
      }
    }
    
    


  _onClickClearCart = () => {
    const {listCart} = this.state;
    for (const Cartitem of listCart){
      Cartitem.status = false
    }
    this.setState({ listCart });
    console.log(this.state);
    console.log(listCart);
  }

  showTotalCart() {
    const {listCart} = this.state;
    const showCart = listCart.filter((data) => {
      return data.status == true;
    });
    if(showCart){
      return (showCart
                  .reduce((acc, curr) => acc + curr.total, 0)
                  .toLocaleString()
                  .replaceAll(",", "."))
    }
    else {
      return(0)
    }
  }


  listsCart() {
    const {listCart} = this.state;
    const showCart = listCart.filter((data) => {
      return data.status == true;
    });
    if(showCart){
      return (
          showCart.map((Keranjang) => (
                    <tr>
                      <td scope="col"></td>
                      <td scope="col">
                        <h5>{Keranjang.nama}</h5>
                      </td>
                      <td scope="col" className="text-left">
                        <div>
                         Rp{" "}
                          {Keranjang.harga}
                        </div>
                      </td>
                      <td scope="col" className="text-center">
                        <div>{Keranjang.qty}</div>
                      </td>
                      <td scope="col" className="text-right">
                        <div>
                          Rp{" "}
                          {Keranjang.total
                            .toLocaleString()
                            .replaceAll(",", ".")}
                        </div>
                      </td>
                      <br />
                    </tr>
                  ))
        )
    }
    else {
      return (
      <h2> Tidak ada produk di keranjang </h2>
      )
    }
  }

  

  render() {
    return (
      <div className="container">
        <h1 className="my-4">Cart</h1>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-right">
                      Total
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.listsCart()}
                </tbody>
              </table>
              <h5 scope="col" className="text-center">
                Total Price Rp {""}{" "}
                {this.showTotalCart()}
              </h5>
              <div className="row">
                <div className="col col-6">
                  <button
                            class="btn btn-danger pull-right"
                            onClick={() => {
                              this._onClickClearCart();
                            }}
                          >
                            Clear Cart
                          </button>
                </div>
                <div className="col col-6">
                  <button
                            class="btn btn-success"
                            onClick={() => {
                              this._onClickCheckout();
                            }}
                          >
                            Checkout
                          </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Keranjang;
