import React, { Component } from 'react';
import '../css/Report.css';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';
import swal from 'sweetalert';


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'From': '',
            'To': '',
            'GoodsId': '',
            'fuckId':'',
            categories: [],
            info: {}
        }
    }
    getData = ((e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            // categories:e.target.value
        })
    })
    sendDate = ((e) => {
        e.preventDefault();
        let getProductApi = 'api/Reports/Goods/GoodsAddtions',
            server = 'http://128.14.34.6:9090/';
        axios.post(server + getProductApi, {
            'From': this.state.From,
            'To': this.state.To,
            'GoodsId': this.state.GoodsId

        })
            .then(res => {

                console.log(res.data);
                // alert(resp);
                this.setState({ info: res.data })
            });
        console.log(this.state);
        let fromForReport = 'من فضلك أدخل بدايه تاريخ الفتره',
            ToForReport = 'من فضلك إختر نهايه تاريخ الفتره',
            product = 'من فضلك أدخل المنتج';
        if (document.getElementById('from').value === '') {
            swal(fromForReport);
        } else if (document.getElementById('to').value === '') {
            swal(ToForReport);
        } else if (document.getElementById('inputGroupSelect01').value === '') {
            swal(product);
        } else {
            document.getElementById('from').value = '';
            document.getElementById('to').value = '';
            document.getElementById('inputGroupSelect01').value = '';
        }
        this.setState({
            From: this.state.From === '',
            To: this.state.To === '',
            GoodsId: this.state.GoodsId === ''
        });
// let x = this.state.fuckId;

    })

    //Request for Get dropdown menu from server
    componentDidMount() {
        let getProductApi = 'api/GoodsAddtion/GoodsAddtionPage',
            server = 'http://128.14.34.6:9090/';
        axios.get(server + getProductApi).then(res => {
            this.setState({ categories: res.data });
        })
        // console.log(this.state.categories);
    }



    render() {
        const isEnable = this.state.From && this.state.To && this.state.GoodsId;
        return (
            <div>
                <Navigation />
                <section className="addProducts" >
                    <div className="container items">
                        <div className="takrer">
                            <form >
                                <div className="form-group col-md-6">
                                    <div className='titleOfHead'>
                                        <h1 className="head"><span>إلــــي</span></h1>

                                    </div>
                                    <div className="report">
                                        <input type="date" id='to' onChange={this.getData} value={this.state.name} name="To" min="2019-07-01" /><br /><br />
                                    </div>

                                </div>
                                <div className="form-group col-md-6">
                                    <div className='titleOfHead'>
                                        <h1 className="head"><span>مـــن</span></h1>

                                    </div>
                                    <div className="report">
                                        <input type="date" id='from' onChange={this.getData} value={this.state.name} name="From" min="2019-07-1" /><br /><br />
                                    </div>

                                </div>
                                {/* <div className="form-group leftSide col-md-6">
                                    <div className='titleOfHead'>
                                        <h1 className="head"><span>نـــوع التقريـــر</span></h1>

                                    </div>
                                    <select className="custom-select" id="inputGroupSelect01" name='catID' placeholder="hi" onChange={this.getData}>
                                        <option value="">إختار</option>
                                        {this.state.categories.map(i => (
                                            <option key={i.Id} className='option' value={i.Id} >{i.Name}</option>
                                        ))}
                                    </select>
                                </div> */}
                                <div className="form-group col-md-12">
                                    <div className='titleOfHead'>
                                        <h1 className="head"><span>المنتــــج</span></h1>

                                    </div>
                                    <select className="custom-select" id="inputGroupSelect01" name='GoodsId' placeholder="hi" onChange={this.getData}>
                                        <option value="">إختار</option>
                                        {this.state.categories.map(i => (
                                            <option key={i.Id} className='option' value={i.Id}  >{i.Name}</option>
                                        ))}
                                    </select>
                                </div>




                                <div className="add">

                                    <button type="submit" disabled={!isEnable} onClick={this.sendDate} className="dataOfUsers btn-default">عـــرض</button>
                                </div>
                            </form>
                            <div className="scrolling">
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>مـــن</th>
                                            <th>إلــــي</th>
                                            <th>إسم المنتج</th>
                                            <th> العدد بالكرتونه</th>
                                            <th>العدد بالقطعه</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ this.state.info.From }</td>
                                            <td>{ this.state.info.To }</td>
                                            <td>{ this.state.info.GoodsName }</td>
                                            <td>{ this.state.info.NumberOfBoxes }</td>
                                            <td>{ this.state.info.NumberOfItems }</td>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Report;
