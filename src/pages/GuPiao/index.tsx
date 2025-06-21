// 股票日常工具
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import './index.less'
import type { InputChange } from '../../utils/eventTypes';



const GuPiao = () => {
    const [prie, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [guConut, setGuConut] = useState('100');
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (prie && count && guConut) {
            setVal(Number(prie) * Number(count) * Number(guConut))

        }

    }, [prie, count, guConut])

    return (
        <div className="gupiao">
            <div className='mod1'>
                <Input
                    placeholder="涨停价"
                    onChange={(e: InputChange) => { setPrice(e.target.value) }}
                    value={prie}
                />
                <Input
                    placeholder="封单手数"
                    onChange={(e: InputChange) => { setCount(e.target.value) }}
                    value={count}
                />
                <Input
                    placeholder="每首股数"
                    onChange={(e: InputChange) => { setGuConut(e.target.value) }}
                    value={guConut}
                />
                <div className='bot'>
                    <div className='left'>封单金额：</div>
                    <Input
                        placeholder="万元"
                        disabled={true}
                        value={val ? val / 10000 + '万元' : ''}
                    />
                </div>
            </div>

        </div>
    );
};

export default GuPiao;
