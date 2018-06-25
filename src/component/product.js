import React, { Component } from 'react';
import { List } from 'antd-mobile';
import {post} from  '../utils/request';
import style from '../style/product.less';
import Lists from '../layout/Lists'

class Product extends Component {
    constructor(prop){
        super(prop);
        this.state= {
            productTab:"Period",  //选中的tab栏 /到期还 Period，月月还 Average，转让Attorn, 智还Dwisdom
            newLists:[],  //新人专享数据
            advanceLists:[],  //预约专区数据
            otherLists:[],  //预约专区数据
            postData:{
                pageNum: 1,
                pageSize: 8,
                codeType: "Period"
            }
        }
    }
    componentDidMount() {
        post("/product/list_v4.json",this.state.postData).then((res)=>{
            console.log(res.data.newProduct[0].product);
            const listData = res.data.newProduct[0].product;
            const advanceLists = res.data.purchaseAdvences;
            const otherLists = res.data.periodical;
            this.setState({
               newLists:[listData],
                advanceLists,
                otherLists
            });
        });
    }
    componentWillMount(){

    }

  render() {

    return (
      <div style={{marginBottom:'50px'}}>
          <ul className={style.product_tab}>
              <li className={this.state.productTab=="Period"?style.product_tabActive:''}>到期还</li>
              <li className={this.state.productTab=="Average"?style.product_tabActive:''}>月月还</li>
              <li className={this.state.productTab=="Dwisdom"?style.product_tabActive:''}>D智还</li>
              <li className={this.state.productTab=="Attorn"?style.product_tabActive:''}>转让</li>
          </ul>
          <div className={style.product_block}>
              <div className={style.pdtb_top}>
                  <h4>新手专享</h4>
                  <span>超高收益</span>
              </div>
              <Lists advance={true} data={this.state.newLists}/>
          </div>
          <div className={style.product_block}>
              <div className={style.pdtb_top}>
                  <h4>预约专区</h4>
                  <span>预约有奖</span>
              </div>
              <Lists advance={true} data={this.state.advanceLists}/>
          </div>
          <div className={style.product_block}>
              <div className={style.pdtb_top}>
                  <h4>散标专区</h4>
                  <span>一次性还本付息</span>
              </div>
              <Lists advance={false} data={this.state.otherLists}/>
          </div>
      </div>
    );
  }
}

export default Product;