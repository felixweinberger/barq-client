import React, { Component } from 'react';
import '../styles/orderListItem.css';
// import SpecialWish from './specialWish.js';
import { connect } from 'react-redux';
import { updateStatus } from '../store/actions';


class OrderListItem extends Component  {
  statusList = ['paid', 'in preparation', 'ready for pickup', 'delivered']  
  onButtonClick = (e) => {
    const index = this.statusList.findIndex(status => status === this.props.status)
    let nextIndex;
    console.log(e.target);
    if (e.target.name === 'back') {
      nextIndex = index === 0 ? 0 : index - 1;
    } else {
      nextIndex = index + 1 === this.statusList.length ? index : index + 1;
    }
    const nextStatus = this.statusList[nextIndex];
    console.log(nextStatus, this.props.queue.find(order => order.orderId === this.props.orderId))
    this.props.updateStatus(nextStatus, this.props.queue.find(order => order.orderId === this.props.orderId))
    this.props.emitStatusUpdate(nextStatus)
  }

  render() {
    return (
      <div className="orderListItem">
        <button name='back' onClick={this.onButtonClick} className="wrapper-back" value="Back">
          Back
        </button>
        <div className="wrapper-list">
          <h2>#{this.props.orderId}</h2> 
          {
            this.props.items.map(item => {
              console.log(item.name, item.quantity);
              return <div key={item._id} className="item">{item.name} x {item.quantity}</div>
            })
          }
        </div>
        <button name='update' onClick={this.onButtonClick} className="wrapper-status">
          Update
          {this.props.status}
        </button>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  queue: state.queue
})

const mapDispatchToProps = (dispatch) => ({
  updateStatus: (status, orderId) => dispatch(updateStatus(status, orderId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListItem);