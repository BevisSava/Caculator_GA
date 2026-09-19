import { useState } from 'react';
import Display from './Display.jsx';
import Keypad from './Keypad.jsx';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { FaHistory } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

function CalculatorApp() {
  const { history, clearHistory, serviceInfo } = useCalculator();
  const [showHistory, setShowHistory] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="calculator-wrapper">
      <div className="calculator" id="calculator-main">
        <div className="calculator__toolbar">
          <button
            className="calculator__toolbar-btn"
            id="btn-toggle-history"
            onClick={() => { setShowHistory(!showHistory); setShowInfo(false); }}
            title="Lịch sử phép tính"
          >
          <FaHistory />
          </button>
          <div className="calculator__toolbar-dots">
            <span className="dot dot--red"></span>
            <span className="dot dot--yellow"></span>
            <span className="dot dot--green"></span>
          </div>
          <button
            className="calculator__toolbar-btn"
            id="btn-toggle-info"
            onClick={() => { setShowInfo(!showInfo); setShowHistory(false); }}
            title="Thông tin Service"
          >
          <CiCircleMore />
          </button>
        </div>

        {showHistory && (
          <div className="calculator__panel calculator__panel--history" id="history-panel">
            <div className="panel__header">
              <h3> Lịch sử</h3>
              {history.length > 0 && (
                <button className="panel__clear-btn" onClick={clearHistory}>
                  Xóa
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="panel__empty">Chưa có phép tính nào</p>
            ) : (
              <ul className="panel__list">
                {history.map((entry, i) => (
                  <li key={i} className="panel__list-item">{entry}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showInfo && (
          <div className="calculator__panel calculator__panel--info" id="info-panel">
            <div className="panel__header">
              <h3> Service Info</h3>
            </div>
            <div className="panel__info-grid">
              <div className="info-item">
                <span className="info-label">Service</span>
                <span className="info-value">{serviceInfo.SERVICE_NAME}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Version</span>
                <span className="info-value">v{serviceInfo.VERSION}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Port</span>
                <span className="info-value">{serviceInfo.PORT}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Endpoint</span>
                <span className="info-value">{serviceInfo.ENDPOINT}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value info-value--active">
                  ● {serviceInfo.status}
                </span>
              </div>
            </div>
          </div>
        )}

        <Display />
        <Keypad />
      </div>
    </div>
  );
}

export default CalculatorApp;
