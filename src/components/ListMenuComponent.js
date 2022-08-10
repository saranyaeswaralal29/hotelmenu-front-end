import React, { Component } from 'react';
import {WithRouter} from '../components/WithRouter';
import MenuService from '../services/MenuService';

class ListMenuComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus : [],
            quantity: '',
            MasterChecked: false,
            SelectedList: [],
            errorMessage: ''
        }
        this.addMenu = this.addMenu.bind(this);
        this.editMenu = this.editMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    }

    componentDidMount() {
        MenuService.getMenus().then((res => {
            this.setState({menus : res.data});
        }))
        .catch(error => {
            this.setState({errorMessage:error.response.data.errorMessage});
        });
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
            console.log(error.response.data.errorMessage);
            this.setState({errorMessage:error.response.data.errorMessage});
        });
    }

    

    render() {
        
        return (
            <div>
                <h2 className="text-center">Menu List</h2>
                <h2>Welcome {localStorage.getItem('username') != null 
                ? localStorage.getItem('username')
                : 'Guest' }</h2>
                <div>
                { localStorage.getItem('username') == null ? null :
                    <button className="btn btn-primary" onClick={this.addMenu}>Add Menu</button>
                }
                </div>
                <div className="row" style={{overflow: 'auto'}}>
                {this.state.errorMessage && (
  <p className="error"> {this.state.errorMessage} </p>
)}
                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th> Item Name</th>
                                <th> Price</th>
                                { localStorage.getItem('username') != null
                                        ? <th> Actions </th>
                                : <th scope="row">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="mastercheck"
                                    />
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
                                        id="rowcheck{menu.id}"/>
                                        </td>
                                        }
                                        
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default WithRouter(ListMenuComponent);