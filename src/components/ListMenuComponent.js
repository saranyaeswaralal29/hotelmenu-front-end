import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import {WithRouter} from '../components/WithRouter';
import MenuService from '../services/MenuService';

class ListMenuComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus : []
        }
        this.addMenu = this.addMenu.bind(this);
        this.editMenu = this.editMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    }

    componentDidMount() {
        MenuService.getMenus().then((res => {
            this.setState({menus : res.data});
        }));
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
            console.log('Error', error.message);
        });
    }

    render() {
        
        return (
            <div>
                <h2 className="text-center">Menu List</h2>
                <div>
                    <button className="btn btn-primary" onClick={this.addMenu}>Add Menu</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Menu Category</th>
                                <th> Item Name</th>
                                <th> Price</th>
                                <th> Actions </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.menus.map (
                                    menu => 
                                    <tr key = { menu.id}>
                                        <td>{menu.categoryName}</td>
                                        <td>{menu.itemName}</td>
                                        <td>{menu.price}</td>
                                        <td>
                                            <button onClick={() => this.editMenu(menu.id)} className="btn btn-info">Update</button>
                                           
                                            <button style={{marginLeft:"10px"}} onClick={() => this.deleteMenu(menu.id)} className="btn btn-danger">Delete</button>
                                        </td>
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