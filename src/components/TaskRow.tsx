import { useState } from 'react'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { RiPencilFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Checkbox, ConfirmDialog, MenuButton, PopupMenu } from './index'
import type { Task } from '../types/task'
import { spacing } from '../design-system/spacing'

export interface TaskRowProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
  onEdit: () => void
}

export function TaskRow({ task, onToggle, onDelete, onEdit }: TaskRowProps) {
  const { t } = useTranslation()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const threeDotsTrigger = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="32px"
      height="32px"
      borderRadius="100px"
      color="text-primary"
      _hover={{ backgroundColor: 'fill-gray' }}
      transition="background-color 0.2s ease"
      aria-label={t('task.edit')}
    >
      <BsThreeDotsVertical size={16} />
    </Box>
  )

  return (
    <Flex
      alignItems="flex-start"
      gap={3}
      paddingX={2}
      paddingY={2}
      borderRadius="8px"
      cursor="pointer"
      backgroundColor="transparent"
      _hover={{
        backgroundColor: 'fill-gray-lightest',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
      transition="background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease"
      onClick={() => onEdit()}
    >
      <Box marginTop={1} flexShrink={0} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Checkbox
          checked={task.completed}
          onChange={onToggle}
          aria-label={task.title}
        />
      </Box>
      <Box flex="1" minWidth={0} marginTop={2}>
        <Text
          fontSize="text.base"
          fontWeight={task.completed ? 'text.base' : 'text.alternative'}
          color="text-primary"
          lineHeight="24px"
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text
            fontSize="text.small"
            color="text-tertiary"
            marginTop={spacing.label}
            lineHeight="1.5"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Text>
        ) : null}
      </Box>
      <Box onClick={(e: React.MouseEvent) => e.stopPropagation()} display="inline-block">
        <PopupMenu trigger={threeDotsTrigger} placement="bottom-end">
          {(close) => (
            <>
              <MenuButton
                onClick={() => {
                  close()
                  onEdit()
                }}
              >
                <HStack gap={2}>
                  <RiPencilFill size={18} />
                  <Text color="text-primary" fontSize="text.small">
                    {t('task.edit')}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuButton
                onClick={() => {
                  close()
                  setDeleteDialogOpen(true)
                }}
                color="text-danger"
                _hover={{ backgroundColor: 'fill-gray', color: 'text-danger' }}
              >
                <HStack gap={2} color="text-danger">
                  <MdDelete size={18} />
                  <Text color="text-danger" fontSize="text.small">
                    {t('task.delete')}
                  </Text>
                </HStack>
              </MenuButton>
            </>
          )}
        </PopupMenu>
      </Box>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t('task.deleteConfirmTitle')}
        description={t('task.deleteConfirmMessage')}
        confirmLabel={t('task.delete')}
        cancelLabel={t('dialog.cancel')}
        variant="danger"
        onConfirm={onDelete}
      />
    </Flex>
  )
}
