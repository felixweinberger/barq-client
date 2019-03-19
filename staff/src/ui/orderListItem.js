import React, { Component } from 'react';
import '../styles/orderListItem.css';
// import SpecialWish from './specialWhish.js';
import { connect } from 'react-redux';
import { updateStatus } from '../store/actions';


class OrderListItem extends Component  {
  statusList = ['paid', 'in preparation', 'ready for pickup', 'delivered']  
  onButtonClick = (e) => {
    console.log('test')
    const index = this.statusList.findIndex(status => status === this.props.status)
    let nextIndex;  
    if (e.target.name === 'back') {
      nextIndex = index === 0 ? 0 : index - 1;
    } else {
      nextIndex = index + 1 === this.statusList.length ? index : index + 1;
    }
    this.props.updateStatus(this.statusList[nextIndex], this.props.orderId)
    console.log(this.statusList[nextIndex]);
    console.log('clicked!', e.target.name);
  }

  render() {
    return (
      <div className="orderListItem">
        <button name='back' onClick={this.onButtonClick} className="btn-back">Back</button>
        <div className="wrapper-list">
        <h2>#{this.props.orderId}</h2> 
        {
          this.props.items.map(item => (
            <div key={item.name} className="item">{item.name}x{item.quantity}</div>
          ))
        }
        </div>
        <div className="wrapper-status">
        <button name='update' onClick={this.onButtonClick} className="btn-update">Update</button>
        <h2>{this.props.status}</h2>
        </div>
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