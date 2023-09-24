import Account from '@/components/Icon/Account';
import Logo from '@/components/Logo';
import MyCalendar from '@/components/MyCalendar';
import useFetchData from '@/hooks/useFetchData';
import Nav from '@/layout/Nav';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const fetchListData = useFetchData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts`);
  useEffect(() => {
    if (fetchListData.data?.result?.content) {
      setPostData(fetchListData.data.result.content.slice(0, 5));
    }
  }, [fetchListData?.data?.result?.content]);

  return (
    <div className=" pb-[44rem] min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen">
      <Helmet>
        <title className="sr-only">메인 페이지</title>
      </Helmet>
      <header className="relative">
        <Logo width={100} height={50} className={'my-2.5'} />
        <button
          onClick={() => navigate('/account')}
          type="button"
          aria-label="내 계정 정보 확인하기">
          <Account className="absolute top-3 right-6" />
        </button>
      </header>
      <Link to={`/mylog/${moment().format('YYYY-MM-DD')}`}
        aria-label='수영일지 페이지로 이동하기'>
        <MyCalendar 
        disabled={true}
        // onClick={() => navigate(`/mylog/${date}`)} 
        />
      </Link>
      <p className="text-secondary font-semibold mt-6 ml-4 font-pretendard">우리들의 수영 이야기</p>
      <ol className="font-pretendard text-secondary text-xs border py-4 px-2 m-2.5 rounded-2xl shadow-md">
        {postData.map((post) => {
          return (
            <li className="list-disc ml-4" key={post.postId}>
              <Link to={`/community/${post.postId}`} className="flex justify-between py-0.5">
                <p>{post.title}</p>
                <time dateTime="YYYY-MM-DD">{post.createdAt}</time>
              </Link>
            </li>
          );
        })}
      </ol>
      <Nav />
    </div>
  );
}

export default Main;
