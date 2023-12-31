import ModalComplex from "@/components/ModalComplex";
import ReviewList from "@/components/ReviewList";
import useFetchData from "@/hooks/useFetchData";
import useDeleteData from "@/hooks/useFetchDeleteData";
import useModalStore from "@/zustand/useModalStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



function MyAccountReview (){
  
  const [reviewId, setReviewId] = useState(null);
  const [poolId, setPoolId] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const { openModal, closeModal, actionType, setContent, } = useModalStore();
  const { data: fetchReviewData,fetchData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/reviews/my`
  );
  const { deleteData} = useDeleteData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${poolId}/reviews/${reviewId}/delete`)

  
  useEffect(() => {
    if (fetchReviewData?.result?.content) {
      const orderDate = fetchReviewData.result.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviewData(orderDate);
    }
  }, [fetchReviewData]);


//모달 확인 핸들러
  const handleConfirm = async () => {
    console.log('안돼..?');
    try {
      if (actionType === 'review') {
        await deleteData();
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
    <div className='pb-20'>
    {reviewData.map((review) => (
            <ReviewList
            key={review.reviewId}
            reviewId={review.reviewId}
            id={review.swimmingPoolId}
            user={review.nickName}
            content={review.contents}
            userName={review.userName}
            datetime={review.createdAt}
            ratingStar={review.ratingStar}
            onClick={handleReview}
          />
          ))}
      <ModalComplex onClick={handleConfirm}/>
    </div>

  )

}

export default MyAccountReview