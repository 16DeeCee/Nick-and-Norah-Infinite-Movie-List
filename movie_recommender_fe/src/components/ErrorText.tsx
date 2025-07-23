type TErrorProps = {
  primaryText: string
  secondaryText: string
}

function ErrorText({ primaryText, secondaryText } : TErrorProps) {
  return (
    <div className='text-center py-12'>
      <div className='space-y-4'>
        <div className='text-6xl'>🎬</div>
        <h3 className='text-xl font-semibold'>{primaryText}</h3>
        <p className='text-muted-foreground'>{secondaryText}</p>
      </div>
    </div>
  )
}

export default ErrorText;