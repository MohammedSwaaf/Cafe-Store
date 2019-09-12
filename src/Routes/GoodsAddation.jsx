import React, { Component } from 'react';
import '../css/GoodsAddation.css';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';
import swal from 'sweetalert';
class GoodsAddation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'Number': '',
            'catID': '',
            "SellerId": 2,
            "TagerId": 1,
            categories: [],
            khalafProducts: [],
            'info': ''
        }
    }
    // Function to get data from the users
    getData = ((e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            // SellerId:this.state.SellerId === 2
        })
    });
    // Function to send data who got from the users to server
    sendDate = ((e) => {
        e.preventDefault();
        let getAddationApi = 'api/GoodsAddtion',
            server = 'http://128.14.34.6:9090/';
            // Post request to send data
        axios.post(server + getAddationApi, {
            'NumberOfBoxes': this.state.Number,
            'GoodsId': this.state.catID,
            'SellerId': this.state.SellerId,
            'TagerId': this.state.TagerId,
            // 'Ids':this.state.Ids
        })
        // the response who back from post request
            .then(res => {
                this.setState({ info: respo })
                let respo = res.data;
                console.log(respo);
                swal(respo);
            }).catch(error => {
                console.log(error.response.data.Message);
                swal(error.response.data.Message)
            });

            /*
            
            
            
            
            */ 
        console.log(this.state.catID,this.state.Number,this.state.TagerId,this.state.SellerId);
        // Simple Valdiation
        let Products = 'من فضلك أدخل المنتج',
            numOfBoxes = 'من فضلك أدخل عدد البضاعه المضافه ';
        if (document.getElementById('inputGroupSelect01').value === '') {
            swal(Products)
        } else if (document.getElementById('numOfAddProducts').value === '') {
            swal(numOfBoxes)
        } else {
            document.getElementById('inputGroupSelect01').value = '';
            document.getElementById('numOfAddProducts').value = '';
        };
        // set state to make the inputs empty after send the data
        this.setState({
            catID: this.state.catID === '',
            Number: this.state.Number === '',
        })
        // alert(this.state.SellerId);
        // let selId = this.state.catID;
        // localStorage.setItem('SellerId', JSON.stringify(selId));
    })
    //Request for Get dropdown menu from server
    componentWillUpdate() {
        // array of products
        let getProductApi = 'api/GoodsAddtion',
            server = 'http://128.14.34.6:9090/';
        axios.get(server + getProductApi).then(res => {
            this.setState({ khalafProducts: res.data });
        })
        // console.log(this.state);
    }
    componentDidMount() {
        // table for view the products of store
        let getProductApi = 'api/GoodsAddtion/GoodsAddtionPage',
            server = 'http://128.14.34.6:9090/';
        axios.get(server + getProductApi).then(res => {
            this.setState({ categories: res.data });
        })
    }
    render() {
        // console.log(this.props.title);
        return (
            <div>
                <Navigation />
                <section className="addProducts" >
                    <div className=" items">
                        <div className='titleOfHead'>
                            <h1 className="head"><span>إختيـار المنتـج</span></h1>
                        </div>
                        <form className='container-fluid'>
                            <div className="form-group ">
                                <select className="custom-select goods" id="inputGroupSelect01" name='catID' placeholder="hi" onChange={this.getData}>
                                    <option value="">إختار ...</option>
                                    {this.state.categories.map(i => (
                                        <option key={i.Id} className='option' value={i.Id} >{i.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="add">
                                <input type='text' className='num' id='numOfAddProducts' placeholder='العدد' maxLength='4' onChange={this.getData} value={this.state.name} name='Number' />
                                <button type="submit" onClick={this.sendDate} className="dataOfUsers btn-default">إضافة +</button>
                            </div>
                        </form>
                        <table className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>التاريخ</th>
                                    <th>الوقت</th>
                                    <th>إسم المنتج</th>
                                    <th>العدد المضاف</th>
                                    <th>العدد السابق</th>
                                    <th>إجمالى العدد</th>
                                    <th>سعر الجمله</th>
                                    <th>سعر البيع</th>
                                    <th>صافى الربح</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.khalafProducts.map(i =>
                                    (
                                        <tr >
                                            <td key={i.Id} className='mosalsal'>{i.Date}</td>
                                            <td className='mosalsal'>{i.Time}</td>
                                            <td className='names'>{i.GoodsName}</td>
                                            <td className='newNum'>{i.NumberOfBoxes}</td>
                                            <td className='oldNum'>{i.PreviousNumberOfBoxes}</td>
                                            <td className='info totNum'>{i.UpdatedNumberOfBoxes}</td>
                                            <td className='buyPrice'>{i.ItemsBuyPrice}</td>
                                            <td className='payPrice'>{i.ItemsSellPrice}</td>
                                            <td className='success total'>{i.Proofts}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                    </div>
                </section>
            </div>
        );
    }
}
export default GoodsAddation;
