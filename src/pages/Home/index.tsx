// 首页，梦幻物品价格走势
import { Button } from 'antd';
import { Timeline } from 'antd';
import ReactECharts from 'echarts-for-react';
import btnArr from '../../data/price'
import information from '../../data/information'
import { useState } from 'react';
import './index.less';

const Home = () => {
    const [con, setCon] = useState(btnArr[0])

    const option = {
        title: {
            text: con.title + '：' + con.price[con.price.length - 1],
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
            data: con.time,
        },
        yAxis: {},
        series: [
            {
                name: '价格',
                type: 'line',
                data: con.price,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }
            },

        ],

    };

    const tips = () => {
        let t = null;

        if (slicedArr.length) {
            if (lastVal < min) {
                t = <div className='redText mt20'>价格新低</div>;
            }

            if (lastVal > max) {
                t = <div className='redText mt20'>价格新高</div>;
            }

        }
        return t;

    }

    const tips2 = () => {
        let t = null;

        if (risePercent > 15 && con.price.length > 1) {
            t = <div className='redText mt20'>最大涨跌幅已达到{risePercent.toFixed(2)}%</div>;
        }

        return t;

    }



    const slicedArr = con.price.slice(0, -1);

    const min = Math.min(...slicedArr);
    const max = Math.max(...slicedArr);
    const lastVal = con.price[con.price.length - 1]


    const max2 = Math.max(...con.price);
    const min2 = Math.min(...con.price);

    // 计算从最低涨到最高的涨幅（百分比）
    const risePercent = ((max2 - min2) / min2) * 100;

    return (
        <div className='home'>
            <h1>梦幻物品价格走势</h1>

            <div className='btn-mod'>
                {
                    btnArr.map((val, index) => {
                        return <Button type="primary" style={{ marginRight: '15px', marginBottom: '10px' }} onClick={() => setCon(val)} key={index}>{val.title}</Button>
                    })
                }
            </div>

            {
                tips()
            }
            {
                tips2()
            }

            <div className='charCon'>
                <ReactECharts option={option} style={{ height: 550 }} />
            </div>

            <div className='information'>
                <h2>相关资讯</h2>
                <div className='mod'>
                    <Timeline
                        items={information.map(item => ({
                            children: item.time + item.text
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
