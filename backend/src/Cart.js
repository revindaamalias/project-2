import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import mesin from "../assets/mesin_.jpg";

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
    listKeranjang: [],
  };

  componentDidMount() {
    fetch("http://localhost:3002/keranjang")
      .then((response) => response.json())
      .then((listKeranjang) => {
        this.setState({ listKeranjang });
      })
      .catch(() => {
        alert("Gagal Ambil Keranjang");
      });
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
                  {this.state.listKeranjang.map((Keranjang) => (
                    <tr>
                      <td scope="col"></td>
                      <td scope="col">
                        <h5>{Keranjang.nama}</h5>
                      </td>
                      <td scope="col" className="text-left">
                        <div>
                          Rp{" "}
                          {Keranjang.harga
                            .toLocaleString()
                            .replaceAll(",", ".")}
                        </div>
                      </td>
                      <td scope="col" className="text-center">
                        <div>{Keranjang.qyt}</div>
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
                  ))}
                </tbody>
              </table>
              <h5 scope="col" className="text-center">
                Total Price Rp {""}{" "}
                {this.state.listKeranjang
                  .reduce((acc, curr) => acc + curr.total, 0)
                  .toLocaleString()
                  .replaceAll(",", ".")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Keranjang;
