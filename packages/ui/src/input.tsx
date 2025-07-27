"use client"

interface InputTypes {
    placeholder: string,
    onChange: any,
    className: string,
    value?:string
}

export const Input = ({ placeholder, value ,onChange, className }: InputTypes) => {
    return (
        <input placeholder={placeholder} onChange={onChange} className={className} value={value} > 
        </input>
    )
}