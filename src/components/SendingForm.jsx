import { memo } from "react";
import Airplain from "./Icon/Airplane"
import propTypes from 'prop-types';


const SendingForm = memo(function SendingForm({
  value,
  onSubmit,
  onChange
})  {
return(
  <form 
  onSubmit={onSubmit}
  className='flex gap-x-2 mt-5 mb-5 items-center'>
  <label htmlFor="commentSend" className='sr-only'>댓글입력하기</label>
  <input 
  type="text" 
  name="comment" 
  id="commentSend"
  onChange={onChange}
  value={value}
  placeholder='댓글을 입력해 보세요'
  className='w-full border shadow-md h-9 rounded-md px-2 text-xs' />
  <button 
  type="submit">
    <Airplain className={'bg-primary p-2 rounded-full shadow-md'} />
  </button>
</form>
)

})

SendingForm.propTypes = {
  
  value: propTypes.string,
  onChange: propTypes.func,
  onSubmit: propTypes.func,
}
  

export default SendingForm