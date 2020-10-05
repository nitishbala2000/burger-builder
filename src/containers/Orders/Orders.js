
import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {setOrders} from "../../store/actions/orders";

class Orders extends Component {

    componentDidMount() {
       this.props.setOrders(this.props.token, this.props.userId);
    }

    render() {

        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            ));
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        orders : state.orders.orders,
        loading: state.orders.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setOrders : (token, id) => dispatch(setOrders(token, id))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));