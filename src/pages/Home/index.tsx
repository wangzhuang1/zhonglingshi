
import { Button } from 'antd';
import ReactECharts from 'echarts-for-react';
import btnArr from '../../data/index'
import { useState } from 'react';
import './index.less';

const Home = () => {
    const [con, setCon] = useState(btnArr[0])

    const option = {
        title: {
            text: con.title,
        },
        tooltip: {},
        xAxis: {
            data: con.time,
        },
        yAxis: {},
        series: [
            {
                name: '价格',
                type: 'line',
                data: con.price,
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

        if (risePercent > 10 && con.price.length > 1) {
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

            {
                btnArr.map((val, index) => {
                    return <Button type="primary" style={{ marginRight: '20px', marginBottom: '10px' }} onClick={() => setCon(val)} key={index}>{val.title}</Button>
                })
            }

            {
                tips()
            }
            {
                tips2()
            }

            <div className='charCon'>
                <ReactECharts option={option} style={{ height: 550 }} />
            </div>
        </div>
    );
};

export default Home;
