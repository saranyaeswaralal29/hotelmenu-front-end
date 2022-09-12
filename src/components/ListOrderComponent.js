import React, { Component } from 'react';
import {Card, Table} from 'react-bootstrap';

class ListOrderComponent extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Card className="mt-4 fs-6 bg-light font-weight-bold text-center">
                Orders
            </Card>
        );
    }
}

export default ListOrderComponent;