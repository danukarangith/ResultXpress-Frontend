
import { FaShoppingCart } from 'react-icons/fa';

const OrdersOverview = () => {
    return (
        <div className="orders-overview">
            <div className="orders-header">
                <h3>Orders Overview</h3>
                <span className="positive">↑ 24% this month</span>
            </div>
            <div className="order-items">
                <div className="order-item">
                    <div className="order-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="order-details">
                        <h4>$2400, Design changes</h4>
                        <p>22 DEC 7:20 PM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="order-details">
                        <h4>New order #1832412</h4>
                        <p>21 DEC 11 PM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="order-details">
                        <h4>Server payments for April</h4>
                        <p>21 DEC 9:28 PM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="order-details">
                        <h4>New card added for order #4395133</h4>
                        <p>20 DEC 2:20 AM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaShoppingCart />
                    </div>
                    <div className="order-details">
                        <h4>New order #9583120</h4>
                        <p>19 DEC 5:14 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersOverview;