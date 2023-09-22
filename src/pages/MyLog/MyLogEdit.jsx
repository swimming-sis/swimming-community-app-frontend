import ButtonSubmit from "@/components/Button/ButtonSubmit"
import ModalComplex from "@/components/ModalComplex"
import TextArea from "@/components/TextArea"
import DatePickerComponent from "@/components/datePicker"
import useFetchPostData from "@/hooks/useFetchPostData"
import Header from "@/layout/Header"
import debounce from "@/utils/debounce"
import useModalStore from "@/zustand/useModalStore"
import {  useState } from "react"
import { Helmet } from "react-helmet-async"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import moment from 'moment';


const numberRegex = /^[0-9]{1,}$/
function MyLogEdit() {
  let today = moment()
  const navigate = useNavigate()
  const { fetchData:postLogData } = useFetchPostData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs/write`)
  const { closeModal, openModal, actionType, setContent, setActionType } = useModalStore();
  const [formState, setFormState] = useState({
    calorie:0,
    contents:'',
    distance:'',
    date: moment().format('YYYY-MM-DD'),
    time:0,
  })


  const handleDatePicker = (e) =>{
    setFormState({...formState, 
      date:e.format('YYYY-MM-DD')})
  }

const handleSubmit = (e) => {
e.preventDefault()
}

const handleConfirm = async () => {
  try{

  if (actionType === 'back') {
      closeModal();
      navigate('/mylog')
      setActionType('')

    }else if(actionType==='write'){
    await postLogData(formState)
      closeModal();
      navigate('/mylog')
      toast.success('일지가 작성되었어요.')
      setActionType('')
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
  if (name==='contents'){
    setFormState({
      ...formState,
      [name]: value,
    });
    return;
  }else{
    if(!numberRegex.test(value)){
      toast.error('숫자만 입력해주세요')
    }else{
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  }
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
    <div className="pt-4 py-2">
      <DatePickerComponent
      defaultValue={today}
      onChange={handleDatePicker}/>
    </div>
    <div className="flex mb-4 items-center flex-col">
      <div 
      className="flex w-full items-center my-2">
        <label
        htmlFor="distanceLog"
        className="flex-shrink-0 w-28 mr-2 text-sm text-secondary">
          거리(m)
          </label>
        <input
        type="number"
        name="distance"
        id="distanceLog"
        onChange={handleInput}
        
        className="flex-grow border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
      </div>
      <div 
      className="flex w-full items-center my-2">
        <label
        htmlFor="calorieLog"
        className="flex-shrink-0 w-28 mr-2 text-sm text-secondary">
          칼로리(kcal)
          </label>
        <input
        type="number"
        name="calorie"
        id="calorieLog"
        onChange={handleInput}
        className="flex-grow border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
      </div>
      <div 
      className="flex w-full items-center my-2">
        <label
        htmlFor="timeLog"
        className="flex-shrink-0 w-28 mr-2 text-sm text-secondary">
          수영시간(분)
          </label>
        <input
        type="number"
        name="time"
        id="timeLog"
        onChange={handleInput}
        className="flex-grow border shadow-md w-full h-9 rounded-lg text-sm px-2"/>
      </div>
    </div>
    <TextArea 
    name='contents'
    placeholder="일지를 작성해 보세요"
    onChange={handleInput}
    className="h-60 mb-auto flex-grow"/>
    <ButtonSubmit
    onClick={handleDone}
    type='button' 
    content="작성완료" className="mt-10 mb-10" />
  <ModalComplex onClick={handleConfirm} />
  </form>
  )
}
export default MyLogEdit