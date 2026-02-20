import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button, DashboardHeader, EmptyStateBlock, TaskRow } from '../components'
import { spacing } from '../design-system/spacing'
import { useDeleteTaskMutation, useTaskListQuery, useToggleTaskMutation } from '../api/taskQueries'
import { useAuth } from '../context/AuthContext'
import { displayName, formatDashboardDate } from '../utils'

export function Dashboard() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { data: tasks = [], isLoading: tasksLoading } = useTaskListQuery({
    enabled: isAuthenticated,
  })
  const toggleMutation = useToggleTaskMutation()
  const deleteMutation = useDeleteTaskMutation()

  const name = user ? displayName(user.username) : ''
  const dateString = formatDashboardDate(new Date(), i18n.language)

  const todoTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)
  const hasTasks = tasks.length > 0
  const allCompleted = hasTasks && todoTasks.length === 0

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="fill-gray">
      <DashboardHeader />

      <Box flex="1" paddingX={{ base: 2, sm: spacing.page }} paddingY={0}>
        <Box
          maxWidth="1280px"
          marginX="auto"
          backgroundColor="fill-white"
          borderRadius="12px"
          padding={{ base: 4, sm: spacing.card }}
          boxShadow="0 1px 3px rgba(0,0,0,0.08)"
          display="flex"
          flexDirection="column"
        >
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
            gap={spacing.section}
            marginBottom={{ base: 4, sm: spacing.card }}
          >
            <Box>
              <Heading
                size="xl"
                color="text-primary"
                fontWeight="heading.1"
                lineHeight="1.3"
                marginBottom={spacing.inline}
              >
                {t('dashboard.greeting', { name })}
              </Heading>
              <Text fontSize="text.base" color="text-tertiary">
                {dateString}
              </Text>
            </Box>
            <Button size="md" asChild>
              <Link to="/tasks/new">
                <HStack gap={spacing.inline}>
                  <Text as="span" color="text-white">
                    {t('dashboard.addTask')}
                  </Text>
                </HStack>
              </Link>
            </Button>
          </Flex>

          {tasksLoading ? (
            <Flex
              flex="1"
              alignItems="center"
              justifyContent="center"
              paddingY={spacing.pageVertical}
            >
              <Text color="text-secondary">{t('auth.loading')}</Text>
            </Flex>
          ) : hasTasks ? (
            <VStack align="stretch" gap={6}>
              {allCompleted && <EmptyStateBlock />}
              {todoTasks.length > 0 && (
                <Box>
                  <Heading
                    size="xl"
                    color="text-primary"
                    fontWeight="heading.2"
                    paddingBottom={spacing.inline}
                    marginBottom={spacing.stack}
                    borderBottom="1px solid"
                    borderColor="fill-gray-hover"
                  >
                    {t('dashboard.todo')}
                  </Heading>
                  <VStack align="stretch" gap={3}>
                    {todoTasks.map((task) => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onToggle={() =>
                          toggleMutation.mutate({
                            id: task.id,
                            completed: !task.completed,
                          })
                        }
                        onDelete={() => deleteMutation.mutate(task.id)}
                        onEdit={() =>
                          navigate({ to: '/tasks/$taskId/edit', params: { taskId: task.id } })
                        }
                      />
                    ))}
                  </VStack>
                </Box>
              )}
              {completedTasks.length > 0 && (
                <Box>
                  <Heading
                    size="xl"
                    color="text-primary"
                    fontWeight="heading.2"
                    paddingBottom={spacing.inline}
                    marginBottom={spacing.stack}
                    borderBottom="1px solid"
                    borderColor="fill-gray-hover"
                  >
                    {t('dashboard.completed')}
                  </Heading>
                  <VStack align="stretch" gap={0}>
                    {completedTasks.map((task) => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onToggle={() =>
                          toggleMutation.mutate({
                            id: task.id,
                            completed: !task.completed,
                          })
                        }
                        onDelete={() => deleteMutation.mutate(task.id)}
                        onEdit={() =>
                          navigate({ to: '/tasks/$taskId/edit', params: { taskId: task.id } })
                        }
                      />
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          ) : (
            <EmptyStateBlock />
          )}
        </Box>
      </Box>
    </Box>
  )
}
