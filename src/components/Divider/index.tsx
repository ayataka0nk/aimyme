type Props = {
  className?: string
}
export const Divider = ({ className }: Props) => {
  return <div className={`${className} border-b border-outline-variant`}></div>
}
