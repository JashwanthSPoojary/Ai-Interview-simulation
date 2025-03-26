interface BackgroundTextProps {
    text: string
    className?: string
  }
  
  export default function BackgroundLogo({ text, className }: BackgroundTextProps) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[15vw] font-bold text-gray-100 whitespace-nowrap select-none">{text}</h1>
        </div>
      </div>
    )
  }