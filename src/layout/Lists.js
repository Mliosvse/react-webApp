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

    render() {
        const listsData = this.props.data;
        const items = listsData.map((item,index)=>{
            return (
                <div key={item.id}>
                    <div className={style.list_title}>
                        <div className={style.list_name}>
                            <span className={style.list_normalLable}>热门</span>
                            {item.name}
                            <span className={style.list_vipLable}><i></i>VIP加息</span>
                        </div>
                        <div className={style.list_rewardTip}><span style={{color:'#ff6450'}}>{item.rewardCount}张</span>奖券可用</div>
                    </div>
                    <div className={style.list_content}>
                        <div>
                            <p className={style.list_rate}>{item.rate}% <span>+{item.appendRate}%</span></p>
                            <span className={style.list_remark}>预计年化</span>
                        </div>
                        <div>
                            <p className={style.list_intervals}>{item.intervals}<span>天</span></p>
                            <p style={{textAlign:"center"}} className={style.list_remark}>期限</p>
                        </div>
                        <div>
                            <div className={style.list_yyBtn}>立即预约</div>
                        </div>
                    </div>
                    <div className={style.list_bottom}>
                        <span className={style.list_commonLabel}><i></i>{item.commonLabel}</span>
                    </div>
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
