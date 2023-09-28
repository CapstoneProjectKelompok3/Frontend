interface Card {
  title: string
  description: string,
  img: string
}
const Card: React.FC<Card> = ({ title, description, img }) => {
  return (
    <div className='hover:bg-primary-hover text-primary hover:text-white bg-white shadow-sm w-80 rounded-lg'>
      <div className="flex gap-4 py-8 px-10">
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <div className='font-extrabold text-xl'>{title}</div>
          <div className='text-xl'>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default Card