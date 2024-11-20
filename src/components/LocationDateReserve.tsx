"use client"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem, TextField } from "@mui/material"
import { Dayjs } from "dayjs"

export default function LocationDateReserve({
    onDateChange, 
    /*onTimeChange, 
    onLocationChange,*/
    onPriceChange
} : {
    onDateChange: Function, 
    /*onTimeChange: Function, 
    onLocationChange: Function*/
    onPriceChange: Function
}) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
    const [reserveTime, setReserveTime] = useState<string>('')
    const [location, setLocation] = useState('BKK')
    const [Price, setPrice] = useState('--')
    
    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="bg-white"
                    value={reserveDate}
                    onChange={(value) => {
                        setReserveDate(value);
                        onDateChange(value);
                    }} 
                />    
            </LocalizationProvider>

           

            <Select 
                variant="standard" 
                name="price" 
                id="price" 
                value={Price}
                onChange={(e) => {
                    setPrice(e.target.value); 
                    onPriceChange(e.target.value);
                }}
                className="h-[2em] w-[200px]"
            >
                <MenuItem value="60">60</MenuItem>
                <MenuItem value="90">90</MenuItem>
                <MenuItem value="120">120</MenuItem>
            </Select>
        </div>
    )
}