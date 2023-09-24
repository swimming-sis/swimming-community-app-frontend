import ButtonConfirm from "@/components/Button/ButtonComfirm"
import ModalComponent from "@/components/ModalComponent"
import ReviewList from "@/components/ReviewList"
import useFetchData from "@/hooks/useFetchData"
import useDeleteData from "@/hooks/useFetchDeleteData"
import RootLayout from "@/layout/RootLayout"
import useModalStore from "@/zustand/useModalStore"
import { useEffect } from "react"
import { Fragment } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"




function ReviewDetail (){
  const navigate = useNavigate()
  let {swimmingPoolId} = useParams()
  const [reviewData, setReviewData] = useState([])
  const [reviewId, setReviewId] = useState(null);
  const [poolId, setPoolId] = useState(null);
  const {data:fetchReviewData, fetchData} = useFetchData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}/reviews/`)
  const {deleteData:deleteReviewData} = useDeleteData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${poolId}/reviews/${reviewId}/delete`)
  const { openModal, closeModal, actionType, content, setContent, } = useModalStore();


  useEffect(() => {
    if (fetchReviewData?.resultCode === 'SUCCESS') {
      const orderDate = fetchReviewData.result.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const updateReview = orderDate.slice(0, 3);
      const tagArray = updateReview.map(review => ({ ...review, tag: review.tag.split('/') }));

      setReviewData(tagArray);
    }
  }, [fetchReviewData]);


  const handleWrite = () => {
    navigate(`/search/list/${swimmingPoolId}/reviewList/write`)
  }

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
    <div className="relative  mx-auto  min-w-0 max-w-[699px] w-[calc(100%-20px)] font-pretendard pb-20">
      <RootLayout content={'리뷰'} onClickEdit={handleWrite}/>
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
            checkedItems={review.tag}
            detail={true}
          />
        ))}
<ModalComponent>
  <p className="my-4">
    {String(content).split("\n").map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ))}
  </p>
  <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
  <ButtonConfirm onClick={handleConfirm} content="확인" confirm={true} />
</ModalComponent>
    </div>
    
  )

}


export default ReviewDetail