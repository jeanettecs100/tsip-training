interface ModuleHeaderProps {
  title: string;
  description: string;
}

export function ModuleHeader({ title, description }: ModuleHeaderProps) {
  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-bold text-foreground sm:text-3xl'>
        {title}
      </h1>
      <p className='mt-2 text-muted-foreground'>{description}</p>
    </div>
  );
}
