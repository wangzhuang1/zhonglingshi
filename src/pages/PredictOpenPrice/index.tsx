import { useState } from 'react';
import './index.less'

interface Order {
    price: number;
    volume: number;
}

interface Result {
    matchPrice: number;
    maxVolume: number;
}

export default function PredictOpenPrice() {
    const [buyOrders, setBuyOrders] = useState<string>('');
    const [sellOrders, setSellOrders] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);

    const parseOrders = (input: string): Order[] => {
        return input
            .split(',')
            .map(order => {
                const [price, vol] = order.split('@');
                return {
                    price: parseFloat(price),
                    volume: parseInt(vol, 10)
                };
            })
            .sort((a, b) => b.price - a.price);
    };

    const calculateMatchPrice = (): void => {
        const buys: Order[] = parseOrders(buyOrders);
        const sells: Order[] = parseOrders(sellOrders).sort((a, b) => a.price - b.price);

        let matchPrice: number | null = null;
        let maxVolume = 0;

        for (const b of buys) {
            const totalBuyVol = buys.filter(x => x.price >= b.price).reduce((sum, x) => sum + x.volume, 0);
            const totalSellVol = sells.filter(x => x.price <= b.price).reduce((sum, x) => sum + x.volume, 0);
            const matchedVol = Math.min(totalBuyVol, totalSellVol);

            if (matchedVol > maxVolume || (matchedVol === maxVolume && (matchPrice === null || b.price < matchPrice))) {
                matchPrice = b.price;
                maxVolume = matchedVol;
            }
        }

        if (matchPrice !== null) {
            setResult({ matchPrice, maxVolume });
        }
    };

    return (
        <div className="predict-container">
            <h2 className="predict-title">预测集合竞价成交价</h2>
            <p className="text-sm mb-2">格式：价格@数量，用逗号分隔，例如：10.01@5000,10.00@2000</p>

            <textarea
                placeholder="买单列表"
                className="predict-textarea"
                rows={3}
                value={buyOrders}
                onChange={e => setBuyOrders(e.target.value)}
            />

            <textarea
                placeholder="卖单列表"
                className="predict-textarea"
                rows={3}
                value={sellOrders}
                onChange={e => setSellOrders(e.target.value)}
            />

            <button
                onClick={calculateMatchPrice}
                className="predict-button"
            >
                计算撮合价
            </button>

            {result && (
                <div className="predict-result">
                    <p>预测成交价：<strong>{result.matchPrice.toFixed(2)} 元</strong></p>
                    <p>最大成交量：<strong>{result.maxVolume} 股</strong></p>
                </div>
            )}
        </div>
    );
}
