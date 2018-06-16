import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { get, post} from  '../utils/request';
import style from '../style/visted.less';
import HorizontalLists from '../layout/horizontalLists'

class Vistied extends Component {
    constructor(prop){
        super(prop);
        this.state= {
            lists:[
                {src:'./images/Fill1Copy23.png',text:'活动中心'},
                {src:'./images/onlookers_help.png',text:'帮助反馈'},
                {src:'./images/copy3@2x.png',text:'在线客服'},
                {src:'./images/Fill1Copy22@2x.png',text:'关于我们'},
            ],
            iconUrl:'./images/touxiang.png',      //用户头像
            register:true,   //是否注册
            active:"first",   //获取焦点的tab栏
        }
    }
    componentDidMount() {
        // post("/bannerManage/findBanners.json",{type:'IOS'}).then((res)=>{
        //     console.log(res);
        //     const bannerLists = res.data.banners;
        //     this.setState({
        //         bannerLists,
        //     });
        // });
    }
    componentWillMount(){

    }
    onChange = (val) => {
        console.log(val);
    }
  render() {
    const lists = this.state.lists;
    const register = this.state.register;
    const active = this.state.active;
    let login = null;
    if(register){
        login = <div className={style.vsd_headery}>
            <div className={style.user_icon}>
                <img src={this.state.iconUrl} alt=""/>
            </div>
            <div className={style.user_mobile}>181****583</div>
            <div className={style.user_message}>
                <span></span>
            </div>
        </div>;
    }else {
        login = <div className={style.vsd_headern}><div>登录/注册</div></div>
    }
    return (
      <div className={style.visted}>
          {login}
          <HorizontalLists lists={lists}></HorizontalLists>
          <div className={style.vtdList_title}>
              <div onClick={() => {
                  this.setState({
                      active: "first"
                  })
                }
              }
                  className={active==="first" ? style.title_active:""}>满兜动态</div>
              <div onClick={() => {
                  this.setState({
                      active: "second"
                  })
              }
              } className={active==="second" ? style.title_active:""}>满兜科普</div>
          </div>
      </div>
    );
  }
}

export default Vistied;