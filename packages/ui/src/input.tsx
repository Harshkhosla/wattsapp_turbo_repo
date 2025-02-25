"use client"

interface InputTypes {
    placeholder: string,
    onChange: any
    className: string
}

export const Input = ({ placeholder, onChange, className }: InputTypes) => {
    return (
        <input placeholder={placeholder} onChange={onChange} className={className}>
        </input>
    )
}