import { useCalculator } from '../context/CalculatorContext.jsx';

const KEYPAD_LAYOUT = [
  [
    { label: 'AC', type: 'clear', value: null, className: 'btn--function' },
    { label: '⌫', type: 'backspace', value: null, className: 'btn--function' },
    { label: '%', type: 'percent', value: null, className: 'btn--function' },
    { label: '÷', type: 'operator', value: '÷', className: 'btn--operator' },
  ],
  [
    { label: '7', type: 'digit', value: '7', className: 'btn--digit' },
    { label: '8', type: 'digit', value: '8', className: 'btn--digit' },
    { label: '9', type: 'digit', value: '9', className: 'btn--digit' },
    { label: '×', type: 'operator', value: '×', className: 'btn--operator' },
  ],
  [
    { label: '4', type: 'digit', value: '4', className: 'btn--digit' },
    { label: '5', type: 'digit', value: '5', className: 'btn--digit' },
    { label: '6', type: 'digit', value: '6', className: 'btn--digit' },
    { label: '-', type: 'operator', value: '-', className: 'btn--operator' },
  ],
  [
    { label: '1', type: 'digit', value: '1', className: 'btn--digit' },
    { label: '2', type: 'digit', value: '2', className: 'btn--digit' },
    { label: '3', type: 'digit', value: '3', className: 'btn--digit' },
    { label: '+', type: 'operator', value: '+', className: 'btn--operator' },
  ],
  [
    { label: '0', type: 'digit', value: '0', className: 'btn--digit btn--wide' },
    { label: '.', type: 'decimal', value: '.', className: 'btn--digit' },
    { label: '=', type: 'equals', value: null, className: 'btn--equals' },
  ],
];

function Keypad() {
  const { dispatch, hasOperator } = useCalculator();
  const handleClick = (btn, event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    dispatch(btn.type, btn.value);
  };

  return (
    <div className="keypad" id="calculator-keypad">
      {KEYPAD_LAYOUT.map((row, rowIndex) => (
        <div className="keypad__row" key={rowIndex}>
          {row.map((btn) => (
            <button
              key={btn.label}
              id={`btn-${btn.type}-${btn.value || btn.label}`}
              className={`keypad__btn ${btn.className} ${
                btn.type === 'operator' && hasOperator ? '' : ''
              }`}
              onClick={(e) => handleClick(btn, e)}
              aria-label={`Nút ${btn.label}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keypad;
