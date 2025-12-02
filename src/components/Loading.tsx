import loading from "../assets/loading.gif";
const Loading = () => {
  return (
    <div className="flex h-screen min-h-screen w-full items-center justify-center">
      <div className="flex items-center justify-center gap-x-2">
        <img src={loading} alt="Loading gif" className="size-20" />
      </div>
    </div>
  );
};

export default Loading;
