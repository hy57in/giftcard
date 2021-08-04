const NavigationButton = ({ name, onClick }: { name: string; onClick?: () => void }) => {
  return (
    <div className="cursor-pointer hover:font-bold text-lg hover:text-green-600" onClick={onClick}>
      {name}
    </div>
  )
}

export default NavigationButton
