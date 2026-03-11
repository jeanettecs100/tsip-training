import { DownloadSimple, Eye, FileXls, UploadSimple } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

interface MockFileDisplayProps {
  filename: string;
  size?: string;
  downloadable?: boolean;
  downloadUrl?: string;
}

export function MockFileDisplay({ filename, size = '2.4 MB', downloadable, downloadUrl }: MockFileDisplayProps) {
  return (
    <div className='rounded-lg border bg-card p-4'>
      <div className='flex items-center gap-3'>
        <div className='flex size-10 items-center justify-center rounded-lg bg-emerald-50'>
          <FileXls className='size-5 text-emerald-600' weight='fill' />
        </div>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium text-foreground'>{filename}</p>
          <p className='text-xs text-muted-foreground'>{size}</p>
        </div>
        <div className='flex gap-1.5'>
          {downloadable ? (
            <Button
              variant='outline'
              size='sm'
              className='h-8 gap-1.5 text-xs'
              disabled={!downloadUrl}
              asChild={!!downloadUrl}
            >
              {downloadUrl ? (
                <a href={downloadUrl} download>
                  <DownloadSimple className='size-3.5' />
                  Download
                </a>
              ) : (
                <>
                  <DownloadSimple className='size-3.5' />
                  Download
                </>
              )}
            </Button>
          ) : (
            <>
              <Button variant='outline' size='sm' className='h-8 gap-1.5 text-xs' disabled>
                <Eye className='size-3.5' />
                View
              </Button>
              <Button variant='outline' size='sm' className='h-8 gap-1.5 text-xs' disabled>
                <UploadSimple className='size-3.5' />
                Replace
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
