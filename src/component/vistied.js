import React, { Component } from 'react';
import { PullToRefresh } from 'antd-mobile';
import { post} from  '../utils/request';
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
            dtLists:[],   //动态lists
            kpLists:[],   //科普lists
            refreshing: false,  //是否显示刷新状态
            height: document.documentElement.clientHeight,  //获取文档的高度
            firstPage:1,  //动态lists的当前页数
            firstTotalPage:3,  //动态lists的总页数
            secondTotalPage:3, //科普lists的总页数
            secondPage:1, //科普lists的当前页数
            dtIndicator:{},  //动态列表是否为最后一页
            kpIndicator:{}   //科普列表是否为最后一页
        }
    }
    componentDidMount() {
        this.getListsData(1,10,"MANDO_POLULARSCIENCE").then((res)=>{
            this.setState({
                dtLists:res.items
            })
        });
        this.getListsData(1,10,"NEWS_TRENDS").then((res)=>{
            this.setState({
                kpLists:res.items
            })
        });
    }
    componentWillMount(){

    }
    //通过promise获取利lists数据
    getListsData = (pageNo=1,pageSize=10,type="MANDO_POLULARSCIENCE") => {
        let postData = {
            pageNo:pageNo,
            pageSize:pageSize,
            type:type
        }
        let listsData = new Promise((resolve,reject)=>{
            post("/newsHelp/findNewsHelpAll.json",postData).then((res)=>{
                if(res.success){
                    resolve(res);
                }else {
                    reject(res);
                }
            });
        });
        return listsData;
    }
    listClick = (data) =>{
        console.log(data);
        window.location.href = data.clickUrl;
    }
  render() {
    const lists = this.state.lists;
    const register = this.state.register;
    const active = this.state.active;
    const dtLists = this.state.dtLists;
    const kpLists = this.state.kpLists;
    const dtIndicator = this.state.dtIndicator;
    const kpIndicator = this.state.kpIndicator;
    let login = null;
    let dataLists = null;  //需要遍历的list数据集合
    //根据登陆状态，渲染不同的dom
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

    //根据选中的菜单，赋值需要遍历的数组
    if(active==="first"){
        dataLists = dtLists;
    }else {
        dataLists = kpLists;
    }
    //遍历数据数组，生成需要的dom集合
    let items = dataLists.map((item,index)=>{
        return (
            <div className={style.vtdList_item} key={item.id} onClick={()=>{this.listClick(item)}}>
                <img src={item.newsImg} alt=""/>
                <div>
                    <p>{item.title}</p>
                    <span>{item.modifyDate}</span>
                </div>
            </div>
        )
    })
    return (
      <div className={style.visted}>
          {login}
          <HorizontalLists lists={lists}></HorizontalLists>
          <div className={style.vtdList_title}>
              <div onClick={()=>{this.setState({active:"first"})}} className={active==="first" ? style.title_active:""}>满兜动态</div>
              <div onClick={()=>{this.setState({active:"second"})}} className={active==="second" ? style.title_active:""}>满兜科普</div>
          </div>
          <div className={style.vtdList_content}>
              <PullToRefresh
                  damping={60}
                  distanceToRefresh={60}
                  ref={el => this.ptr = el}
                  style={{
                      overflow: 'auto',
                      height:register ? this.state.height - 230 : this.state.height - 298
                  }}
                  indicator={active==="first"?dtIndicator:kpIndicator}
                  direction= "up"
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                      if(active==="first"){
                          //判断是否为最后一页
                          if(this.state.firstPage===this.state.firstTotalPage){
                              return false;
                          }
                          this.setState({ refreshing: true });
                          this.getListsData(this.state.firstPage+1,10,"MANDO_POLULARSCIENCE").then((res)=>{
                              let listsData = this.state.dtLists;
                              listsData = listsData.concat(res.items);
                              //判断满兜状态如果是最后一页，改变上拉刷新的指示器配置
                              if(this.state.firstPage+1===res.totalPage){
                                  this.setState({
                                      dtIndicator:{ activate: '我是有底线的', deactivate: '我是有底线的', release: '我是有底线的', finish: '我是有底线的'}
                                  })
                              }
                              this.setState({
                                  dtLists:listsData,
                                  refreshing:false,
                                  firstPage:this.state.firstPage+1,
                                  firstTotalPage:res.totalPage,
                              })
                          });
                      }else {
                          //判断是否为最后一页
                          if(this.state.secondPage===this.state.sectionRowIndex){
                              return false;
                          }
                          this.setState({ refreshing: true });
                          this.getListsData(this.state.secondPage+1,10,"NEWS_TRENDS").then((res)=>{
                              let listsData = this.state.kpLists;
                              listsData = listsData.concat(res.items);
                              //判断满兜科普如果是最后一页，改变上拉刷新的指示器配置
                              if(this.state.secondPage===res.totalPage){
                                  this.setState({
                                      kpIndicator:{ activate: '我是有底线的', deactivate: '我是有底线的', release: '我是有底线的', finish: '我是有底线的'}
                                  })
                              }
                              this.setState({
                                  kpLists:listsData,
                                  refreshing:false,
                                  secondPage:this.state.secondPage+1,
                                  secondTotalPage:res.totalPage
                              })
                          });
                      }
                  }}
              >
                  {items}
              </PullToRefresh>
          </div>
      </div>
    );
  }
}

export default Vistied;