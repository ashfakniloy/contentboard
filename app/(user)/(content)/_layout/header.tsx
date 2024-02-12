export default function UserHeader({ heading }: { heading: string }) {
  return (
    <div className="leading-10 pb-7 mb-2 lg:mb-7 border-b border-gray-300">
      <h1 className="text-[35px] font-extrabold">{heading}</h1>
    </div>
  );
}
