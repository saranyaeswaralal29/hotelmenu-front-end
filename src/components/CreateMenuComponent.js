import React, { Component } from 'react';
import {WithRouter} from '../components/WithRouter';
import MenuService from '../services/MenuService';

class CreateMenuComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.params.id,
            categoryName: '',
            itemName:'',
            price:''
        }

        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeItemHandler = this.changeItemHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveMenu = this.saveMenu.bind(this);
    }

    componentDidMount() {
        if (this.state.id == -1)  {
            return;
        } else {
            MenuService.getMenuById(this.state.id).then((res) => {
                let menu = res.data;
                this.setState({
                    categoryName: menu.categoryName,
                    itemName: menu.itemName,
                    price: menu.price
                });
            });
        } 
    }

    changeCategoryHandler = (event) => {
        this.setState({categoryName: event.target.value});
    }

    changeItemHandler = (event) => {
        this.setState({itemName: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    saveMenu  = (e) => {
        e.preventDefault();
        let menu = {categoryName:this.state.categoryName, itemName: this.state.itemName, price: this.state.price};
        console.log("menu =>"  + JSON.stringify(menu));
        if (this.state.id == -1) {
            MenuService.createMenu(menu).then(res => {
                this.props.navigate('/')
            });
        } else {
            MenuService.updateMenu(this.state.id,menu).then(res => {
                this.props.navigate('/')
            });
        }
    }

    setPageTitle() {
        if (this.state.id == -1) {
            return <h3 className='text-center'> Add Menu</h3>
        } else {
            return <h3 className='text-center'> Update Menu</h3>
        }
    }

    cancel = (e) => {
        this.props.navigate('/')
    }
    render() {
        return (
            <div>
                
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.setPageTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Category Name  :</label>
                                        <input placeholder='Category Name' name="categoryName" className='form-control'
                                            value={this.state.categoryName} onChange={this.changeCategoryHandler}/>
                                            </div>
                                            <div className='form-group'>
                                        <label>Item Name  :</label>
                                        <input placeholder='Item Name' name="itemName" className='form-control'
                                            value={this.state.itemName} onChange={this.changeItemHandler}/>    
                                            </div>
                                        <div className='form-group'>
                                        <label>Price :</label>
                                        <input placeholder='Price' name="price" className='form-control'
                                            value={this.state.price} onChange={this.changePriceHandler}/>    

                                    </div>
                                    <div className='form-group'>
                                    <button className='btn btn-success' onClick={this.saveMenu}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default WithRouter(CreateMenuComponent);