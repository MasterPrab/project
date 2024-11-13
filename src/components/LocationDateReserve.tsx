"use client"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem, TextField } from "@mui/material"
import { Dayjs } from "dayjs"

export default function LocationDateReserve({
    onDateChange, 
    onTimeChange, 
    onLocationChange,
    onPriceChange
} : {
    onDateChange: Function, 
    onTimeChange: Function, 
    onLocationChange: Function
    onPriceChange: Function
}) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
    const [reserveTime, setReserveTime] = useState<string>('')
    const [location, setLocation] = useState('BKK')
    const [Price, setPrice] = useState('300')
    
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

            {/* New Time Input Field */}
            <TextField
                type="time"
                variant="standard"
                value={reserveTime}
                onChange={(e) => {
                    setReserveTime(e.target.value);
                    onTimeChange(e.target.value);
                }}
                className="h-[2em] w-[100px] bg-white"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Select 
                variant="standard" 
                name="location" 
                id="location" 
                value={location}
                onChange={(e) => {
                    setLocation(e.target.value); 
                    onLocationChange(e.target.value);
                }}
                className="h-[2em] w-[200px]"
            >
                <MenuItem value="BKK">Bangkok</MenuItem>
                <MenuItem value="CNX">Chiang Mai</MenuItem>
                <MenuItem value="HKT">Phuket</MenuItem>
            </Select>

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
                <MenuItem value="300">300</MenuItem>
                <MenuItem value="500">500</MenuItem>
                <MenuItem value="1000">1000</MenuItem>
            </Select>
        </div>
    )
}