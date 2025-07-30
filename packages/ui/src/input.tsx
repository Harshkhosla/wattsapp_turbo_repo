"use client"

interface InputTypes {
    placeholder?: string,
    onChange: any,
    className?: string,
    value?:string,
    type?:string
}

export const Input = ({ placeholder, value ,onChange, className, type }: InputTypes) => {
    return (
        <input type={type} multiple placeholder={placeholder} onChange={onChange} className={className} value={value} > 
        </input>
    )
}