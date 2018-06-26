import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { get, post} from  '../utils/request';
import style from '../style/App.less';
import HorizontalLists from '../layout/horizontalLists'

window.$http = {get,post};

class App extends Component {
    constructor(prop){
        super(prop);
        this.state= {
            lists:[
                {src:'./images/home_invite.png',text:'邀请好友'},
                {src:'./images/home_operational.png',text:'运营数据'},
                {src:'./images/home_mall.png',text:'兜币商城'},
                {src:'./images/home_school.png',text:'兜友学堂'},
            ],
            bottomLists:[
                {src:'./images/home_Introductio.png',text:'信息披露'},
                {src:'./images/home_safety.png',text:'安全措施'},
                {src:'./images/home_compliance.png',text:'合规进程'},
                {src:'./images/home_icp.png',text:'ICP许可证'},
            ],
            bannerLists: [
                {picture:'https://test-mobile.mandofin.com/picture/dfs/group1/M00/00/29/wKgAGFq-EACAF7yaAAGk2HR4OWc584.jpg',id:"smy1",bannerUrl:"www.baidu.com"},
                {picture:'https://test-mobile.mandofin.com/picture/dfs/group1/M00/00/34/wKgAGFr9Q22AaPW9AAF1lqmrHFQ487.jpg',id:"smy2",bannerUrl:"www.baidu.com"},
                {picture:'https://test-mobile.mandofin.com/picture/dfs/group1/M00/00/0F/wKgAGFob4j2AeMHlAAD-kblgNmA478.png',id:"smy3",bannerUrl:"www.baidu.com"},
                ],
            mobileLists:[
                [
                    {mobile: '139*****645', text: '消费金融D1232', money: '2000元'},
                    {mobile: '139*****641', text: '消费金融D1232', money: '1000元'},
                    {mobile: '139*****643', text: '消费金融D1232', money: '1000元'}
                ],
                [
                    {mobile:'139*****644',text:'消费金融D1232',money:'200元'},
                    {mobile:'139*****615',text:'消费金融D1232',money:'4000元'},
                    {mobile:'139*****642',text:'消费金融D1232',money:'5000元'}
                ],
                [
                    {mobile:'139*****615',text:'消费金融D1232',money:'800元'},
                    {mobile:'139*****115',text:'消费金融D1232',money:'9000元'},
                    {mobile:'139*****145',text:'消费金融D1232',money:'10000元'}
                ]
            ],
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
    onChange = (val) => {
        console.log(val);
    }
  render() {
    const monlieLists = this.state.mobileLists;
    return (
      <div className={style.App}>
          <WingBlank  className={style.App_header}>
              <Carousel autoplay={true} infinite style={{width:'100%'}} dotStyle={{marginBottom:'10px'}} dotActiveStyle={{marginBottom:'10px'}}>
                  {this.state.bannerLists.map(val => (
                      <a key={val.id} href={val.bannerUrl}>
                          <img className={style.App_banner} src={val.picture} alt=""/>
                      </a>
                  ))}
              </Carousel>
          </WingBlank>
          <div className={style.App_data}>
              <div>累计投资<span>15.14</span>亿</div>
              <div>用户总<span>19.23</span>万</div>
          </div>
          <HorizontalLists lists={this.state.lists}></HorizontalLists>
          <p className={style.app_tip}>周日24点服务器调整的通知</p>
          <div className={style.app_newTag}>
              <p className={style.new_title}>新人乐F044 <span className={style.new_tag}>新手标</span></p>
              <div className={style.new_block}>
                  <div>
                      <span>预计年化收益率</span>
                      <p>9.00%</p>
                  </div>
                  <div>
                      <span>理财期限</span>
                      <p>27天</p>
                  </div>
              </div>
              <div className={style.new_btn}>立即投资</div>
          </div>
          <div className={style.tztz}>
              <p>他们在投资</p>
              <WingBlank className={style.carousel}>
                  <Carousel vertical dots={false} dragging={false} swiping={false} autoplay infinite speed={1000} autoplayInterval={4000} resetAutoplay={false}>
                      {monlieLists.map((item,index) => (
                          <ul className={style.carousel_content} key={index+"carousel"}>
                              <li><span>{item[0].mobile}</span><span>{item[0].text}</span><span>{item[0].money}</span></li>
                              <li><span>{item[1].mobile}</span><span>{item[1].text}</span><span>{item[1].money}</span></li>
                              <li><span>{item[2].mobile}</span><span>{item[2].text}</span><span>{item[2].money}</span></li>
                          </ul>
                      ))}
                  </Carousel>
              </WingBlank>
          </div>
          <HorizontalLists lists={this.state.bottomLists}></HorizontalLists>
          <ul className={style.footer}>
              <li>
                  <span></span>
                  <p>中房集团投资控股</p>
              </li>
              <li>
                  <span></span>
                  <p>上海银行存管</p>
              </li>
          </ul>
      </div>
    );
  }
}

export default App;