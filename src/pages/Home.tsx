
import { Button } from 'antd';
import ReactECharts from 'echarts-for-react';
import btnArr from '../json/index'
import { useState } from 'react';



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
            <h1>钟灵石价格走势</h1>

            {
                btnArr.map((val, index) => {
                    return <Button type="primary" style={{ marginRight: '20px' }} onClick={() => setCon(val)} key={index}>{val.title}</Button>
                })
            }

            {
                lastVal < min && slicedArr.length
                    ? <div className='redText mt20'>价格新低</div>
                    : null
            }

            {
                lastVal > max && slicedArr.length
                    ? <div className='redText mt20'>价格新高</div>
                    : null
            }

            {
                risePercent > 10 && con.price.length > 1
                    ? <div className='redText mt20'>最大涨跌幅已达到{risePercent}%</div>
                    : null
            }



            <div className='charCon'>
                <ReactECharts option={option} style={{ height: 550 }} />
            </div>
        </div>
    );
};

export default Home;
