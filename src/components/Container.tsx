import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'>;

export default function Container({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn('mx-auto max-w-4xl px-5 lg:max-w-5xl', className)}
    >
      {children}
    </div>
  );
}
