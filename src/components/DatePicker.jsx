
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import propTypes from 'prop-types';

function DatePickerComponent({ defaultValue, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        role="dialog"
        defaultValue={defaultValue}
        format="YYYY-MM-DD"
        onChange={onChange}
        className='rounded-xl shadow-md font-pretendard'
        type
        // InputLabelProps={{ shrink: true }}
        // InputProps={{ disableUnderline: true }}
        orientation={'portrait'}
        sx={{ minWidth: 100 }}
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
          // tabs: {
          //   hidden: false,
          // },
        }}
      />
    </LocalizationProvider>
  );
}
DatePickerComponent.propTypes = {
  onChange: propTypes.func,
  defaultValue: propTypes.object,
};

export default DatePickerComponent;
