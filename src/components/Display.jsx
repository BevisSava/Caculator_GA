import { useCalculator } from '../context/CalculatorContext.jsx';

function Display() {
  const { formattedDisplay, expression, displayValue } = useCalculator();
  const getFontSize = () => {
    const len = formattedDisplay.length;
    if (len > 14) return '1.5rem';
    if (len > 11) return '2rem';
    if (len > 8) return '2.5rem';
    return '3rem';
  };

  return (
    <div className="display" id="calculator-display">
      <div className="display__expression" id="display-expression">
        {expression || '\u00A0'}
      </div>
      
      <div
        className="display__value"
        id="display-value"
        style={{ fontSize: getFontSize() }}
      >
        {formattedDisplay}
      </div>

      <div className="display__indicator">
        {displayValue === 'Error' && (
          <span className="display__error-badge"> Lỗi</span>
        )}
      </div>
    </div>
  );
}

export default Display;
