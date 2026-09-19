import { CalculatorProvider } from './context/CalculatorContext.jsx';
import CalculatorApp from './components/CalculatorApp.jsx';

function App() {
  return (
    <CalculatorProvider>
      <CalculatorApp />
    </CalculatorProvider>
  );
}

export default App;
