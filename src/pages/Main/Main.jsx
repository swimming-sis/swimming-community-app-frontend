import Account from '@/components/Icon/Account';
import Logo from '@/components/Logo';
import MyCalendar from '@/components/MyCalendar';
import useFetchData from '@/hooks/useFetchData';
import Nav from '@/layout/Nav';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Main() {

  const [postData, setPostData] = useState([]);
  const fetchListData = useFetchData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts`);
  useEffect(() => {
    if (fetchListData.data?.result?.content) {
      setPostData(fetchListData.data.result.content.slice(0, 5));
    }
  }, [fetchListData?.data?.result?.content]);

  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title className="sr-only">메인 페이지</title>
      </Helmet>
      <header className="relative">
        <Logo width={100} height={50} className={'my-2.5'} />
        <Account className="absolute top-3 right-6" />
      </header>
      <MyCalendar />
      <p className="text-secondary font-semibold mt-6 ml-4 font-pretendard">우리들의 수영 이야기</p>
      <ol className="font-pretendard text-secondary text-xs border py-4 px-2 m-2.5 rounded-2xl shadow-md">
        {postData.map((post) => {
          return (
            <li 
            className="list-disc ml-4"
            key={post.postId}>
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
