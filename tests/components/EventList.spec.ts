import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import EventList from '~/components/EventList.vue'
import { ref } from 'vue'

mockNuxtImport('useFetch', vi.fn)

describe('EventList', () => {
  let component: ReturnType<typeof mountSuspended>;

  describe('pending', () => {
    beforeEach(async () => {
      vi.clearAllMocks();
      (vi.mocked(useFetch) as any).mockResolvedValue({
        data: ref({}),
        status: ref('pending'),
        error: ref(null),
      });
      component = await mountSuspended(EventList)
    });

    it('renders the skeleton loader', () => {
      expect(component.find('[data-name="event-card-skeleton"]').isVisible()).toBe(true)
    })
  });

  describe('success', () => {
    beforeEach(async () => {
      vi.clearAllMocks();
      (vi.mocked(useFetch) as any).mockResolvedValue({
        data: ref({
          events: [
            {
              id: '1',
              name: 'Metallica',
              images: [
                { ratio: '16_9', url: 'images.com/metallica' }
              ],
              dates: { start: { localDate: '2024-07-26' } },
              _embedded: { venues: [{ name: 'Marvel Stadium' }] }
            }
          ],
          links: { prev: { href: 'prev.com' }, next: { href: 'next.com' } }
        }),
        status: ref('success'),
        error: ref(null),
        execute: useFetch
      });
      component = await mountSuspended(EventList)
    });

    it('has called useFetch', () => {
      const componentParams = component.vm.params;
      expect(componentParams).toEqual({ size: 10, page: 1 })
      expect(useFetch).toHaveBeenCalledWith('/api/events', expect.any(Object), expect.any(String))
    })
    it('renders list', async () => {
      expect(component.text()).toContain('Metallica')
    })
    it('does not render the skeleton loader', () => {
      expect(component.find('[data-name="event-card-skeleton"]').exists()).toBe(false)
    })

    describe('onNavNext', () => {
      beforeEach(async () => {
        await component.find('[data-name="next-btn"]').trigger('click')
      })

      it('has called useFetch', () => {
        const componentParams = component.vm.params;
        expect(componentParams).toEqual({ size: 10, page: 2 })
        expect(useFetch).toHaveBeenCalledWith('/api/events', expect.any(Object), expect.any(String))
      })
    })

    describe('onNavPrev', () => {
      beforeEach(async () => {
        component.vm.page.value = 4;
        await component.vm.$nextTick()
        await component.find('[data-name="prev-btn"]').trigger('click')
      })

      it('has called useFetch', () => {
        const componentParams = component.vm.params;
        expect(componentParams).toEqual({ size: 10, page: 3 })
        expect(useFetch).toHaveBeenCalledWith('/api/events', expect.any(Object), expect.any(String))
      })
    })
  })
})
