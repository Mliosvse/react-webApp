import React, { Component } from 'react';
import {post} from  '../utils/request';
import {Attorn} from  '../utils/data';
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
            pageNum: 1,
        }
    }
    componentDidMount() {
        post("/product/list_v4.json",{pageNum: 1,pageSize: 8,codeType: "Period"}).then((res)=>{
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
        console.log(Attorn);
    }
    tabClick = (type)=>{
        this.setState({productTab:type});
        switch (type){
            case "Period":
                this.setState({
                    pageNum: 1,
                    newLists:[],
                    advanceLists:[],
                    otherLists:[]
                });
                post("/product/list_v4.json",{pageNum: 1,pageSize: 8,codeType: "Period"}).then((res)=>{
                    const listData = res.data.newProduct[0].product;
                    const advanceLists = res.data.purchaseAdvences;
                    const otherLists = res.data.periodical;
                    this.setState({
                        newLists:[listData],
                        advanceLists,
                        otherLists
                    });
                });
                break;
            case "Average":
                this.setState({
                    pageNum: 1,
                    advanceLists:[],
                    otherLists:[]
                });
                post("/product/list_v4.json",{pageNum: 1,pageSize: 8,codeType: "Average"}).then((res)=>{
                    const advanceLists = res.data.purchaseAverages;
                    let otherLists = res.data.averages;
                    otherLists.forEach((item,index)=>{
                        otherLists[index] = {
                            advance:item.advance,
                            ...item.product
                        }
                    });
                    this.setState({
                        advanceLists,
                        otherLists
                    });
                });
                break;
            case "Attorn":
                this.setState({
                    pageNum: 1,
                    advanceLists:[]
                });
                post("/product/list_v4.json",{pageNum: 1,pageSize: 8,codeType: "Attorn"}).then((res)=>{
                    const advanceLists = res.data.attorn;
                    this.setState({
                        advanceLists
                    });
                });
                break;
            default:
                break;
        }
    };
    click_more = (type)=>{
        post("/product/list_v4.json",{pageNum:this.state.pageNum+1,pageSize: 8,codeType: type}).then((res)=>{
            const pageNum = this.state.pageNum+1;
            this.setState({pageNum});
            switch (type){
                case "Period":
                    let otherLists = this.state.otherLists.concat(res.data.periodical);
                    this.setState({otherLists});
                    break;
                case "Average":
                    let averageLists = res.data.averages;
                    averageLists.forEach((item,index)=>{
                        averageLists[index] = {
                            advance:item.advance,
                            ...item.product
                        }
                    });
                    averageLists = this.state.otherLists.concat(averageLists);
                    this.setState({otherLists:averageLists});
                    break;
                case "Attorn":
                    let advanceLists = this.state.advanceLists.concat(res.data.attorn);
                    this.setState({advanceLists});
                    break;
                default:
                    break;
            }
        });
    }
  render() {
    let listsContent = null;
    switch (this.state.productTab){
        case "Period":
            listsContent = <div>
                <div style={this.state.newLists.length?{}:{display:"none"}} className={style.product_block}>
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
                <div onClick={()=>{this.click_more("Period");}} className={style.click_more}>查看更多</div>
            </div>
            break;
        case "Average":
            listsContent=<div>
                <div style={this.state.advanceLists.length?{}:{display:"none"}} className={style.product_block}>
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
                <div onClick={()=>{this.click_more("Average");}} className={style.click_more}>查看更多</div>
            </div>
            break;
        case "Attorn":
            listsContent=<div>
                <div className={style.product_block}>
                    <div className={style.pdtb_top}>
                        <h4>转让专区</h4>
                        <span>捡到即赚到</span>
                    </div>
                    <Lists advance={false} attorns={true} data={this.state.advanceLists}/>
                </div>
                <div onClick={()=>{this.click_more("Attorn");}} className={style.click_more}>查看更多</div>
            </div>
            break;
        default:
            break;
    }
    return (
      <div style={{marginBottom:'50px'}}>
          <ul className={style.product_tab}>
              <li onClick={()=>{this.tabClick("Period")}} className={this.state.productTab==="Period"?style.product_tabActive:''}>到期还</li>
              <li onClick={()=>{this.tabClick("Average")}} className={this.state.productTab==="Average"?style.product_tabActive:''}>月月还</li>
              <li onClick={()=>{this.tabClick("Attorn")}} className={this.state.productTab==="Attorn"?style.product_tabActive:''}>转让</li>
          </ul>
          {listsContent}
      </div>
    );
  }
}

export default Product;