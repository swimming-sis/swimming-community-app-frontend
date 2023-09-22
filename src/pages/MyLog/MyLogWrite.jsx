import ButtonSubmit from "@/components/Button/ButtonSubmit"
import TextArea from "@/components/TextArea"
import Header from "@/layout/Header"
import { Helmet } from "react-helmet-async"
import { useState } from "react"
import debounce from "@/utils/debounce"
import toast from "react-hot-toast"
import useFetchPostData from "@/hooks/useFetchPostData"
import { useNavigate } from "react-router-dom"
import ButtonConfirm from "@/components/Button/ButtonComfirm"
import ModalComponent from "@/components/ModalComponent"
import { Fragment } from "react"
import useModalStore from "@/zustand/useModalStore"

function MyLogWrite() {
  const navigate = useNavigate()
  const { fetchData } = useFetchPostData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs/write`)
  const [formState, setFormState] = useState({
    calorie:0,
    contents:'',
    distance:'',
    date:'',
    time:0,
  })
  const { closeModal, openModal, actionType, content, setContent } = useModalStore();


const handleSubmit = (e) => {
e.preventDefault()
}

const handleCancle = () => {
  closeModal();
};

const handleConfirm = async () => {
  try{

  if (actionType === 'back') {
      closeModal();
      navigate('/mylog')
    }else if(actionType==='write'){

    await fetchData(formState)
      closeModal();
      navigate('/mylog')
      toast.success('일지가 작성되었어요.')
    }
  }
  catch{
    toast.error('서버와의 통신이 제대로 이루어지지 않았어요.')
  }
};


const handleBack = () => {
  if (formState.calorie===''&&formState.contents===''&&formState.distance===''&&formState.time===''&&formState.date===''){
    navigate('/mylog')
  }else{
    setContent('작성을 취소하시겠습니까?\n작성된 데이터는 복구되지 않습니다.');
    openModal('back');
  }
};

const handleInput = debounce((e) => {
  const { name, value } = e.target;
  setFormState({
    ...formState,
    [name]: value,
  });
}, 400);
const handleDone = ()=>{
setContent('일지를 작성 하시겠습니까?')
openModal('write')
}



  return (
    <form className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen"
  onSubmit={handleSubmit} >
    <Helmet>
      <title>수영 일지 쓰기</title>
    </Helmet>
    <Header 
    content="수영 일지 작성" 
    noEdit={false} 
    onClickBack={handleBack} 
    onNavigate={true}/>
  
    <div className="flex mb-4 items-center">
      <label 
      htmlFor="categoryWrite"
      className="flex-shrink-0 mr-2 text-sm text-secondary">
        거리(m)
        </label>
      <input 
      type="text" 
      name="title" 
      id="categoryWrite" 
      onChange={handleInput}
      className="border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
      <label 
      htmlFor="categoryWrite"
      className="flex-shrink-0 mr-2 text-sm text-secondary">
        칼로리(kcal)
        </label>
      <input 
      type="text" 
      name="title" 
      id="categoryWrite" 
      onChange={handleInput}
      className="border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
      <label 
      htmlFor="categoryWrite"
      className="flex-shrink-0 mr-2 text-sm text-secondary">
        수영시간(분)
        </label>
      <input 
      type="text" 
      name="title" 
      id="categoryWrite" 
      onChange={handleInput}
      className="border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
    </div>
    <TextArea 
    placeholder="일지를 작성해 보세요"
    onChange={handleInput}
    className="h-60 mb-auto flex-grow"/>
    <ButtonSubmit
    onClick={handleDone}
    type='button' 
    content="작성완료" className="mt-10 mb-10" />
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
  </form>
  )
}
export default MyLogWrite