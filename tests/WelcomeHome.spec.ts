import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest'
import WelcomeHome from '~/components/WelcomeHome.vue'

describe('WelcomeHome', () => {
  it('renders correctly', async () => {
    const component = await mountSuspended(WelcomeHome)
    expect(component.text()).toContain('Welcome!')
  })
})
