import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { RiCheckLine, RiPencilFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MenuButton, PopupMenu } from './index'
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
      borderRadius="8px"
      cursor="pointer"
      _hover={{ boxShadow: '2px 4px 12px rgba(0,0,0,0.15)', padding: '8px' }}
      transition="box-shadow 0.25s, padding 0.25s"
      onClick={() => onEdit()}
    >
      <Box marginTop={1} flexShrink={0}>
        <Box
          as="button"
          width="32px"
          height="32px"
          borderRadius="full"
          borderWidth="2px"
          borderColor={task.completed ? 'fill-brand' : 'border-gray'}
          backgroundColor={task.completed ? 'fill-brand' : 'fill-white'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => onToggle()}
          role="checkbox"
          aria-checked={task.completed}
          aria-label={task.title}
          flexShrink={0}
          _hover={{
            borderColor: task.completed ? 'fill-brand-hover' : 'border-gray',
            backgroundColor: task.completed ? 'fill-brand-hover' : 'fill-gray',
          }}
        >
          {task.completed ? (
            <Box color="text-white" lineHeight={0}>
              <RiCheckLine size={22} />
            </Box>
          ) : null}
        </Box>
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
                onDelete()
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
    </Flex>
  )
}
