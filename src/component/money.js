import React, { Component } from 'react';
import { post} from  '../utils/request';
import style from '../style/money.less';

class Money extends Component {
    constructor(prop){
        super(prop);
        this.state= {
            vipIcon:"./images/assets_gold@2x.png",
            bankIcon:"./images/assets_shanghai.png",
            hasCard:true,    //是否开户
            eyesIcon:"./images/eyes.png",
            eyesIcon1:"./images/close-eyes.png",
        }
    }
    componentDidMount() {

    }
    componentWillMount(){

    }
    listClick = (data) =>{
        console.log(data);
        window.location.href = data.clickUrl;
    }
  render() {
    let main = null;
    if(this.state.hasCard){
        main =
            <div className={style.money_main}>
                <div className={style.mm_money}>
                    <p><img src={this.state.bankIcon} alt=""/>存管余额(元)</p>
                    <p>2,180,800.00</p>
                </div>
                <div className={style.mm_btnBox}>
                    <div className={style.mm_txBtn}>提现</div>
                    <div className={style.mm_czBtn}>充值</div>
                </div>
            </div>
    }else {
        main =
            <div className={style.money_nextMain}>
                <div className={style.mnm_txt}><img src={this.state.bankIcon} alt=""/>上海银行存管账户</div>
                <div className={style.mnm_btn}>立即开户</div>
            </div>
    }
    return (
      <div style={{marginBottom:"50px"}}>
          <div className={style.money_banner} style={{height:this.state.hasCard?"220px":"260px"}}>
              <div className={style.mb_top}>
                  <span className={style.mbt_left}><img src={this.state.vipIcon} alt=""/>黄金会员 专享1.5%加息 ></span>
                  <div className={style.mbt_right}>交易记录</div>
              </div>
              <div className={style.mb_content}>
                    <div className={style.mbc_totalTxt}>总资产(元) <img src={this.state.eyesIcon} alt=""/></div>
                    <div className={style.mbc_totalMoney}>255,800.00</div>
                    <div className={style.mbc_getTxt}>累计收益(元)</div>
                    <div className={style.mbc_getMoney}>200.00</div>
              </div>
          </div>
          {main}
          <ul className={style.money_list} style={{paddingTop:this.state.hasCard?"0":"60px"}}>
              <li>
                  <i className={style.mList_one}></i>
                  <p>到期还系列</p>
                  <span>0.00元 ></span>
              </li>
              <li>
                  <i className={style.mList_two}></i>
                  <p>月月还系列</p>
                  <span>0.00元 ></span>
              </li>
              <li>
                  <i className={style.mList_three}></i>
                  <p>我的奖励</p>
                  <span>0张 ></span>
              </li>
              <li>
                  <i className={style.mList_four}></i>
                  <p>邀请有奖</p>
                  <span>0.4%返现 ></span>
              </li>
              <li>
                  <i className={style.mList_five}></i>
                  <p>我的银行卡</p>
                  <span> ></span>
              </li>
              <li>
                  <i className={style.mList_six}></i>
                  <p>我的兜币</p>
                  <span>2819 ></span>
              </li>
              <li>
                  <i className={style.mList_seven}></i>
                  <p>口令红包</p>
                  <span> ></span>
              </li>
          </ul>
      </div>
    );
  }
}

export default Money;