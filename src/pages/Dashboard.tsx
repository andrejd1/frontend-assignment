import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import logoUrl from '../assets/logoBig.svg'
import { Button, DashboardHeader } from '../components'
import { spacing } from '../design-system/spacing'
import { useAuth } from '../context/AuthContext'
import { displayName, formatDashboardDate } from '../utils'

export function Dashboard() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()

  const name = user ? displayName(user.username) : ''
  const dateString = formatDashboardDate(new Date(), i18n.language)

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
        paddingX={{ base: 2, sm: spacing.page }}
        paddingY={{ base: 6, sm: spacing.page }}
      >
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
            marginBottom={spacing.section}
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

          <Flex
            flex="1"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack gap={6} maxWidth="320px" textAlign="center">
              <Box aria-hidden>
                <Image
                  src={logoUrl}
                  alt=""
                  width="120px"
                  height="104px"
                  opacity={0.9}
                />
              </Box>
              <Heading
                size="lg"
                color="text-primary"
                fontWeight="heading.2"
                lineHeight="1.3"
              >
                {t('dashboard.emptyTitle')}
              </Heading>
              <Text fontSize="text.base" color="text-secondary" lineHeight="1.5">
                {t('dashboard.emptyMessage')}
              </Text>
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
