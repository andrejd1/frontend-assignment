import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logoUrl from '../assets/logoBig.svg'
import { MenuButton } from './MenuButton'
import { spacing } from '../design-system/spacing'
import { useAuth } from '../context/AuthContext'
import { displayName } from '../utils'
export function DashboardHeader() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <Flex
      as="header"
      maxWidth="1320px"
      marginX="auto"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX={{ base: 4, sm: spacing.page }}
      paddingY={{ base: 6, sm: spacing.pageVertical }}
    >
      <HStack gap={spacing.inlineTight}>
        <Image src={logoUrl} alt="" width="37px" height="32px" />
        <Text
          fontSize="24px"
          fontWeight="600"
          color="text-primary"
          letterSpacing="-0.02em"
        >
          Zentask
        </Text>
      </HStack>
      {user && (
        <Box ref={menuRef} position="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                'var(--chakra-colors-fill-gray)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <Box
              width="40px"
              height="40px"
              borderRadius="full"
              backgroundColor="fill-white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 1px 2px rgba(0,0,0,0.1)"
            >
              <Text
                fontSize="text.base"
                fontWeight="600"
                color="text-primary"
              >
                {user.username.charAt(0).toUpperCase()}
              </Text>
            </Box>
            <Text
              fontSize="text.base"
              color="text-primary"
              fontWeight="text.alternative"
              display={{ base: 'none', sm: 'block' }}
            >
              {displayName(user.username)}
            </Text>
          </button>
          {menuOpen && (
            <Box
              position="absolute"
              top="100%"
              right={0}
              marginTop={1}
              minWidth="160px"
              backgroundColor="fill-white"
              borderRadius="8px"
              boxShadow="0 4px 12px rgba(0,0,0,0.15)"
              paddingY={1}
              zIndex={10}
              role="menu"
            >
              <MenuButton
                disabled
                onClick={() => {
                  // should open settings modal
                }}
              >
                {t('menu.settings')}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
              >
                {t('menu.logout')}
              </MenuButton>
            </Box>
          )}
        </Box>
      )}
    </Flex>
  )
}
