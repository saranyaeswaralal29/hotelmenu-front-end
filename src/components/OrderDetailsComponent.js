import React, { Component } from 'react';
import MenuService from '../services/MenuService';
import OrderService from '../services/OrderService';
import { WithRouter } from './WithRouter';

class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props)
        let jsonObject = JSON.parse(localStorage.getItem('cartItems'));
        
        this.state = {
            menus:  [],
            orderItems: [],
            cartItems: new Map(Object.entries(jsonObject)),
            errorMessage: '',
            firstName:'',
            lastName:'',
            emailId: ''
        }
        this.computeTotal = this.computeTotal.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
    }

    componentDidMount() {
        MenuService.getMenus().then((res => {
            this.setState({menus : res.data});

            this.state.menus.forEach(menu => {
                if (this.state.cartItems.has(String(menu.id))) {
                    this.state.orderItems.push(menu);
                }
            });
        }))
        .catch(error => {
            this.setState({errorMessage:error.response.data.errorMessage});
        });
    }

    computeTotal() {
        let orderTotal = 0;

        this.state.orderItems.forEach(menu => {
            orderTotal += (menu.price*this.state.cartItems.get(String(menu.id)));
        })
        return orderTotal;
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    placeOrder() {
        let finalItems = [];
        let finalPrice  = this.computeTotal();
        this.state.orderItems.forEach(menu => { 
            menu['quantity']=this.state.cartItems.get(String(menu.id))
            delete menu.id;
            finalItems.push(menu);
        });
        console.log(finalItems);
        let orderDetails = {firstName: this.state.firstName,lastName:this.state.lastName,email:this.state.emailId,
            order:[{price: finalPrice, items: finalItems,  status:"new"}]};
        console.log(orderDetails);

        OrderService.createOrder(orderDetails)
        .then((res => {
            console.log(res.data);
            alert("Thank you. Your order (Id:"+res.data.id+") will be delivered soon.");
            this.props.navigate('/');
        }))
        .catch(error  => {
            this.setState({errorMessage:error.response.data.errorMessage});
        });
    }

    render() {
        return (
            <div>
                <h2>Preview Order</h2>
                <div className="row" style={{overflow: 'auto'}}>
                    {
                        this.state.errorMessage && (
                        <p className="error" style={{color:"red"}}> {this.state.errorMessage} </p>
                    )}
                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {  this.state.orderItems !=null &&
                                this.state.orderItems.map (
                                    menu => 
                                    <tr key={menu.id} >
                                        <td>{menu.itemName}</td>
                                        <td>{this.state.cartItems.get(String(menu.id))}</td>
                                        <td>{menu.price}</td>
                                        <td>{this.state.cartItems.get(String(menu.id))*menu.price}</td>
                                    </tr> 
                                )
                            }
                                <tr>
                                    <td></td><td></td>
                                    <td>Total Price</td><td>{this.computeTotal()}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Please Enter First Name</label></td>
                            <td><input type="text" className="form-group col-md-12" placeholder='First Name'
                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/></td>    
                        </tr>
                        <tr>
                            <td><label>Please Enter Last Name</label></td>
                            <td><input type="text" className="form-group col-md-12" placeholder='Last Name'
                                value={this.state.lastName} onChange={this.changeLastNameHandler}/></td>  
                        </tr>
                        <tr>
                            <td><label>Please Enter Email</label></td>
                            <td><input type="email" className="form-group col-md-12" placeholder='Email Id'
                                value={this.state.emailId} onChange={this.changeEmailHandler}/></td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.placeOrder}>Place Order</button>
            </div>
        );
    }
}

export default  WithRouter(OrderDetailsComponent);