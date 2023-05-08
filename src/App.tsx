import './App.css';
import Router from './Component/Route/Route';
import Theme from './Component/uitheme/Theme';
function App() {
  
  return (
    <div className="App">
      <Theme>
        <Router/>
      </Theme>
    </div>  
  );
}

export default App;
