
import { LocalizationProvider} from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import propTypes from 'prop-types';
import 'moment/locale/ko'


function DatePickerYear({defaultValue={},onChange}) {

  return (
    <LocalizationProvider 
    adapterLocale='koKR'
    dateAdapter={AdapterMoment}>
      <DatePicker
      
        role="dialog"
        label=""
        views={['year']}
        defaultValue={defaultValue}
        format="YYYY-MM"
        className='rounded-xl shadow-md font-pretendard'
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
        slotProps={{
          textField: { 
            size: 'small', 
          } ,
          openPickerButton: {
            color: 'primary',
          },
          inputAdornment: {
            position: 'start',
          },
          tabs: {
            hidden: false,
          },
        }}
      />
    </LocalizationProvider>
  );
}
DatePickerYear.propTypes = {
  onChange: propTypes.func,
  defaultValue: propTypes.object,
}


export default DatePickerYear;
