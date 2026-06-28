import React, { useState, useEffect } from "react";
export default function QR({ cart, cartTotal, orderNumber, onBack, onComplete }) {
    const [seconds, setSeconds] = useState(180);
    const [isExpired, setIsExpired] = useState(false);
    useEffect(() => {
        if (isExpired) return;

        if (seconds <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setTimeout(() => {
            setSeconds(s => s - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, isExpired]);
    const buildReceipt = () => {
        const titleLine = "SELF-RESTAURANT";
        const infoLine = `Ma don hang: ${orderNumber}\nNgay: ${new Date().toLocaleDateString()}`;

        const itemsList = cart.length > 0
            ? cart.map((item, index) => `${index + 1}. ${item.name} (${item.size}/${item.temp}/${item.sweetness}) x${item.quantity}`).join('\n')
            : "- Khong co thong tin -";
        const totalLine = `Tong tien: ${cartTotal.toLocaleString()} VND`;
        return `${titleLine}\n${infoLine}\n${itemsList}\n${totalLine}\n`;
    };

    const qrData = buildReceipt();
    const QRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&ecc=M&color=2e1d1a`;

    const handleRetry = () => {
        setSeconds(180);
        setIsExpired(false);
    };

    return (
        <div className="qr-screen">
            <div className="qr-content" >
                <div className="qr-inst-title">Quét mã để thanh toán</div>
                <div className="qr-box">
                    {isExpired ? (
                        <div className="qr-box-time">
                            <div className="qr-time-container">
                                <span className="qr-time-title">Mã đã hết hạn</span>
                            </div>
                            <button className="btn-retry-qr" onClick={handleRetry}>
                                Thử lại
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="qr-canvas-container">
                                <img className="qr-img" src={QRUrl} alt="Receipt QR" />
                            </div>

                            <div className="qr-timer">
                                <div className="qr-seconds">{seconds}s</div>
                            </div>
                        </>
                    )}
                </div>

                <button
                    className="btn-primary"
                    onClick={onComplete}
                    disabled={isExpired}
                >
                    Hoàn thành
                </button>
            </div>
            <button onClick={onBack} className="back-button" >
                ← Quay lại
            </button>
        </div>
    );
}