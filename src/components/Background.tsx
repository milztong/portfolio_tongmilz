export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-page">
      <div 
        className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-brand/15 blur-[120px]" 
      />

      <div 
        className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand/5 blur-[100px]" 
      />
    </div>
  )
}