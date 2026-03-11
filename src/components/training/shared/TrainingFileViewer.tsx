import { MicrosoftExcelLogo } from '@phosphor-icons/react';
import { Download, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TrainingFileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filename: string;
  fileUrl: string;
}

export function TrainingFileViewer({
  open,
  onOpenChange,
  filename,
  fileUrl,
}: TrainingFileViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='flex h-[80vh] max-h-[80vh] w-full max-w-2xl flex-col gap-0 p-0'
        showCloseButton={false}
      >
        <DialogHeader className='flex min-h-[48px] shrink-0 flex-row items-center justify-between border-b px-3 py-2'>
          <DialogTitle className='truncate text-base font-semibold'>
            {filename}
          </DialogTitle>
          <div className='flex shrink-0 items-center gap-1.5'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 gap-1.5'
              asChild
            >
              <a href={fileUrl} download={filename}>
                <Download className='size-4' />
                <span className='hidden sm:inline'>Download</span>
              </a>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onOpenChange(false)}
              className='size-8 shrink-0'
            >
              <X className='size-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>
        </DialogHeader>

        <div className='flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center'>
          <MicrosoftExcelLogo size={64} weight='thin' className='text-green-600' />
          <div className='space-y-2'>
            <p className='text-lg font-semibold'>Download to view in Excel</p>
            <p className='text-sm text-muted-foreground max-w-sm'>
              This spreadsheet file can be viewed by downloading it and opening in Microsoft Excel or Google Sheets.
            </p>
          </div>
          <Button asChild className='mt-2'>
            <a href={fileUrl} download={filename}>
              <Download className='size-4 mr-2' />
              Download {filename}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
