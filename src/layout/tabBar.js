/**
 * Created by Administrator on 2018/6/6.
 */
import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class MyTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: window.sessionStorage.selectedTab || 'index',
            hidden: false,
        };
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '48px', width: '100%', bottom: 0,left:0 }}>
                <TabBar unselectedTintColor="#949494" tintColor="#ff6548" barTintColor="white" hidden={this.state.hidden}>
                    <TabBar.Item title="首页" key="Index"
                        icon={ <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-2px -0px',
                            backgroundSize:'70px'}}
                        />
                        }
                        selectedIcon={ <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-39px -0px',
                            backgroundSize:'70px'}}
                        />
                        }
                        selected={this.state.selectedTab === 'index'}
                        onPress={() => {
                            this.props.history.push("/index");
                            window.sessionStorage.selectedTab = "index";
                            this.setState({
                                selectedTab: 'index',
                            });
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item title="产品" key="product"
                        icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(./images/nav_icon-1.png)  no-repeat',
                                backgroundPosition:'-2px -32px',
                                backgroundSize:'70px'}}
                            />
                        }
                        selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(./images/nav_icon-1.png)  no-repeat',
                                backgroundPosition:'-39px -32px',
                                backgroundSize:'70px'}}
                            />
                        }
                        selected={this.state.selectedTab === 'product'}
                        onPress={() => {
                            this.props.history.push("/product");
                            window.sessionStorage.selectedTab = "product";
                            this.setState({
                                selectedTab: 'product',
                            });
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item title="兜友圈" key="Friend"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-2px -63px',
                            backgroundSize:'70px'}}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-39px -63px',
                            backgroundSize:'70px'}}
                        />
                        }
                        selected={this.state.selectedTab === 'friend'}
                        onPress={() => {
                            this.props.history.push("/friend");
                            window.sessionStorage.selectedTab = "friend";
                            this.setState({
                                selectedTab: 'friend',
                            });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item  title="资产" key="money"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-2px -95px',
                            backgroundSize:'70px'}}
                        />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-39px -95px',
                            backgroundSize:'70px'}}
                        />}
                        selected={this.state.selectedTab === 'money'}
                        onPress={() => {
                            this.props.history.push("/money");
                            window.sessionStorage.selectedTab = "money";
                            this.setState({
                                selectedTab: 'money',
                            });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item title="围观" key="vistied"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-2px -127px',
                            backgroundSize:'70px'}}
                        />}
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(./images/nav_icon-1.png)  no-repeat',
                            backgroundPosition:'-39px -127px',
                            backgroundSize:'70px'}}
                        />}
                        selected={this.state.selectedTab === 'vistied'}
                        onPress={() => {
                            this.props.history.push("/vistied");
                            window.sessionStorage.selectedTab = "vistied";
                            this.setState({
                                selectedTab: 'vistied',
                            });
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default withRouter(MyTabBar);
