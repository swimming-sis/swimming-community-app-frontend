import CategoryRadioForm from '@/components/Category/CategoryRadioForm';
import CommunityList from '@/components/CommunityList';
import Top from '@/components/Icon/Top';
import SearchInput from '@/components/Input/SearchInput';
import useFetchData from '@/hooks/useFetchData';
import RootLayout from '@/layout/RootLayout';
import debounce from '@/utils/debounce';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useModalStore from '@/zustand/useModalStore';
import useDeleteData from '@/hooks/useFetchDeleteData';
import gsap from 'gsap';
import ModalComplex from '@/components/ModalComplex';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

function Community() {
  gsap.registerPlugin(ScrollToPlugin);
  let navigate = useNavigate();
  const scrollContainer = useRef(null);
  const communityRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);
  const [category, setCategory] = useState('');
  const [postData, setPostData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [value, setValue] = useState('');
  const [communityId, setCommunityId] = useState(null);
  const debouncedSetKeyword = useCallback(
    debounce((value) => setKeyword(value), 300),
    []
  );
  const { openModal, closeModal, actionType, setContent } = useModalStore();
  const fetchSearchData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/search?keyword=${keyword}`
  );
  const fetchListData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${category}`
  );
  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/delete`
  );

  useEffect(() => {
    if (fetchListData.data?.resultCode === 'SUCCESS') {
      const orderDate = fetchListData.data.result.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPostData(orderDate);
    }
  }, [fetchListData]);

  const handleTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.7,
    });
  };
  const handleWrite = () => {
    navigate('/communityWrite');
  };

  const handleChoiceCategory = (e) => {
    if (e.target.value === '전체') {
      setCategory('');
    } else {
      setCategory(e.target.value);
    }
  };

  const handleSearchKeyword = async (e) => {
    e.preventDefault();

    debouncedSetKeyword(value);

    if (keyword === '') {
      toast.error(`검색어를 입력해주세요.`);
      return;
    }

    try {
      const tokenItem = localStorage.getItem('token');
      let authHeader = '';
      if (tokenItem) {
        // eslint-disable-next-line no-useless-escape
        const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g, '');
        authHeader = `Bearer ${tokenValue}`;
      }

      const defaultOptions = {
        method: 'GET',
        headers: {
          Authorization: authHeader,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/search?keyword=${keyword}`,
        defaultOptions
      );

      const data = await response.json();

      if (!data.result.content) {
        toast.error(`검색 결과가 없어요 😢`);
        return;
      } else {
        setSearchData(data.result.content);
        setSearchActive(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);

    if (e.target.value === '') {
      setSearchActive(false);
    }
  };

  const handleTextClear = () => {
    setValue('');
    setSearchActive(false);
  };

  useEffect(() => {
    if (fetchSearchData.data?.result?.content) {
      setSearchData(fetchSearchData.data.result.content);
    }
  }, [keyword]);

  useEffect(() => {
    debouncedSetKeyword(value);
  }, [value]);

  useEffect(() => {
    if (searchData && searchActive) {
      setPostData(searchData);
    }
  }, [searchData, searchActive]);

  const handleWrited = (e) => {
    setCommunityId(e.currentTarget.getAttribute('data-post-id'));
    setContent('게시글을 삭제 하시겠습니까?\n삭제된 게시글은 복구되지 않습니다.');

    openModal('writed');
  };
  const handleConfirm = async () => {
    try {
      if (actionType === 'writed') {
        await deleteData();
        fetchListData.fetchData();
        closeModal();
        navigate('/community');
        toast.success('게시글이 삭제되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      ref={scrollContainer}
      className="relative min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard pb-20">
      <Helmet>
        <title>어푸어푸 커뮤니티</title>
      </Helmet>
      <RootLayout content="커뮤니티" onClickEdit={handleWrite} />
      <SearchInput
        id="seachCommunity"
        hidden={true}
        value={value}
        onChange={handleInput}
        onClick={handleTextClear}
        onSubmit={handleSearchKeyword}
        placeholder="검색하고 싶은 내용을 입력해보세요."
      />
      <CategoryRadioForm
        onClick={handleChoiceCategory}
        selectedCategory={category ? category : '전체'}
        onCategroyChange={handleChoiceCategory}
      />
      <div ref={communityRef}>
        {(searchActive ? searchData : postData).map((post) => (
          <CommunityList
            id={post.postId}
            key={post.postId}
            title={post.title}
            content={post.body}
            user={post.nickName}
            likeCount={post.likeCnt}
            categoryTag={post.category}
            chatCount={post.commentCnt}
            datetime={post.createdAt}
            onClick={handleWrited}
            userName={post.userName}
          />
        ))}
      </div>
      <Top onClick={handleTop} className="fixed bottom-20 right-6 shadow-2xl rounded-full" />
      <ModalComplex onClick={handleConfirm} />
    </div>
  );
}

export default Community;
