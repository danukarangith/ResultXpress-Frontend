
import {FaBullhorn,  FaSyncAlt, FaUserFriends} from 'react-icons/fa';

const OrdersOverview = () => {
    return (
        <div className="orders-overview">
            <div className="orders-header">
                <h3>Notifications</h3>
                <span className="positive">↑just now  </span>
            </div>
            <div className="order-items">
                <div className="order-item">
                    <div className="order-icon">
                        <FaBullhorn />
                    </div>
                    <div className="order-details">
                        <h4>New Update Coming Soon</h4>
                        <p>25 FEB 7:20 PM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaUserFriends />
                    </div>
                    <div className="order-details">
                        <h4>New User login</h4>
                        <p>25 MARCH 11 PM</p>
                    </div>
                </div>
                <div className="order-item">
                    <div className="order-icon">
                        <FaSyncAlt />
                    </div>
                    <div className="order-details">
                        <h4>Data Sync</h4>
                        <p>25 JAN 9:28 PM</p>
                    </div>
                </div>
                {/*<div className="order-item">*/}
                {/*    <div className="order-icon">*/}
                {/*        <FaShoppingCart />*/}
                {/*    </div>*/}
                {/*    <div className="order-details">*/}
                {/*        <h4>New card added for order #4395133</h4>*/}
                {/*        <p>20 DEC 2:20 AM</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="order-item">*/}
                {/*    <div className="order-icon">*/}
                {/*        <FaShoppingCart />*/}
                {/*    </div>*/}
                {/*    <div className="order-details">*/}
                {/*        <h4>New order #9583120</h4>*/}
                {/*        <p>19 DEC 5:14 AM</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default OrdersOverview;