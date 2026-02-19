import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { RiArrowLeftLine, RiCheckLine } from 'react-icons/ri'
import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Button } from '../components'
import { spacing } from '../design-system/spacing'
import {
  createNewTaskSchema,
  type NewTaskFormValues,
} from '../schemas/task'
import { useCreateTaskMutation } from '../api/taskQueries'
import { DashboardHeader } from '../components/DashboardHeader'

export function NewTask() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createTaskMutation = useCreateTaskMutation()

  const schema = useMemo(() => createNewTaskSchema(t), [t])

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: NewTaskFormValues) => {
    await createTaskMutation.mutateAsync({
      title: data.title,
      description: data.description,
    })
    navigate({ to: '/' })
  }

  const onDiscard = () => {
    navigate({ to: '/' })
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      backgroundColor="fill-gray"
    >
      <DashboardHeader />

      <Box
        flex="1"
        paddingX={{ base: 4, md: spacing.page }}
      >
        <Box
          maxWidth="1280px"
          marginX="auto"
          backgroundColor="fill-white"
          borderRadius="24px"
          padding={{ base: 4, sm: spacing.card }}
          boxShadow="0 1px 3px rgba(0,0,0,0.08)"
        >
          <HStack
            gap={spacing.stack}
            marginBottom={spacing.card}
            alignItems="center"
          >
            <Link to="/" aria-label="Go back" style={{ display: 'flex' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
                borderRadius="full"
                backgroundColor="fill-gray"
                color="text-primary"
                _hover={{ backgroundColor: 'fill-gray-hover' }}
              >
                <RiArrowLeftLine size={17} />
              </Box>
            </Link>
            <Heading
              size="2xl"
              color="text-primary"
              fontWeight="heading.1"
              lineHeight="1.3"
            >
              {t('task.newTask')}
            </Heading>
          </HStack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <VStack gap={spacing.stack} align="stretch">
              <Box>
                <Text
                  fontSize="text.small"
                  color="text-secondary"
                  marginBottom={spacing.label}
                  fontWeight="text.base"
                >
                  <Box as="span" color="text-danger" aria-hidden="true">
                    *{' '}
                  </Box>
                  {t('task.taskName')}
                </Text>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => {
                    const hasError = Boolean(fieldState.error)
                    return (
                      <>
                        <Input
                          {...field}
                          id="new-task-title"
                          type="text"
                          placeholder={t('task.taskNamePlaceholder')}
                          autoComplete="off"
                          backgroundColor="fill-white"
                          borderColor={hasError ? 'border-danger' : 'border-gray'}
                          borderRadius="4px"
                          height="40px"
                          _focus={{
                            borderColor: hasError
                              ? 'border-danger'
                              : 'border-brand',
                            boxShadow: hasError
                              ? '0 0 0 1px var(--chakra-colors-border-danger)'
                              : '0 0 0 1px var(--chakra-colors-border-brand)',
                          }}
                        />
                        {fieldState.error?.message && (
                          <Text
                            color="text-danger"
                            fontSize="text.small"
                            marginTop={spacing.label}
                            role="alert"
                          >
                            {fieldState.error.message}
                          </Text>
                        )}
                      </>
                    )
                  }}
                />
              </Box>

              <Box>
                <Text
                  fontSize="text.small"
                  color="text-secondary"
                  fontWeight="text.base"
                  marginBottom={spacing.label}
                >
                  {t('task.descriptionOptional')}
                </Text>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => {
                    const hasError = Boolean(fieldState.error)
                    return (
                      <>
                        <Textarea
                          {...field}
                          id="new-task-description"
                          placeholder={t('task.descriptionPlaceholder')}
                          backgroundColor="fill-white"
                          borderColor={hasError ? 'border-danger' : 'border-gray'}
                          borderRadius="4px"
                          minHeight="100px"
                          resize="vertical"
                          _focus={{
                            borderColor: hasError
                              ? 'border-danger'
                              : 'border-brand',
                            boxShadow: hasError
                              ? '0 0 0 1px var(--chakra-colors-border-danger)'
                              : '0 0 0 1px var(--chakra-colors-border-brand)',
                          }}
                        />
                        {fieldState.error?.message && (
                          <Text
                            color="text-danger"
                            fontSize="text.small"
                            marginTop={spacing.label}
                            role="alert"
                          >
                            {fieldState.error.message}
                          </Text>
                        )}
                      </>
                    )
                  }}
                />
              </Box>

            </VStack>
            <Flex
              justifyContent="space-between"
              flexWrap="wrap"
              marginTop={spacing.card}
            >
              <Button
                type="button"
                variant="ghost"
                onClick={onDiscard}
                disabled={isSubmitting || createTaskMutation.isPending}
              >
                {t('task.discard')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || createTaskMutation.isPending}
              >
                <HStack gap={spacing.inline} color="text-white">
                  <Text as="span" color="text-white">{t('task.createTask')}</Text>
                  <RiCheckLine size={20} />
                </HStack>
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
