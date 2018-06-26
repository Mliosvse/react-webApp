/**
 * Created by Administrator on 2018/6/22.
 */
import React from 'react';
import style from '../style/layout.less'

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vipIcon:"./images/crown1.png"
        };
    }
    click_hotLabel = (hotUrl)=>{
        console.log(hotUrl);
    }
    render() {
        const advance = this.props.advance;  //是否预约计划
        const attorns = this.props.attorns;  //是否转让专区
        const listsData = this.props.data;
        const items = listsData.map((item,index)=>{
            let soldOut = true;     //list状态
            let normalLable = null;  //普通标签,预购标签
            let vipLable = null;    //vip标签
            let rewardTip = null;    //可用奖券
            let appendRate = null;    //加息标签
            let hotLabel = null;    //火热标签
            let contentRight = null; //list有部分内容
            //判断是否为转让产品
            if(attorns){
                soldOut = item.state===2;
                if(item.state===2){
                    rewardTip = <span className={style.list_attron}>已转让</span>
                }
                vipLable = <span className={[style.list_interest,soldOut?style.list_garyInterest:''].join(" ")}>承接可获得收益{Math.floor(item.interest * 100) / 100}元</span>;
                contentRight = <div>
                    <p style={{textAlign:"right"}} className={[style.list_intervals,soldOut?style.list_grayIntervals:''].join(" ")}>{item.money}</p>
                    <p style={{textAlign:"right"}} className={[style.list_remark,soldOut?style.list_grayRemark:''].join(" ")}>转让金额</p>
                </div>;
            }else {
                soldOut = item.state.value ==='end'||item.state.value ==='success';
                if(item.rewardCount!==0&&item.state.value!=="success"){
                    rewardTip = <div className={style.list_rewardTip}><span style={{color:'#ff6450'}}>{item.rewardCount}张</span>奖券可用</div>
                }
                if(item.appendRate){
                    appendRate = <span>+{item.appendRate}%</span>
                }
                if(item.hotLabel){
                    hotLabel = <div className={style.list_bottom}
                                    onClick={()=>{
                                        this.click_hotLabel(item.hotLabelUrl);
                                    }
                                    }>
                        <span className={[style.list_hotLabel,soldOut?style.list_garyHotLabel:''].join(" ")}><i></i>{item.hotLabel}</span>
                    </div>
                }
                if(item.vipAppendRate){
                    vipLable = <span className={[style.list_vipLable,soldOut?style.list_garyVipLable:''].join(" ")}><i></i>VIP加息</span>
                }
                if(item.advance&&!advance){
                    normalLable = <span className={[style.list_normalLable,soldOut?style.list_grayNomlLable:''].join(" ")}>预购</span>
                }else if(item.tag){
                    normalLable = <span className={[style.list_normalLable,soldOut?style.list_grayNomlLable:''].join(" ")}>{item.tag.text}</span>
                }
                //根据产品转状态,改变list
                if(item.state.value === "success"){
                    contentRight = <div className={[style.list_yyBtn,soldOut?style.list_garyYyBtn:''].join(" ")}>已售罄</div>;
                }else if(item.state.value === "end"){
                    contentRight = <div className={[style.list_yyBtn,soldOut?style.list_garyYyBtn:''].join(" ")}>已结束</div>;
                }else if(item.state.value === "released"){
                    contentRight = <div className={style.list_yyBtn}>{item.countdown}开售</div>;
                }else if(item.state.value === "raising"){
                    if(advance){
                        contentRight = <div className={style.list_yyBtn}>立即预约</div>;
                    }else {
                        contentRight = <div>
                            <p style={{textAlign:"right"}} className={[style.list_intervals,soldOut?style.list_grayIntervals:''].join(" ")}>{item.surplusMoney||item.raise-item.raised}</p>
                            <p style={{textAlign:"right"}} className={[style.list_remark,soldOut?style.list_grayRemark:''].join(" ")}>剩余可售</p>
                        </div>;
                    }
                }
            }
            return (
                <div key={item.id} className={style.list}>
                    <div className={style.list_title}>
                        <div className={[style.list_name,soldOut?style.list_grayName:''].join(" ")}>
                            {normalLable}
                            {item.name}
                            {vipLable}
                        </div>
                        {rewardTip}
                    </div>
                    <div className={style.list_content}>
                        <div style={{width:'35%'}}>
                            <p className={[style.list_rate,soldOut?style.list_grayRate:''].join(" ")}>{item.rate}% {appendRate}</p>
                            <span className={[style.list_remark,soldOut?style.list_grayRemark:''].join(" ")}>预计年化</span>
                        </div>
                        <div style={{width:'32%'}}>
                            <p className={[style.list_intervals,soldOut?style.list_grayIntervals:''].join(" ")}>{item.startTime||item.intervals}<span>{item.unit.value==='month'?'期':'天'}</span></p>
                            <p style={{textAlign:"center"}} className={[style.list_remark,soldOut?style.list_grayRemark:''].join(" ")}>期限</p>
                        </div>
                        <div style={{width:'30%'}}>
                            {contentRight}
                        </div>
                    </div>
                    {hotLabel}
                </div>
            )
        });
        return (
            <div className={style.lists}>
                {items}
            </div>
        );
    }
}

export default Lists;
