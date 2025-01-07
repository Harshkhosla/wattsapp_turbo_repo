
interface TextProps {
    children: React.ReactNode;
    classname: string
}

export const Text = ({ children, classname }: TextProps) => {
    return (
        <div className={classname}>
            {children}
        </div>
    )

}