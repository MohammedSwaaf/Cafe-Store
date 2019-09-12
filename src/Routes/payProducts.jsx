import React, { Component } from 'react';
import '../css/payProduct.css';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
import Navigation from '../Component/CustomNav';
import swal from 'sweetalert';
// making filtration using the name 
function searchingForProducts( term ) {
    return function ( x ) {
        return (
            x.GoodsName.toLowerCase().includes( term.toLowerCase() ) ||
            x.KafteriaName.toLowerCase().includes( term.toLowerCase() ) || x.RecieverName.toLowerCase().includes( term.toLowerCase() ) || !term
        )
    }
}
class GoodsAddation extends Component {
    constructor( props ) {
        super( props );
        this.state = {

            'info': '',
            'Number': '',
            'catID': '',
            'senderId': '',
            'receiverId': '',
            'term': '',
            // "SellerAdminId": 2,
            Kafterias: [],
            Recievers: [],
            Products: [],
            paymentData: [],
            
                Name:[
                    'المستلم',
                    'المنتج',
                    'الكافتيريا'
                ]
            
        }
    }
    getData = ( ( e ) => {
        e.preventDefault();
        this.setState( {
            [ e.target.name ]: e.target.value,
        } )
    } )
    sendDate = ( ( e ) => {
        e.preventDefault();
        let getProductApi = 'api/GoodsSells',
            server = 'http://128.14.34.6:9090/';
        axios.post( server + getProductApi, {
            'NumberOfBoxes': this.state.Number,
            'GoodsId': this.state.catID,
            'KafteriaId': this.state.senderId,
            'SellerId': this.state.receiverId,
            // "SellerAdminId": this.state.SellerAdminId
        } )
            .then( fuckIn => {
                let resp = fuckIn.data;
                console.log( resp );
                this.setState( { info: resp } );
                swal( resp );
            } ).catch( fuckOff => {
                console.log( fuckOff.response.data.Message );
                swal( fuckOff.response.data.Message )
            } );
        console.log( this.state.info );
        let Kafterias = 'من فضلك أدخل إسم الكافتيريا',
            Products = 'من فضلك أدخل المنتج',
            Recievers = 'من فضلك أدخل إسم المستلم',
            numOfBoxes = 'من فضلك أدخل عدد البضاعه المباعه';
        if ( document.getElementById( 'numOfPayProducts' ).value === '' ) {
            swal( numOfBoxes )
        } else if ( document.getElementById( 'inputGroupSelect02' ).value === '' ) {
            swal( Kafterias )
        } else if ( document.getElementById( 'inputGroupSelect01' ).value === '' ) {
            swal( Recievers )
        } else if ( document.getElementById( 'inputGroupSelect03' ).value === '' ) {
            swal( Products )
        } else {
            document.getElementById( 'inputGroupSelect01' ).value = '';
            document.getElementById( 'inputGroupSelect02' ).value = '';
            document.getElementById( 'inputGroupSelect03' ).value = '';
            document.getElementById( 'numOfPayProducts' ).value = '';
        }
        this.setState( { Number: this.state.Number === '' } );
    } )

    //Request for Get dropdown menus from server
    componentDidMount() {
        let getProductApi = 'api/GoodsSells/GoodsSellsPage',
            server = 'http://128.14.34.6:9090/';

        axios.get( server + getProductApi ).then( res => {
            this.setState( {
                Kafterias: res.data[ 'Kafterias' ],
                Recievers: res.data[ 'Recievers' ],
                Products: res.data[ 'Products' ]

            } );

        } )
    }
    // function for access our search
    searchHandler = ( ( e ) => {
        this.setState( {
            [ e.target.name ]: e.target.value,
        } )
    } )

    componentWillUpdate() {
        let getpaymentApi = 'api/GoodsSells',
            server = 'http://128.14.34.6:9090/';

        axios.get( server + getpaymentApi ).then( res => {
            this.setState( {
                paymentData: res.data,
            } );
        } )
        // console.log(this.state.paymentData);

    }



