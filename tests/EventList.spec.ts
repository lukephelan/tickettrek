import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, vi } from 'vitest'
import EventList from '~/components/EventList.vue'

mockNuxtImport('useFetch', vi.fn)

describe('EventList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  });

  it('renders list', async () => {
    (vi.mocked(useFetch) as any).mockReturnValue({
      data: ref([
        { id: '1', name: 'Metallica' }
      ]),
      error: ref(null),
    });
    const component = await mountSuspended(EventList)
    expect(component.text()).toContain('Metallica')
  })
})
