import React, { Component } from 'react';
import '../css/EditProduct.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            SellPrice: '',
            BuyPrice: '',
            NumberOfBoxes: '',
            NumberOfItemsInBox: '',
            AlertLimit: '',
            info: '',
            done: false
        }
    }
    getData = ((e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    })
    // to show the data who get from server
    componentDidMount() {
        let editProducts = 'api/Goods/',
            server = 'http://128.14.34.6:9090/',
            id = JSON.parse(localStorage.getItem('productOfId'));
        axios.get(server + editProducts + id).then(res => {
            let resp = res.data;
            this.setState({
                Name: resp.Name,
                SellPrice: resp.SellPrice,
                BuyPrice: resp.BuyPrice,
                NumberOfBoxes: resp.NumberOfBoxes,
                NumberOfItemsInBox: resp.NumberOfItemsInBox,
                AlertLimit: resp.AlertLimit
            });
            console.log(res.data);
        })};
    updateDateOfproduct = ((e) => {
        e.preventDefault();
        let updatData = 'api/Goods/',
            server = 'http://128.14.34.6:9090/',
            moo = JSON.parse(localStorage.getItem('productOfId'));
        axios.put(server + updatData + moo, {
            Name: this.state.Name,
            SellPrice: this.state.SellPrice,
            BuyPrice: this.state.BuyPrice,
            NumberOfItemsInBox: this.state.NumberOfItemsInBox,
            AlertLimit: this.state.AlertLimit,
        })
            .then(res => {
                let resp = res.data;
                swal(resp);
                this.setState({
                    info: resp,
                    done: true
                })
            }).catch(fuckOff => {
                console.log(fuckOff.response.data.Message);
                swal(fuckOff.response.data.Message);
            });
        console.table(this.state);
        localStorage.removeItem('productOfId');
    });
    render() {
        let moveOn = this.state.done;
        if (moveOn === true) {
            return <Redirect to='/products' />;
        };
        return (
            <div>
                <Navigation />
                <section className="editProducts text-center" >
                    <div className="container sending">
                        <form >
                            <h1 className=' headPage text-center'>تعديل المنتجات</h1>
                            <div className="contain">
                                <div className="firstInput col-md-12">
                                    <div className="form-group col-md-9">
                                        <input type="text" className="form-control" onChange={this.getData} placeholder=" إسـم المنتـج"
                                            value={this.state.Name} name='Name' />
                                    </div>
                                    <h1 className="header col-md-3">
                                        <span>إسم المنتج</span>
                                    </h1>
                                </div>
                                <div className="seconedInput col-md-12">
                                    <div className="form-group col-md-9">
                                        <input type="text" className="form-control" onChange={this.getData} placeholder="تعديل السعر"
                                            value={this.state.SellPrice} name='SellPrice' />
                                    </div>
                                    <h1 className="header col-md-3">
                                        <span> سعر المنتج</span>
                                    </h1>
                                </div>
                                <div className="thirdInput col-md-12">
                                    <div className="form-group col-md-9">
                                        <input type="text" className="form-control" onChange={this.getData} placeholder="تعديل سعر الجملة"
                                            value={this.state.BuyPrice} name='BuyPrice' />
                                    </div>
                                    <h1 className="header col-md-3">
                                        <span> سعر الجملة</span>
                                    </h1>
                                </div>
                                <div className="fourthInput col-md-12">
                                    <div className="form-group col-md-9">
                                        <input type="text" className="form-control" onChange={this.getData} placeholder="تعديل العدد"
                                            value={this.state.NumberOfItemsInBox} name='NumberOfItemsInBox' />
                                    </div>
                                    <h1 className="header col-md-3">
                                        <span>عدد القطع</span>
                                    </h1>
                                </div>
                                <div className="fifthInput col-md-12">
                                    <div className="form-group col-md-9">
                                        <input type="text" className="form-control" onChange={this.getData} placeholder="تعديل الحد الأدنى "
                                            value={this.state.AlertLimit} name='AlertLimit' />
                                    </div>
                                    <h1 className="header col-md-3">
                                        <span>الحد الأدني</span>
                                    </h1>
                                </div>
                            </div>
                            <div>
                                <button type="submit" onClick={this.updateDateOfproduct} className="btn btn-sm text-center btn-danger">تعديـل</button>
                            </div>
                        </form>

                    </div>
                </section>
            </div>
        );
    }
}
export default EditProduct;