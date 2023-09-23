import LogList from '@/components/LogList';
import ModalComplex from '@/components/ModalComplex';
import useFetchData from '@/hooks/useFetchData';
import useDeleteData from '@/hooks/useFetchDeleteData';
import useModalStore from '@/zustand/useModalStore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function MyLogList() {
  let { date } = useParams();
  const navigate = useNavigate();
  const [logData, setLogdata] = useState(null);
  const { openModal, closeModal, actionType, setContent, setActionType } = useModalStore();
  const [ logId, setLogId ] =useState(null)
  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs/${logId}/delete`
  );
  const { data: fetchLogData,fetchData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs/${date}`
  );

  useEffect(()=>{
    if (fetchLogData?.resultCode==="SUCCESS"){
      const initLogData = fetchLogData.result.content;
      const formattedDate = initLogData.map(log => {
        return {...log,
          date:moment(log.date).format('YYYY-MM-DD')};
        });
        setLogdata(formattedDate);
    }
  },[fetchLogData?.result])


  const handleDelete = (e) => {
    setLogId(e.currentTarget.getAttribute('data-log-id'))
    setContent('일지를 삭제 하시겠습니까?\n삭제된 일지는 복구되지 않습니다.');

    openModal('delete');
  };


  const handleConfirm = async() => {
    try {
      if (actionType === 'delete') {
        await deleteData();
        fetchData()
        closeModal();
        navigate(`/mylog/${date}`);
        setActionType('')
        toast.success('일지가 삭제되었어요.')
      }

    }catch(error){
      console.log(error);
    }
  };
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard pb-20 mt-6">
      <Helmet>
        <title>수영일지</title>
      </Helmet>
      {logData && logData.map((log) => (
        <LogList
          key={log.logId}
          logId={log.logId}
          id={log.date}
          onClick={handleDelete}
          distance={log.distance}
          calory={log.calorie}
          time={log.time}
          contents={log.contents}
        />
      ))}
    <ModalComplex onClick={handleConfirm}/>
    </div>
  );
}
export default MyLogList;