    render() {
        const isEnabled = this.state.Recievers && this.state.Kafterias &&
            this.state.Products && this.state.Number;
        return (
            <div>
                <Navigation />
                <section className="addProducts" >
                    <div className=" items">

                        <form className='container' >
                            <div className="form-group col-md-6">
                                <div className='titleOfHead'>
                                    <h1 className="head"><span>المستلـــم</span></h1>

                                </div>
                                <select className="custom-select" id="inputGroupSelect01" name='receiverId' placeholder="hi" onChange={ this.getData }>
                                    <option value="">إختار</option>
                                    { this.state.Recievers.map( i => (
                                        <option key={ i.Id } className='option' value={ i.Id } >{ i.Name }</option>
                                    ) ) }
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <div className='titleOfHead'>
                                    <h1 className="head"><span>الكافتيريـــا</span></h1>

                                </div>
                                <select className="custom-select" id="inputGroupSelect02" name='senderId' placeholder="hi" onChange={ this.getData }>
                                    <option value="">إختار</option>
                                    { this.state.Kafterias.map( i => (
                                        <option key={ i.Id } className='option' value={ i.Id } >{ i.Name }</option>
                                    ) ) }
                                </select>
                            </div>
                            <div className="form-group">
                                <div className='titleOfHead'>
                                    <h1 className="head"><span>إختيـار المنتـج</span></h1>

                                </div>
                                <select className="custom-select" id="inputGroupSelect03" name='catID' placeholder="hi" onChange={ this.getData }>
                                    <option value="">إختار</option>
                                    { this.state.Products.map( i => (
                                        <option key={ i.Id } className='option' value={ i.Id } >{ i.Name }</option>
                                    ) ) }
                                </select>

                            </div>



                            <div className="add">
                                <input type='text' className='num' id='numOfPayProducts' placeholder='العدد' onChange={ this.getData } value={ this.state.name } name='Number' />
                                <button type="button" disabled={ !isEnabled } onClick={ this.sendDate } className="dataOfUsers btn-default">بيــع</button>
                            </div><br /><br />

                            {/* <div className='searching col-md-12'> */}
                                

                                {/* <select className="custom-select col-md-3" id="inputGroupSelect01" name='receiverId' placeholder="hi" onChange={ this.getData }>
                                    <option value="">إختار</option>
                                    { this.state.Recievers.map( i => (
                                        <option key={ i.Id } className='option' value={ i.Id } >{ i.Name }</option>
                                    ) ) }
                                </select> */}
                            {/* </div> */}
                          
                            <input list="browsers" onChange={ this.searchHandler } value={ this.state.name } name='term' className='searchInTableOfProduct' placeholder='البحث فى المنتجات' />
                            
                        </form>
                        <table className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>التاريخ</th>
                                    <th>الوقت</th>
                                    <th>إسم المنتج</th>
                                    <th> المباع</th>
                                    <th> العدد السابق </th>
                                    <th>الإجمالى </th>
                                    <th>سعر الجمله</th>
                                    <th>سعر البيع</th>
                                    <th>صافى الربح</th>
                                    <th>الكافتيريا</th>
                                    <th>المستلم</th>

                                </tr>
                            </thead>
                            <tbody>
                                { this.state.paymentData.filter( searchingForProducts( this.state.term ) ).map( i =>
                                    (

                                        <tr >
                                            <td key={ i.Id } className='mosalsal'>{ i.Date }</td>
                                            <td className='mosalsal'>{ i.Time }</td>
                                            <td className='names'>{ i.GoodsName }</td>
                                            <td className='newNum'>{ i.NumberOfBoxes }</td>
                                            <td className='oldNum'>{ i.PreviousNumberOfBoxes }</td>
                                            <td className='info totNum'>{ i.UpdatedNumberOfBoxes }</td>
                                            <td className='buyPrice'>{ i.ItemsBuyPrice }</td>
                                            <td className='payPrice'>{ i.ItemsSellPrice }</td>
                                            <td className='success total'>{ i.Proofts }</td>
                                            <td className=' total'>{ i.KafteriaName }</td>
                                            <td className=' total'>{ i.RecieverName }</td>
                                        </tr>

                                    ) ) }
                            </tbody>
                        </table>

                    </div>
                </section>
            </div>
        );
    }
}
export default GoodsAddation;
