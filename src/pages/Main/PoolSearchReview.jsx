/* eslint-disable no-unused-vars */
import PoolList from '@/components/PoolList';
import ReviewList from '@/components/ReviewList';
import useFetchData from '@/hooks/useFetchData';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Pencil from '../../components/Icon/Pencil';
import ModalComponent from '@/components/ModalComponent';
import { Fragment } from 'react';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import useModalStore from '@/zustand/useModalStore';
import useDeleteData from '@/hooks/useFetchDeleteData';
import toast from 'react-hot-toast';

function PoolSearchReivew() {
  const { swimmingPoolId } = useParams();
  const [poolData, setPoolData] = useState({
    phone: '',
    placeName: '',
    placeUrl: '',
    roadAddressName: '',
    uniqueNumber: 0,
  });
  const [reviewId, setReviewId] = useState(null);
  const [poolId, setPoolId] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const {data:fetchPoolData} = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}`
  );
  const {data:fetchReviewData,fetchData} = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}/reviews/`
  );
  const {deleteData:deleteReviewData} = useDeleteData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${poolId}/reviews/${reviewId}/delete`)
  const { openModal, closeModal, actionType, content, setContent, } = useModalStore();

  //초기 수영장 값 가져오기
  useEffect(() => {
    if (fetchPoolData?.resultCode === 'SUCCESS') {
      const { phone, placeName, placeUrl, roadAddressName, uniqueNumber } =
        fetchPoolData.result;
      setPoolData((prev) => ({
        ...prev,
        phone,
        placeName,
        placeUrl,
        roadAddressName,
        uniqueNumber,
      }));
    }
  }, [fetchPoolData]);

  //초기 리뷰 리스트가져오기
  useEffect(() => {
    if (fetchReviewData?.resultCode === 'SUCCESS') {
      const orderDate = fetchReviewData.result.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      const updateReview = orderDate.slice(0, 3);
      setReviewData(updateReview);
    }
  }, [fetchReviewData]);

  //모달 취소 핸들러
  const handleCancle = () => {
    closeModal();
  };

//모달 확인 핸들러
  const handleConfirm = async () => {
    try {
      if (actionType === 'review') {
        await deleteReviewData();
        fetchData();
        closeModal();
        toast.success('리뷰가 삭제 되었어요.')
      }
    } catch (error) {
      toast.error('리뷰 삭제에 실패했어요.')
    }
  };

  const handleReview = (e) => {
    setReviewId(e.currentTarget.getAttribute('data-review-id'));
    setPoolId(e.currentTarget.getAttribute('data-swimmingpool-id'));
    setContent('리뷰를 삭제 하시겠습니까?\n삭제된 리뷰는 복구되지 않습니다.');
    openModal('review');
  };
  return (
    <div>
      <Helmet>
        <title>수영장 별 리뷰</title>
      </Helmet>
      <PoolList
        key={poolData.id}
        title={poolData.placeName}
        address={poolData.roadAddressName}
        tel={poolData.phone}
        link={poolData.placeUrl}
        id={poolData.id}
        review={true}
      />
      <section className="relative">
        <h1 className="ml-6 mt-4 mb-2 font-semibold ">리뷰</h1>
        <Link
          to={`/search/list/${swimmingPoolId}/reviewList/write`}
          className="absolute top-0 right-5">
          <Pencil />
        </Link>
        {reviewData.map((review) => (
            <ReviewList
            key={review.reviewId}
            reviewId={review.reviewId}
            id={swimmingPoolId}
            user={review.nickName}
            content={review.contents}
            userName={review.userName}
            datetime={review.createdAt}
            ratingStar={review.ratingStar}
            onClick={handleReview}
          />
        ))}
        <Link
          className="block w-[calc(100%-20px)] border py-2 my-4 mx-2.5 rounded-2xl shadow-md text-center font-semibold text-gray-500"
          to={`/search/list/${swimmingPoolId}/reviewList`}>
          +&nbsp;리뷰 더보기
        </Link>
      </section>
      <ModalComponent>
        <p className="my-4">
          {content.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </p>
        <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
        <ButtonConfirm onClick={handleConfirm} />
      </ModalComponent>
    </div>
  );
}

export default PoolSearchReivew;
