import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner';
import Login from './pages/Login';
import Home from './pages/Home';
import FindAccount from './pages/FindAccount';
const  Community = lazy(() =>import ('./pages/Community/Community'))
const  Main = lazy(() =>import ('./pages/Main/Main'))
const  PoolSearch = lazy(() =>import ('./pages/Main/PoolSearch'))
const  MyLog = lazy(() =>import ('./pages/MyLog/MyLog'))
const  SignUp = lazy(() =>import ('./pages/SignUp'))
const  PoolSearchList = lazy(() =>import ('./pages/Main/PoolSearchList'))
const  PublicRoute = lazy(() =>import ('./components/Login/PublicRoute'))
const  PrivateRoute = lazy(() =>import ('./components/Login/PrivateRoute'))
const  CommunityWrite = lazy(() =>import ('./pages/Community/CommunityWrite'))
const  CommunityDetail = lazy(() =>import ('./pages/Community/CommunityDetail'))
const  CommunityDetailEdit = lazy(() =>import ('./pages/Community/CommunityDetailEdit'))
const  MyAccountComment = lazy(() =>import ('./pages/MyAccount/MyAccountComment'))
const  MyAccountWrited = lazy(() =>import ('./pages/MyAccount/MyAccountWrited'))
const  MyAccountReview = lazy(() =>import ('./pages/MyAccount/MyAccountReview'))
const  MyAccountEdit = lazy(() =>import ('./pages/MyAccount/MyAccountEdit'))
const  MyAccount = lazy(() =>import ('./pages/MyAccount/MyAccount'))
const  PoolSearchReivew = lazy(() =>import ('./pages/Main/PoolSearchReview'))
const  ReviewWrite = lazy(() =>import ('./pages/Review/ReviewWrite'))
const  ReviewDetail = lazy(() =>import ('./pages/Review/ReviewDetail'))
const  ReviewEdit = lazy(() =>import ('./pages/Review/ReviewEdit'))
const  MyLogWrite = lazy(() =>import ('./pages/MyLog/MyLogWrite'))
const  MyLogList = lazy(() =>import ('./pages/MyLog/MyLogList'))
const  MyAccountDelete = lazy(() =>import ('./pages/MyAccount/MyAccountDelete'))
const  MyLogEdit = lazy(() =>import ('./pages/MyLog/MyLogEdit'))
const  MyLogSearchYear = lazy(() =>import ('./pages/MyLog/MyLogSearchYear'))
const  MyLogSearchMonth = lazy(() =>import ('./pages/MyLog/MyLogSearchMonth'))



function App() {
  return (
    <>
        <HelmetProvider>
          <div className="App">
            <Suspense fallback={<Spinner size={200} />}>
              <Routes>
                <Route path="/" element={<PublicRoute component={<Home />} />} />
                <Route path="/login" element={<PublicRoute component={<Login />} />} />
                <Route path="/signup" element={<PublicRoute component={<SignUp />} />} />
                <Route path="/findAccount" element={<PublicRoute component={<FindAccount />} />} />
                <Route path="/main" element={<PrivateRoute component={<Main />} />} />
                <Route
                  path="/accountEdit"
                  element={<PrivateRoute component={<MyAccountEdit />} />}
                />
                <Route
                  path="/accountDelete"
                  element={<PrivateRoute component={<MyAccountDelete />} />}
                />
                <Route path="/account" element={<PrivateRoute component={<MyAccount />} />}>
                  <Route
                    path="comment"
                    element={<PrivateRoute component={<MyAccountComment />} />}
                  />
                  <Route path="writed" element={<PrivateRoute component={<MyAccountWrited />} />} />
                  <Route path="review" element={<PrivateRoute component={<MyAccountReview />} />} />
                </Route>
                <Route path="/search" element={<PrivateRoute component={<PoolSearch />} />}>
                  <Route
                    path="/search/list"
                    element={<PrivateRoute component={<PoolSearchList />} />}
                  />
                  <Route
                    path="/search/list/:swimmingPoolId"
                    element={<PrivateRoute component={<PoolSearchReivew />} />}
                  />
                </Route>
                <Route
                  path="/search/list/:swimmingPoolId/reviewList"
                  element={<PrivateRoute component={<ReviewDetail />} />}
                />
                <Route
                  path="/search/list/:swimmingPoolId/reviewList/write"
                  element={<PrivateRoute component={<ReviewWrite />} />}
                />
                <Route
                  path="/search/list/:swimmingPoolId/reviewList/:reviewId/edit"
                  element={<PrivateRoute component={<ReviewEdit />} />}
                />
                <Route path="/community" element={<PrivateRoute component={<Community />} />} />
                <Route
                  path="/communityWrite"
                  element={<PrivateRoute component={<CommunityWrite />} />}
                />
                <Route
                  path="/community/:communityId"
                  element={<PrivateRoute component={<CommunityDetail />} />}
                />

                <Route
                  path="/community/:communityId/edit"
                  element={<PrivateRoute component={<CommunityDetailEdit />} />}
                />
                <Route path="/mylog" element={<PrivateRoute component={<MyLog />} />}>
                  <Route
                    path="/mylog/:date"
                    element={<PrivateRoute component={<MyLogList />} />}
                  />
                  <Route
                    path="/mylog/logs/year"
                    element={<PrivateRoute component={<MyLogSearchYear />} />}
                  />
                  <Route
                    path="/mylog/logs/month"
                    element={<PrivateRoute component={<MyLogSearchMonth />} />}
                  />
                </Route>
                <Route path="/mylog/write" element={<PrivateRoute component={<MyLogWrite />} />} />
                  <Route
                    path="/mylog/:date/:logId/edit"
                    element={<PrivateRoute component={<MyLogEdit />} />}
                  />
              </Routes>
            </Suspense>

          </div>
   
        </HelmetProvider>
      
      <Toaster />
    </>
  );
}

export default App;
