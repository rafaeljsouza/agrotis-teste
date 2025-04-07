import { useState } from 'react';
import { TextField, InputAdornment, Popover } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';
import { IconButton } from '@mui/material';

const CalendarContainer = styled.div`
  width: 280px;
  padding: 16px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
`;

const MonthTitle = styled.span`
  margin: 0 8px;
  min-width: 100px;
  text-align: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    background-color: #f0f0f0;
    border-radius: 50%;
  }
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 6px;
`;

const Day = styled.button<{ isToday?: boolean; isSelected?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: ${({ isSelected }) => (isSelected ? '#00695c' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'inherit')};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#00695c' : '#f0f0f0')};
  }
  
  ${({ isToday }) => isToday && `
    border: 1px solid #00695c;
  `}
`;

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

const DatePicker = ({ value, onChange, label, error, helperText }: DatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value ? formatDateForDisplay(value) : '');
  
  // Converter formato de data para exibição (DD/MM/AAAA)
  function formatDateForDisplay(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return '';
    }
  }
  
  // Converter formato de data para o valor do campo (AAAA-MM-DD)
  function formatDateForValue(dateStr: string): string {
    try {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return '';
    } catch {
      return '';
    }
  }
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDateSelect = (date: Date) => {
    const formattedDisplay = date.toLocaleDateString('pt-BR');
    const formattedValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    setDisplayValue(formattedDisplay);
    onChange(formattedValue);
    handleClose();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    
    // Se o formato for válido, atualize o valor
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)) {
      const formattedValue = formatDateForValue(inputValue);
      onChange(formattedValue);
    }
  };
  
  // Componente de calendário simplificado
  const SimpleCalendar = () => {
    const currentDate = value ? new Date(value) : new Date();
    const [viewDate, setViewDate] = useState(currentDate);
    
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    const previousMonth = () => {
      setViewDate(new Date(year, month - 1, 1));
    };
    
    const nextMonth = () => {
      setViewDate(new Date(year, month + 1, 1));
    };
    
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const today = new Date();
    const isToday = (date: Date) => 
      date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear();
    
    const isSelected = (date: Date) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      return date.getDate() === selectedDate.getDate() && 
             date.getMonth() === selectedDate.getMonth() && 
             date.getFullYear() === selectedDate.getFullYear();
    };
    
    return (
      <CalendarContainer>
        <CalendarHeader>
          <MonthSelector>
            <ArrowButton onClick={previousMonth}>&lt;</ArrowButton>
            <MonthTitle>
              {viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </MonthTitle>
            <ArrowButton onClick={nextMonth}>&gt;</ArrowButton>
          </MonthSelector>
        </CalendarHeader>
        
        <DayGrid>
          {weekdays.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
          
          {Array(firstDayOfMonth).fill(null).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          
          {days.map(date => (
            <Day 
              key={date.toString()}
              isToday={isToday(date)}
              isSelected={isSelected(date)}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </Day>
          ))}
        </DayGrid>
      </CalendarContainer>
    );
  };
  
  const open = Boolean(anchorEl);
  
  return (
    <>
      <TextField
        label={label}
        value={displayValue}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        placeholder="dd/mm/aaaa"
        error={error}
        helperText={helperText}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick} size="small">
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
      />
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SimpleCalendar />
      </Popover>
    </>
  );
};

export default DatePicker;