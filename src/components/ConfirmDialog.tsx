import {
  Dialog,
  HStack,
  Text,
} from '@chakra-ui/react'
import { spacing } from '../design-system/spacing'
import { Button } from './Button'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  cancelLabel?: string
  /** Use for destructive actions (e.g. delete) */
  variant?: 'danger' | 'default'
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  variant = 'default',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      role="alertdialog"
      size="sm"
      closeOnInteractOutside={variant !== 'danger'}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content padding={spacing.field} marginTop={spacing.card} gap={spacing.section}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Text color="text-secondary" fontSize="text.base" lineHeight="1.5">
              {description}
            </Text>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack gap={3} justifyContent="flex-end">
              <Button variant="ghost"
                onClick={handleCancel}
                _hover={{ backgroundColor: 'fill-gray-hover' }}
                transition="background-color 0.2s ease"
              >
                {cancelLabel}
              </Button>
              <Button
                variant={'danger'}
                onClick={handleConfirm}
                transition="background-color 0.2s ease, color 0.2s ease"
              >
                {confirmLabel}
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
