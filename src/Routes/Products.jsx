import React, { Component } from 'react';
import '../css/products.css';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';

// making filtration using the name 
function searchingForProducts(term) {
    return function (x) {
        return x.Name.toLowerCase().includes(term.toLowerCase());
    }
}
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            'term': '',
            'productId': '',
            info: ''
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    // function for access our search
    searchHandler = ((e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    })
    // function for accsses id of products and put it in local storage
    sendIdOfProducts = ((e) => {
        e.preventDefault();
        this.setState({
            productId: this.state.productId = e.target.value,
        })
        let productId = this.state.productId;
        localStorage.setItem( this.productId(), JSON.stringify(productId));
    })
    productId() {
        return 'productOfId';
    }
    // to show the data who get from server
    componentDidMount() {
        let getProductApi = 'api/Goods',
            server = 'http://128.14.34.6:9090/';
        axios.get(server + getProductApi).then(res => {
            this.setState({ products: res.data });
            console.log(res.data);
        })
    }
    render() {
        // for going to Editing page
        let idOfProduct = this.state.productId;
        if (idOfProduct) {
            return <Redirect to='/editProducts' />
        }
        return (
            <div>
                <Navigation />
                <section className="addProduct" >
                    <h1 className="header">
                        <span>المنتجات</span>
                    </h1>
                    <form className='filter'>
                        <input list="browsers" onChange={this.searchHandler} value={this.state.name} name='term' className='searchAddProduct' placeholder='البحث عن المنتجات' /><br />
                        
                            <NavLink className="btn btn-default" to='/addProducts' >إضافة منتج جديد</NavLink>
                        
                    </form>
                </section>
                <div className="home text-center">
                    <div className="shadowHome">
                        {/* <div className="container"> */}
                        <div className="row">
                            <div className="allProducts">
                                {this.state.products.filter(searchingForProducts(this.state.term)).map(i => (
                                    <div key={i.Id} className="col-lg-2 col-md-6 col-sm-6 col-xs-12" >
                                        <div className="store"  >
                                            <h1>{i.Name}</h1>
                                            <hr />
                                            <ul>
                                                <li>السعر<span>{i.SellPrice}</span></li>
                                                <li>سعر الجمله<span>{i.BuyPrice}</span></li>
                                                <li>العدد بالكرتونه<span>{i.NumberOfBoxes}</span></li>
                                                <li>العدد بالقطعه<span>{i.NumberOfItemsInBox}</span></li>
                                                <li>الحد الأدنى<span>{i.AlertLimit}</span></li>
                                                {/* <li>وقت الإضافة<span>{i.AddtionDate}</span></li> */}
                                            </ul>
                                            <hr />
                                            <button className="btn btn-danger" value={i.Id} onClick={this.sendIdOfProducts}  >تعديل المنتج   </button>

                                        </div>
                                    </div>
                                ))}
                                {/* <input type="file" mltiple value=""/> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Product;