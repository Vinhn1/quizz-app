import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Topics from "./pages/Topics/Topics";
import Quiz from "./pages/Quiz/Quiz";

function App() {
  return(
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/topics' element={<Topics/>}/>
      <Route path='/quiz/:topicId' element={<Quiz/>}/>
    </Routes>
  )
}

export default App;