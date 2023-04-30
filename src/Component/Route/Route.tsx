import { Routes,Route } from 'react-router-dom';
import GetStarted from '../GetStarted/GetStarted';
import Quiz from '../Quiz/Quiz';
function Router(){
    return(
        <div>
             <Routes>
    <Route path="/" element={<GetStarted/>}/>
    <Route path='/quiz-app' element={<Quiz/>}/>
  </Routes>
        </div>
    )
}
export default Router