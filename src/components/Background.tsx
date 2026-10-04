export const Background = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="absolute -left-48 top-[-18rem] h-[44rem] w-[44rem] rounded-full bg-electric/12 blur-[150px]" />
      <div className="absolute -right-44 top-[32rem] h-[34rem] w-[34rem] rounded-full bg-brand/8 blur-[150px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
    </div>
  );
};
