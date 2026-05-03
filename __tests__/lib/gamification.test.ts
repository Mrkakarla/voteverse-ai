import { describe, it, expect, beforeEach } from 'vitest'
import type { GameData, Badge } from '@/types'

// Mock gamification utilities
const calculateLevel = (xp: number): number => {
  const XP_PER_LEVEL = 100
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

const calculateXPToNextLevel = (xp: number): number => {
  const XP_PER_LEVEL = 100
  const currentLevel = calculateLevel(xp)
  const nextLevelXP = currentLevel * XP_PER_LEVEL
  return nextLevelXP - xp
}

describe('Gamification System', () => {
  describe('Level calculation', () => {
    it('should start at level 1 with 0 XP', () => {
      expect(calculateLevel(0)).toBe(1)
    })

    it('should increment level every 100 XP', () => {
      expect(calculateLevel(100)).toBe(2)
      expect(calculateLevel(200)).toBe(3)
      expect(calculateLevel(500)).toBe(6)
    })
  })

  describe('XP to next level', () => {
    it('should calculate remaining XP correctly', () => {
      expect(calculateXPToNextLevel(0)).toBe(100)
      expect(calculateXPToNextLevel(50)).toBe(50)
      expect(calculateXPToNextLevel(100)).toBe(100)
      expect(calculateXPToNextLevel(150)).toBe(50)
    })

    it('should return 0 when exactly at level threshold', () => {
      expect(calculateXPToNextLevel(100)).toBe(100)
    })
  })
})
