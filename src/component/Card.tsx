interface Card {
  title: string | number;
  description?: string;
  img?: string;
  job?: boolean;
}
const Card: React.FC<Card> = ({ title, description, img, job }) => {
  return (
    <div>
      {job ? (
        <div className="bg-primary shadow-sm w-80 rounded-lg text-white mb-3">
          <div className="flex gap-4 py-4 px-5 place-items-center">
            <div className="w-[12vw] h-[12vw] rounded-lg bg-white text-primary flex place-items-center justify-center text-2xl">
              <i className="fa-solid fa-bell"></i>
            </div>
            <div>
              <div className="font-extrabold text-lg">{title}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hover:bg-primary-hover text-primary hover:text-white bg-white shadow-sm w-80 rounded-lg">
          <div className="flex gap-4 py-8 px-10">
            <div>
              <img src={img} alt="" />
            </div>
            <div>
              <div className="font-extrabold text-xl">{title}</div>
              <div className="text-xl">{description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
