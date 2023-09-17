import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/Spinner';
import Community from './pages/Community/Community';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main/Main';
import PoolSearch from './pages/Main/PoolSearch';
import MyLog from './pages/MyLog/MyLog';
import SignUp from './pages/SignUp';
import PoolSearchList from './pages/Main/PoolSearchList';
import PublicRoute from './components/Login/PublicRoute';
import PrivateRoute from './components/Login/PrivateRoute';
import CommunityWrite from './pages/Community/\bCommunityWrite';
import CommunityDetail from './pages/Community/CommunityDetail';


// 쿼리 클라이언트 객체 생성
const queryClient = new QueryClient({
  // 모든 쿼리에 사용되는 기본 옵션
  defaultOptions: {
    queries: {
      // retry: 5, (기본 값: 3)
      // staleTime: 1 * 1000 * 60 * 60 * 24 * 7 // 7일간 (기본 값: 0)
      // cacheTime: 1 * 1000 * 60 * 5, // (기본 값: 5분)
    },
  },
});

function App() {
  return (
    <>
      {/* 쿼리 클라이언트를 앱에 공급 */}
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className="App">
          <Suspense fallback={<Spinner size={200} />}>
              <Routes>
                <Route path="/" element={
                  <PublicRoute component={<Home />} />
                } />
                <Route path="/login" element={
                  <PublicRoute component={<Login />} />
                } />
                <Route path="/signup" element={
                  <PublicRoute component={<SignUp/>} />
                } />
                <Route path="/main" element={
                  <PrivateRoute component={<Main />} />
                } />
                <Route path="/search" element={
                  <PrivateRoute component={<PoolSearch />}/>
                }>
                  <Route path="list" element={
                    <PrivateRoute component={<PoolSearchList/>} />
                  } />
                </Route>
                <Route path="/community" element={
                  <PrivateRoute component={<Community />} />
                } />
                <Route path="/communityWrite" element={
                  <PrivateRoute component={<CommunityWrite />} />
                } />
                <Route path="/community/:communityId" element={
                  <PrivateRoute component={<CommunityDetail />} />
                } />
                <Route path="/mylog" element={
                  <PrivateRoute component={<MyLog />} />
                } />
              </Routes>

          </Suspense>
        </div>
        {/* 탠스택 쿼리 개발 도구 */}
        {/* <ReactQueryDevtools /> */}

      </HelmetProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
