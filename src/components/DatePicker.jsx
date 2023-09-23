import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import propTypes from 'prop-types';



function DatePickerComponent({defaultValue,onChange}) {


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        role="dialog"
        label="수영 다녀온 날"
        defaultValue={defaultValue}
        format="YYYY-MM-DD"
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
        slotProps={{
          openPickerButton: {
            color: 'primary',
          },
          inputAdornment: {
            position: 'start',
          },
        }}
        renderInput={(params) => (
          <TextField
          {...params}
  
          />
        )}
      />
    </LocalizationProvider>
  );
}
DatePickerComponent.propTypes = {
  onChange: propTypes.string,
  defaultValue: propTypes.string,
}


export default DatePickerComponent;
