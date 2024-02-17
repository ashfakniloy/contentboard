export default function UserHeader({ heading }: { heading: string }) {
  return (
    <div className="leading-10 pb-4 lg:pb-9 mb-7 border-b">
      <h1 className="text-2xl lg:text-[35px] font-extrabold">{heading}</h1>
    </div>
  );
}
