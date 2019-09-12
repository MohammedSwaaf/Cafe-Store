import React, { Component } from 'react';
import '../css/addProducts.css';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';
import swal from 'sweetalert';


class addProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Initi data
            'Name': '',
            'SellPrice': '',
            'BuyPrice': '',
            'Count': '',
            'AlertLimit': '',
            'catID': 5,
            "SellerId": 2,
            'countOfItems': '',
            categories: []
        }
    }
    // To get value of users
    getData = ((e) => {
        e.preventDefault();
        // For puting the new data in state
        this.setState({
            [e.target.name]: e.target.value,
        });
    });
    // send updated state to server
    sendDate = ((e) => {
        e.preventDefault();
        // server is receiving data
        let AddProductApi = 'api/Goods/',
            server = 'http://128.14.34.6:9090/';
        axios.post(server + AddProductApi, {
            'Name': this.state.Name,
            'SellPrice': this.state.SellPrice,
            'BuyPrice': this.state.BuyPrice,
            'NumberOfBoxes': this.state.Count,
            'AlertLimit': this.state.AlertLimit,
            'CategoryId': this.state.catID,
            "SellerId": this.state.SellerId,
            'NumberOfItemsInBox': this.state.countOfItems
        })
            .then(res => {
                let resp = res.data;
                this.setState({ info: resp });
                swal(resp)
            }).catch(error => {
                console.log(error.response.data.Message);
                // swal(error.response.data.Message)
            });
        let nameOfProduct = 'من فضلك أدخل إسم المنتج',
            priceOfProduct = 'من فضلك أدخل سعر المنتج',
            buyPriceOfProduct = 'من فضلك أدخل سعر الجمله للمنتج',
            numOfBoxes = 'من فضلك أدخل عدد كراتين المنتج',
            numOfPices = 'من فضلك أدخل عدد القطع فى الكرتونه',
            minimumBoxes = 'من فضلك أدخل الحد الأدنى للكراتين';
        if (this.state.Name === '') {
            alert(nameOfProduct)
        } else if (this.state.SellPrice === '') {
            alert(priceOfProduct)
        } else if (this.state.BuyPrice === '') {
            alert(buyPriceOfProduct)
        } else if (this.state.Count === '') {
            alert(numOfBoxes)
        } else if (this.state.AlertLimit === '') {
            alert(numOfPices)
        } else if (this.state.countOfItems === '') {
            alert(minimumBoxes)
        } else {
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('buyPrice').value = '';
            document.getElementById('num').value = '';
            document.getElementById('alert').value = '';
            document.getElementById('numOfPice').value = '';
        }
    })

    //Request for Get dropdown menu from server
    componentDidMount() {
        let getProductApi = 'api/Products/AddProductPage',
            server = 'http://128.14.34.6:9090/';
        axios.get(server + getProductApi).then(res => {
            this.setState({ categories: res.data });
        })
        // console.log(this.state.categories);

    }



    render() {
        return (
            <div>
                <Navigation />
                <section className="addProducts" >
                    <div className="container sending">
                        <form >
                            <h1 className="header">
                                <span>إضافـة منتج</span>
                            </h1>
                            <div className="form-group">


                                {/* <h2 className='lable'>إسم المنتج</h2> */}

                                <input type="text" className="form-control" id='name' onChange={this.getData} placeholder="إسـم المنتـج"
                                    value={this.state.name} name='Name' />
                            </div>
                            {/* <div className="form-group">
                                <select className="custom-select" id="inputGroupSelect01" name='catID' placeholder="hi" onChange={this.getData}>
                                    <option value="">إختار ...</option>
                                    {this.state.categories.map(i => (
                                        <option key={i.Id} value={i.Id}  >{i.Name}</option>
                                    ))}

                                </select>
                            </div> */}
                            <div className="form-group">

                                <input type="text" className="form-control" onChange={this.getData} maxLength='4' id='price' placeholder="السعر"
                                    value={this.state.name} name='SellPrice' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.getData} maxLength='4' id='buyPrice' placeholder="سعر الجملة"
                                    value={this.state.name} name='BuyPrice' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.getData} maxLength='4' id='num' placeholder=" العدد بالكرتونه"
                                    value={this.state.name} name='Count' />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.getData} maxLength='4' id='numOfPice' placeholder=" العدد بالقطعه"
                                    value={this.state.name} name='countOfItems' />
                            </div>
                            <div className="form-group">

                                <input type="text" className="form-control" onChange={this.getData} maxLength='4' id='alert' placeholder="الحد الأدنى"
                                    value={this.state.name} name='AlertLimit' />
                            </div>




                            <button type="submit" onClick={this.sendDate} className="dataOfUsers btn-default">إضافة +</button>
                            {/* {this.state.info.map(i => (
                                <h1>{i}</h1>
                            ))} */}
                            {/* <h1 className='name'>{this.state.info.Name}</h1>
                            <h1 className='name'>{this.state.info.Id}</h1>
                            <h1 className='name'>{this.state.info.Ta2re4a}</h1> */}

                            {/* <form action="" className='filter'>

                                <input list="browsers" className='search' name="browser" />
                                <datalist id="browsers">
                                    <option value="شوكولاته" />
                                    <option value="نيسكافيه" />
                                    <option value="بسكويت" />
                                    <option value="بيبسى" />
                                    <option value="شويبس" />
                                    <option value="لب" />
                                </datalist>
                                <button type="submit" />
                            </form> */}

                        </form>

                    </div>
                </section>
            </div>
        );
    }
}
export default addProducts;