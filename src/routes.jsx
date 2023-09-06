import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}> 
    </Route>
  )
);

export default router;
