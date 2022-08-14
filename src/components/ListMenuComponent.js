import React, { Component } from 'react';

import {WithRouter} from '../components/WithRouter';
import MenuService from '../services/MenuService';

class ListMenuComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus : [],
            searchMenus : [],
            errorMessage: '',
            searchText:'',
            selectedItemMap: new Map()
        }
        this.addMenu = this.addMenu.bind(this);
        this.editMenu = this.editMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.changeSearchHandler = this.changeSearchHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleAddCart = this.handleAddCart.bind(this);
    }

    componentDidMount() {
        MenuService.getMenus().then((res => {
            this.setState({menus : res.data});
        }))
        .catch(error => {
            this.setState({errorMessage:error.response.data.errorMessage});
        });
    }

    changeSearchHandler = (event) => {
        this.setState({searchText: event.target.value});
        if (event.target.value.length > 0) {
            MenuService.getMenus().then((res => {
                this.setState({searchMenus : res.data});
                this.setState({menus:this.state.searchMenus.filter(matchMenu => 
                    matchMenu.categoryName === this.state.searchText
                   )
                });
                this.setState({errorMessage:''});
            })
            .catch(error => {
                this.setState({errorMessage:error.response.data.errorMessage});
            }));
        }
        
    }

    addMenu(){
        this.props.navigate('/add/-1');
    }

    editMenu(id) {
        this.props.navigate(`/add/${id}`);
    }

    deleteMenu(id) {
        MenuService.deleteMenu(id)
        .then((res => {
           this.setState({menus: this.state.menus.filter(menu => menu.id !== id)});
        }))
        .catch((error) => {
            this.setState({errorMessage:error.response.data.errorMessage});
        });
    }

    handleChange = (e) => {
        if (e.target.checked) {
            let quantityOfItem = document.getElementById('quantity'+e.target.id).value;
            this.state.selectedItemMap.set(e.target.id,quantityOfItem);
        } else {
            if (this.state.selectedItemMap.has(e.target.id)) {
                this.state.selectedItemMap.delete(e.target.id);
            }
        }
    }

    handleQuantity = (e) => {
       let mapKey = e.target.id;
       mapKey = mapKey.substring(8,mapKey.length);
       if (this.state.selectedItemMap.has(mapKey)) {
            this.state.selectedItemMap.set(mapKey, e.target.value);
        }
    }
    

    handleAddCart () {
        if (this.state.selectedItemMap.size===0){
            this.setState({errorMessage:'No Items in Cart'});
            return;
        }
        const obj = Object.fromEntries(this.state.selectedItemMap);
        localStorage.removeItem('cartItems');
        localStorage.setItem('cartItems', JSON.stringify(obj));
        this.props.navigate('/previewOrder');
    }

    render() {
        
        return (
 
            <div>
                <h2 className="text-center">Menu List</h2>
                <h2>Welcome {localStorage.getItem('username') !== null 
                ? localStorage.getItem('username')
                : 'Guest' }</h2>
                <div>
                { localStorage.getItem('username') === null ? null :
                    <button className="btn btn-primary" onClick={this.addMenu}>Add Menu</button>
                }<p></p>
                <input type="text" placeholder='Search By Category' className='float-right'
                                            value={this.state.searchText} onChange={this.changeSearchHandler}/>
                </div>
                <div className="row" style={{overflow: 'auto'}}>
                {this.state.errorMessage && (
                    <p className="error" style={{color:"red"}}> {this.state.errorMessage} </p>
                    )}

                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th> Item Name</th>
                                <th> Price</th>
                                { localStorage.getItem('username') !== null
                                        ? <th> Actions </th>
                                : <th scope="row">
                                    {/* <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="mastercheck"
                                    /> */}
                                    Add Items
                                    </th>
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {  this.state.menus !=null &&
                                this.state.menus.map (
                                    menu => 
                                    <tr key = { menu.id}>
                                        <td>{menu.itemName}</td>
                                        <td>{menu.price}</td>
                                        { localStorage.getItem('username') != null
                                        ?
                                        <td> 
                                            <button onClick={() => this.editMenu(menu.id)} className="btn btn-info" >Update</button>
                                            <button style={{marginLeft:"10px"}} onClick={() => this.deleteMenu(menu.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                        :
                                        <td><input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={(menu.id)} onChange={this.handleChange}/>
                                        <input type="number" className="form-group col-md-1" style={{marginLeft:"10px"}} 
                                        defaultValue="1" min={1} id={'quantity'+(menu.id)} onChange={this.handleQuantity}/>
                                        </td>
                                        }
                                        
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    
                </div>
                {localStorage.getItem('username') === null
                        ? <button className="btn btn-primary" onClick={this.handleAddCart} >View Cart</button>
                        : null
                    }
            </div>
        );
    }
}

export default WithRouter(ListMenuComponent);